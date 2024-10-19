import { getBankAccount, InsufficientFundsError, TransferFailedError } from './index';
import { random } from 'lodash';

jest.mock('lodash', () => ({
  random: jest.fn(),
}));

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(1000);
    expect(account.getBalance()).toBe(1000);
  });

  test('should throw InsufficientFundsError when withdrawing more than balance', () => {
    const account = getBankAccount(500);
    expect(() => account.withdraw(600)).toThrow(InsufficientFundsError);
    expect(() => account.withdraw(600)).toThrow('Insufficient funds: cannot withdraw more than 500');
  });

  test('should throw TransferFailedError when transferring to the same account', () => {
    const account = getBankAccount(1000);
    expect(() => account.transfer(100, account)).toThrow(TransferFailedError);
    expect(() => account.transfer(100, account)).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
    const account = getBankAccount(1000);
    account.deposit(500);
    expect(account.getBalance()).toBe(1500);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(1000);
    account.withdraw(300);
    expect(account.getBalance()).toBe(700);
  });

  test('should transfer money', () => {
    const accountA = getBankAccount(1000);
    const accountB = getBankAccount(500);
    accountA.transfer(200, accountB);
    expect(accountA.getBalance()).toBe(800);
    expect(accountB.getBalance()).toBe(700);
  });

  test('fetchBalance should return a number if request does not fail', async () => {
    (random as jest.Mock).mockReturnValueOnce(50); 
    (random as jest.Mock).mockReturnValueOnce(1);  
    const account = getBankAccount(1000);
    const balance = await account.fetchBalance();
    expect(balance).toBe(50);
  });

  test('fetchBalance should return null if the request fails', async () => {
    (random as jest.Mock).mockReturnValueOnce(50); 
    (random as jest.Mock).mockReturnValueOnce(0);  
    const account = getBankAccount(1000);
    const balance = await account.fetchBalance();
    expect(balance).toBeNull();
  });

  test('should set new balance if fetchBalance returns a number', async () => {
    (random as jest.Mock).mockReturnValueOnce(80); 
    (random as jest.Mock).mockReturnValueOnce(1);  
    const account = getBankAccount(1000);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(80);
  });


});
