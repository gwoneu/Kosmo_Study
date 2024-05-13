class Animnal:
    def __init__(self):
        self.hungry = 0
        
    def eat(self):
        self.hungry -= 10
        print("밥먹음",self.hungry)
        
    def walk(self):
        self.hungry += 10
        print("산책", self.hungry)
        
    
class Dog(Animnal):
    def __init__(self):
        super().__init__()
        
    def sound(self):
        print("멍멍")
        
    def eat(self):
        super().eat()
        print("왈왈")

dog = Dog()
dog.eat()