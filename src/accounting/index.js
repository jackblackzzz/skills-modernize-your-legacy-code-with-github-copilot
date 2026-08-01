#!/usr/bin/env node

const readlineSync = require('readline-sync');
const accounting = require('./lib/accounting');

function displayMenu() {
  console.log('--------------------------------');
  console.log('Account Management System');
  console.log('1. View Balance');
  console.log('2. Credit Account');
  console.log('3. Debit Account');
  console.log('4. Exit');
  console.log('--------------------------------');
}

function viewBalance() {
  console.log('Current balance: ' + accounting.getBalance().toFixed(2));
}

function creditAccount() {
  const ans = readlineSync.question('Enter credit amount: ');
  try {
    const newBal = accounting.credit(ans);
    console.log('Amount credited. New balance: ' + newBal.toFixed(2));
  } catch (err) {
    console.log('Invalid amount. Please enter a positive number.');
  }
}

function debitAccount() {
  const ans = readlineSync.question('Enter debit amount: ');
  try {
    const result = accounting.debit(ans);
    if (result.success) {
      console.log('Amount debited. New balance: ' + result.balance.toFixed(2));
    } else {
      console.log(result.message);
    }
  } catch (err) {
    console.log('Invalid amount. Please enter a positive number.');
  }
}

function main() {
  accounting.resetBalance();
  while (true) {
    displayMenu();
    const choice = readlineSync.question('Enter your choice (1-4): ');
    switch (choice) {
      case '1':
        viewBalance();
        break;
      case '2':
        creditAccount();
        break;
      case '3':
        debitAccount();
        break;
      case '4':
        console.log('Exiting the program. Goodbye!');
        process.exit(0);
      default:
        console.log('Invalid choice, please select 1-4.');
    }
  }
}

if (require.main === module) {
  main();
}
