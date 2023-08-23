
# 람다(lambda)는 익명 함수를 생성하는 키워드다. 코드를 짧게 만드는데 사용함
# 함수를 만들 때, 간단한 함수를 만든다. 매개변수, return, def .. 과정들이 너무 번거롭기 떄문에

# lambda arguments: expression

def add(x,y):
    return x+y

add_lambda = lambda x,y: x+y
# lambda 람다 키워드
# arguments 매개변수 x,y
# expression 표현식 x + y

print(add(x = 3,y = 4))
print(add_lambda(x = 3,y = 4))

# map 함수 - 파이썬 내장 함수
# 주어진 함수를 반복 가능한(interable) 객체의 각 원소를 적용하고, 결과를 반환한다. #리스트 컴프리헨션

def square(x):
    return x * x

lst = [1,2,3,4,5]
square_list = map(square, lst)
lst = list(square_list)

lst = [1,2,3,4,5]
square_list = map(lambda x : x*x, lst)
lst = list(square_list)

print(lst)

a = [1,2,3,4,5,6,7,8,9,10]

for i in range(len(a)):
    if a[i] % 2 == 0:
        a[i] = 0
        
print(a)

def f(x):
    if x % 2 == 0:
        return 0
    else:
        return x

for i in range(len(a)):
    a[i] = f(a[i])
    
print(a)

a = [1,2,3,4,5,6,7,8,9,10]
print(list(map(f,a)))
a = [1,2,3,4,5,6,7,8,9,10]
print(list(map(lambda x : 0 if x % 2 == 0 else x,a)))

# filter 함수 - 파이썬 내장 함수
# 주어진 함수를 반복 가능한(iterable) 객체의 결과가 참인 원소들만 반환한다.

# filter(function, iterable)

def is_even(x): #return값이 boolean
    return x % 2 == 0

lst = [1,2,3,4,5]

even_lst = filter(is_even, lst)
even_lst = filter(lambda x: x % 2 == 1, lst)

print(list(even_lst))

#실습04-1
numbers = [12,32,55,12,32,4,86,50]

print(list(map(lambda x:"합격" if x > 60 else "대기" if x > 50 else "불합격",numbers)))

#실습04-2
files = ["memo.txt","1.jpg","32.png","23.jpg","233.jpg"]

print(list(filter(lambda x: '.jpg' in x, files)))

#풀이
print(list(filter(lambda x: x.find(".jpg") != -1, files)))
for i in files:
    if ".jpg" in i:
        print(i)
        
# in, .jpg 사용하지 않고 - 숙제
print(list(filter(lambda x: x != '.txt' and x != '.png', files)))

        
# 리스트 세 개의 곱
lst1 = [1,2,3,4,5]
lst2 = [1,3,5,7,9]
lst3 = [2,4,8]

print(list(map(lambda x,y,z: x*y*z, lst1,lst2,lst3)))

#풀이
print(list(map(lambda x: x[0] * x[1] * x[2], zip(lst1,lst2,lst3))))

#1부터 10까지의 제곱 값 중 홀수만 출력해보기
numbers = [1,2,3,4,5,6,7,8,9,10]

a = list(map(lambda x:x*x, range(1,11)))
print(a)
print(list(filter(lambda x: x % 2 == 1, a)))

print(list(filter(lambda x: x % 2 == 1, map(lambda x: x*x, range(1,11)))))