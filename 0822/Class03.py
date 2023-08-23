#from abc impor *  abc파일에 있는 클래스 전부 다
from abc import *
from abc import ABC, abstractmethod

class Animal(metaclass = ABCMeta):
    @abstractmethod
    def eat(self):
        pass
    
class Dog(ABC, Animal): #다중 상속이 가능하다 -> 인터페이스가 필요없다.
    @abstractmethod
    def walk(self):
        pass
    
    def eat(self):
        print("우걱우걱")
    
class Golden(Dog):
    @abstractmethod
    def walk(self):
        print("터벅터벅")
    