# 재귀함수()
# 1.함수 내부에서 자기 자신 함수를 호출해야 한다.
# 2.재귀를 종료시켜주는 조건문이 존재해야 한다.

def test(end):
    if end == 0:
        return
    test(end-1)
    print(end)
    
test(5)

#실습03-1

def f_sum(n):
    if n == 1:
        return 1
    return f_sum(n-1) + n

print(f_sum(10))

def f_number(n):
    if n == 0:
        return 0
    f_number(n//10)
    print(n%10)
    
f_number(1234)


# 두 수 사이의 홀수 구하기
# print_odd(1,10) - 1 3 5 7 9

def print_odd(a,b):
    for a in range(b):
        if a % 2 != 0:
            print(a, end = " ")
    
print_odd(a=1, b=10)
print()

#풀이
def print_odd(start, end):
    if start == end:
        return
    elif start%2 == 1:
        print(start)
    print_odd(start+1,end)
    
print_odd(start=1, end=10)


#피보나치 수열 1 1 2 3 5 8 13 21 34...
# fibo(6) - 출력 8
# 재귀함수 사용해서

def fibo(n):
    a = 1
    b = 1
    if n == 1 or n == 2:
        return 1
    for i in range(1,n):
        a, b = b, b + a
    
    return a
    
print(fibo(6))

#풀이
def fibo(n):
    if n == 1 or n == 2:
        return 1
    return fibo(n-1) + fibo(n-1)
    

#10진수 -> 2진술 변환하기

def binary(n):
    if n < 1:
        return
    binary(n//2)
    print(n%2,end="")

binary(10)
print()
binary(50)