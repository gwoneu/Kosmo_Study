class NotNumnerException(Exception):
    def __init__(self):
        super().__init__("Notumber : 잘못된 숫자입니다.")
        
def gugudan(n):
    if not(n <= n <= 9):
        try:
            raise NotNumnerException
        except Exception as e:
            print(e)
    else:
        for i in range(1,10):
            print("{} X {} = {}".format(n,i,n*i))
            
input_number = int(input())
gugudan(input_number)


# 패키지에서 디렉토리 내에 __init__.py 파일이 있어야 한다.
# 버전 업데이트 되면서 반드시 있어야 된다 -> 없어도 된다.
# 이제는 없어도 되지만, 약속