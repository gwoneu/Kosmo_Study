class Car:
    car_count = 0
    
    def __init__(self, name, exhaust, production):
        self._name = name
        self._exhaust = exhaust
        self._production = production
        Car.car_count += 1
        
    def setName(self, name):
        self._name = name
    
    def setYear(self, year):
        self._year = year
        
    def getName(self):
        return self._name
        
    def size(self):
        if self._exhaust < 1000:
            print("소형")
        elif self._exhaust < 2000:
            print("중형")
        else:
            print("대형")
    
    @classmethod        
    def carCount(cls):
        print("총 등록된 차량은 :", cls.car_count)
        
car1 = Car("소나타", 900, 2023)
car2 = Car("그랜저", 2500, 2022)
car3 = Car("벤츠", 2000, 2023)

car1.size()
car2.size()
car1.getName()

car1.carCount()