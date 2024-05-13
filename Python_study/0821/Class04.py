# 계산기 클래스 변수 2개 +-* / 연산

class Calculator:
    def __init__(self):
        self._num1 = 0
        self._num2 = 0
        self._expression = ""
        
    def set_num1(self, num):
        self._num1 = num
        
    def set_num2(self, num):
        self._num2 = num
        
    def set_expression(self, exp):
        self._expression = exp
        
    def add(self):
        return self._num1 + self._num2
    
    def subtract(self):
        return self._num1 - self._num2
    
    def multiply(self):
        return self._num1 * self._num2
    
    def divide(self):
        if self._num2 == 0:
            return "Error: division by zero"
        return self._num1 / self._num2