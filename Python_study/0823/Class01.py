x = [1,2,3]

try:
    print(10/0)
    x[5]
    
except ZeroDivisionError as e:
    print("숫자를 0으로 나눌수 없음", e)
except IndexError as e:
    print("잘못된 인덱스", e)

try:
    raise Exception("예외강제발생")
except Exception as e:
    print("예외발생", e)
    
class MyError(Exception):
    def __init__(self):
        super().__init__("나의 오류")
        
try:
    raise MyError
except Exception as e:
    print("예외발생",e)