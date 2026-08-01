const accounting = require('../lib/accounting');

describe('Accounting business logic tests (mirrors docs/TESTPLAN.md)', () => {
  beforeEach(() => {
    accounting.resetBalance();
  });

  test('TC-001 View current balance (initial)', () => {
    expect(accounting.getBalance()).toBeCloseTo(1000.00, 2);
  });

  test('TC-002 Credit account (normal amount)', () => {
    const newBal = accounting.credit(250.50);
    expect(newBal).toBeCloseTo(1250.50, 2);
    expect(accounting.getBalance()).toBeCloseTo(1250.50, 2);
  });

  test('TC-003 Debit account (sufficient funds)', () => {
    const result = accounting.debit(200.00);
    expect(result.success).toBe(true);
    expect(result.balance).toBeCloseTo(800.00, 2);
  });

  test('TC-004 Debit account (insufficient funds)', () => {
    accounting.setBalance(100.00);
    const result = accounting.debit(200.00);
    expect(result.success).toBe(false);
    expect(result.balance).toBeCloseTo(100.00, 2);
    expect(result.message).toMatch(/Insufficient funds/);
  });

  test('TC-005 Debit exact current balance', () => {
    const result = accounting.debit(1000.00);
    expect(result.success).toBe(true);
    expect(result.balance).toBeCloseTo(0.00, 2);
  });

  test('TC-006 Multiple sequential transactions', () => {
    accounting.credit(100.00);
    accounting.debit(50.00);
    expect(accounting.getBalance()).toBeCloseTo(1050.00, 2);
  });

  test('TC-007 Menu invalid choice handling: invalid amount input rejects', () => {
    expect(() => accounting.credit(-10)).toThrow();
    expect(() => accounting.debit('not-a-number')).toThrow();
  });

  test('TC-008 Starting balance initialization', () => {
    accounting.resetBalance();
    expect(accounting.getBalance()).toBeCloseTo(1000.00, 2);
  });

  test('TC-009 Persistence between runs (current impl: no persistence)', () => {
    accounting.credit(100);
    // simulate restart by resetting module state
    accounting.resetBalance();
    expect(accounting.getBalance()).toBeCloseTo(1000.00, 2);
  });

  test('TC-010 Decimal / cents handling', () => {
    const newBal = accounting.credit(0.75);
    expect(newBal).toBeCloseTo(1000.75, 2);
  });
});
