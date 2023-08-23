class Dog:
    def __init__(self, name, age):
        self.name = "백구"
        self.age = 3
        
    def sayHello(self):
        print("멍멍 : " , self.name , "왈왈 : ", self.age)
        #print("멍멍 : {}, 왈왈 : {}".format(self.name, self.age))
        
    def ageCal(self):
        print("사람 나이로 환산하면 ", (24 + (self.age)*4), "세입니다.")
        #print("사람 나이로 환산하면 {}세입니다.".format(24+self.age-2)*4)
        
    def compareToAge(self,personAge):
        return 24 + (self.age-2)*4 > personAge
    
    def printB(self, person):
        if 24 + (self.age - 2)*4 - person.age:
            print("{}의 나이가 {} 나이보다 많습니다.".format(self.name, person.name))
        else:
            print("{}의 나이가 {} 나이보다 적습니다.".format(self.name, person.name))
    
    
    
class Person:
    def __init__(self,name = "Kim", age = 20):
        self.name = name
        self.age = age
        self.arr = [0,0,0,0,0]
        
    def sayHello(self):
        print("Hello, my name is", self.name, "and I'm", self.age,"years old")
        print("Hello, my name is {} and I'm {} years old.".format(self.name, self.age))
        
    def setName(self, name):
        self.name = name
        
    def setAge(self, age):
        self.age = age
        
        
        
person1 = Person("Kim", 20)

person1.sayHello()