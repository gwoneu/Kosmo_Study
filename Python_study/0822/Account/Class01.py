# Account = (AtmAccount, BankAccount, CreditAccount)
# Atm = 현금 입출금 -> 5만원권, 1만원권, 5천원, 1천원
# Bank = 예금 이자 (최저 금액 이상 이자)
# Creait = 결제(한도초과)

class Account:
    def __init__(self, account_number, balance):
        self._account_number = account_number
        self._balance = balance
        
    def deposit(self, amount):
        if amount < 0:
            raise ValueError("잘못된 입력입니다.")
        else:
            self._balance += amount
        
    def withdraw(self, amount):
        if amount > self._balance and amount < 0:
            raise ValueError("금액이 부족합니다.")
        self._balance -= amount
        
    def get_balance(self):
        return self._balance
    
    def get_account_number(self):
        return self._account_number

class AtmAccount(Account):
    def __init__(self, account_number, balance):
        super().__init__(account_number, balance)
    
    def withdraw(self, amount):
        if 0 < amount <= self.balance:
            self.balance -= amount
            return True
        return False
