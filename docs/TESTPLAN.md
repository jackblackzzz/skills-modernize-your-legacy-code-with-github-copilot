# Test Plan for COBOL Account Management System

This test plan documents test cases that validate the business logic implemented in the current COBOL account management application. Use this with business stakeholders to confirm expected behavior. Leave `Actual Result` and `Status` blank while executing tests.

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status (Pass/Fail) | Comments |
|---|---|---|---|---|---|---|---|
| TC-001 | View current balance | Application started; initial balance is known (`1000.00`) | 1. Start the app
2. Choose menu option `1` (View Balance) | App displays "Current balance: 1000.00" |  |  |  |
| TC-002 | Credit account (normal amount) | Application started; initial balance `1000.00` | 1. Choose menu option `2` (Credit Account)
2. When prompted, enter `250.50`
3. Confirm view balance (option `1`) | App displays credit confirmation and new balance `1250.50` |  |  |  |
| TC-003 | Debit account (sufficient funds) | Balance >= amount to debit (e.g., `1000.00`) | 1. Choose menu option `3` (Debit Account)
2. Enter `200.00`
3. Confirm view balance (option `1`) | App debits amount and displays new balance `800.00` |  |  |  |
| TC-004 | Debit account (insufficient funds) | Balance < requested debit (e.g., balance `100.00`) | 1. Choose menu option `3` (Debit Account)
2. Enter `200.00`
3. Confirm view balance (option `1`) | App displays an "Insufficient funds for this debit." message and balance remains unchanged |  |  |  |
| TC-005 | Debit exact current balance | Balance equals requested debit (e.g., `1000.00`) | 1. Choose menu option `3`
2. Enter `1000.00`
3. Confirm view balance | App accepts debit, updates balance to `0.00`, and displays new balance |  |  |  |
| TC-006 | Multiple sequential transactions | Application started; initial balance `1000.00` | 1. Choose `2` and credit `100.00`
2. Choose `3` and debit `50.00`
3. Choose `1` to view balance | App shows final balance `1050.00` after the sequence |  |  |  |
| TC-007 | Menu invalid choice handling | Application started | 1. At main menu enter an invalid choice (e.g., `9` or non-1..4)
2. Observe behavior | App displays "Invalid choice, please select 1-4." and re-displays the menu without exiting |  |  |  |
| TC-008 | Starting balance initialization | Fresh application start (first run) | 1. Start the app
2. Choose `1` to view balance | App displays starting balance `1000.00` |  |  |  |
| TC-009 | Persistence between runs | Change balance, then restart application | 1. Start app, perform a credit or debit to change balance
2. Exit app
3. Restart app
4. Choose `1` to view balance | Current implementation uses in-memory storage only; expected: balance resets to `1000.00` on restart (no persistence) |  |  |  |
| TC-010 | Decimal / cents handling | Application started; initial balance `1000.00` | 1. Choose `2` to credit `0.75`
2. Choose `1` to view balance | App correctly records cents; new balance `1000.75` |  |  |  |

## Notes for Testers
- `Actual Result` and `Status` should be filled out during test execution.
- Where the behavior depends on implementation details (for example persistence), the test documents the current implementation expectation (no persistence). If stakeholders require different behavior (e.g., persistent storage), note this in `Comments` so it can be translated into requirements for the Node.js rewrite.
- The COBOL implementation does not include explicit input validation beyond the field picture clauses. If stakeholders expect additional validation (non-numeric inputs, max/min amounts, authentication, multiple accounts), add new test cases to cover those requirements.

## How to run manual tests
1. Build the COBOL binary (already compiled in this workspace) or run with your COBOL runtime.
2. Execute `./accountsystem` and follow the test steps in each test case.

---

*File: docs/TESTPLAN.md*
