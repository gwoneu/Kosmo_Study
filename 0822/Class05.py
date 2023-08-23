# 음식(추상클래스) - (피자, 햄버거, 김밥 등) 실습
from abc import ABC, abstractmethod

class Food(ABC):
    def __init__(self, name, price):
        self.name = name
        self.price = price

    @abstractmethod
    def cook(self):
        pass

class Pizza(Food):
    def __init__(self, name, price, topping, crust):
        super().__init__(name, price)
        self._topping = topping
        self._crust = crust

    def cook(self):
        str = ""
        for i in self._topping:
            str += i
        print(
            "{}에서 피자가 나왔습니다. 토핑은 {}이고, 크러스트는 {}입니다. 가격은 {}입니다.".format(self.name, ','.join(self._topping), self._crust, self.price))

    def addTopping(self, topping):
        self._topping.append(topping)


p = Pizza("도미노", 100, ["페페로니", "올리브"], "치즈") #리스트 전달
p.addTopping("포테이토") # 한개 추가

p.cook()

# 숙제 - topping, addTopping() -> 리스트, 값 여러개, 값 하나

