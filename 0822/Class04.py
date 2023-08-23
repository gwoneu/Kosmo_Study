# 음식(추상클래스) - (피자, 햄버거, 김밥 등)
from abc import ABC, abstractmethod

class Food(ABC):
    
    @abstractmethod
    def order(self):
        pass
            
            
class Pizza(Food):
    def __init__(self, name, price):
        self.name = name
        self.price = price
        
    def order(self):
        print("주문하신 {} 피자 나왔습니다. 가격은 {}입니다.".format(self.name, self.price))

f1 = Pizza("포테이토",15000)
f1.order()
