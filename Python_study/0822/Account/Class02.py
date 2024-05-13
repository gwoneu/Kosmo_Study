class Account:
    def __init__(self, name, account, balance) -> None:
        self._name = name
        self._account = account
        self._balance = balance
        
    def getBalance(self):
        return self._balance
    
    def setBalance(self, balance):
        self._balabce = balance
        
class AtmAccount(Account):
    def __init__(self, name, account, balance = 0, cash = 0):
        super().__init__(name, account, balance)
        self._cash = cash
        
    def deposit(self, cash):
        self._cash += cash
        self.setBalance(self.getBalance() + cash)
        
    def withdraw(self, cash):
        if self.getBalance() < cash:
            print("잔액이 부족합니다. 출금할 수 없습니다.")
        else :
            check = input("1. 5만원권을 최대로, 2. 선택, 3. 1만원권을 최대로")
        
        if check == 1:
            c5 = cash // 50000
            cash -= c5*50000
            print(f"출금이 완료되었습니다. 5만원권 {c5}장과 만원권 {cash//10000}장을 받아가세요.")
            
        elif check == 2:
            c1 = input("1. 5만원권의 장수와 1만원권의 장수를 순서대로 입력해주세요.") # 5 10
            c = c1.split(' ')
            print(f"출금이 완료되었습니다. 5만원권 {c[0]}장과 만원권 {c[1]}장을 받아가세요.")
            
        elif check == 3:
            m = cash // 10000
            print(f"출금이 완료되었습니다. 만원권 {m}장을 받아가세요.")
            
    class BankAccount(Account):
        def __init__(self, name, account, balance = 0):
            super().__init__(name, account, balance)
            
        def interst(self): #이자 지급
            return super()._balance * 0.05 / 12
        
    class creditAccount(Account):
        def __init__(self, name, account, balance = 0, pay = 0, limit = 10000000):
            super().__init__(name, account, balance)
            self._pay = pay
            self._limit = limit
            
        def payment(self, pay):
            if self._limit < self._pay + pay:
                print("결제할 수 없습니다. 한도초과입니다.")
                
            else :
                self._pay += pay
                print("결제가 완료되었습니다. {}원이 결제되었습니다.".format(pay))