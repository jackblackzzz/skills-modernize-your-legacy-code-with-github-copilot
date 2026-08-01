"use strict";

let balance = 1000.00;

function _toFixedNumber(n) {
  return Number(n.toFixed(2));
}

function getBalance() {
  return _toFixedNumber(balance);
}

function setBalance(value) {
  balance = _toFixedNumber(Number(value) || 0);
  return getBalance();
}

function resetBalance() {
  balance = 1000.00;
  return getBalance();
}

function credit(amount) {
  const a = Number(amount);
  if (Number.isNaN(a) || a < 0) {
    throw new Error('Invalid amount');
  }
  balance = _toFixedNumber(balance + a);
  return getBalance();
}

function debit(amount) {
  const a = Number(amount);
  if (Number.isNaN(a) || a < 0) {
    throw new Error('Invalid amount');
  }
  if (balance >= a) {
    balance = _toFixedNumber(balance - a);
    return { success: true, balance: getBalance() };
  }
  return { success: false, message: 'Insufficient funds for this debit.', balance: getBalance() };
}

module.exports = {
  getBalance,
  setBalance,
  resetBalance,
  credit,
  debit,
};
