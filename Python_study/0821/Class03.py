#자바에서 .this 파이썬은 .self

class Dog:
    def __init__(self, name, color):
        self.hungry = 0
        self.name = name
        self.color = color
        
    def eat(self):
        self.hungry -= 10
        print("밥먹음", self.hungry)
        
    def walk(self):
        self.hungry += 10
        print("산책", self.hungry)
        
choco = Dog("choco","black")
jjong = Dog("jjong","white")

choco.eat()
choco.eat()
choco.walk()
print(choco.hungry)
print(jjong.hungry)