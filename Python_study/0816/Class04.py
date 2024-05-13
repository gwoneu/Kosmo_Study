x = int(input("찾고자 하는 값을 입력해주세요 : "))

a = [1,1,2,2,3,3]
print(a.count(x))

#1.count 함수 원리 구현해보기
c = 0
# for i in range(len(a)): range(0, leng(a), 1)
for i in a:
    if(i == x):
       c += 1
print(c) 

a = [1,2,3]
a.reverse()
print(a)

#2.reverse 함수 원리 구현해보기
b = []
for i in range(len(a)-1, -1, -1): #for(int i=a.length-1; i>-1; i--)
    b.append(a[i])
    
print(b)

start, end = 0, len(a)-1
temp = 0

while end > start:
    temp = a[start]
    a[start] = a[end]
    a[end] = temp #a[start], a[end] = a[end], a[start]
    start += 1
    end -= 1
    
print(a)

for i in range(len(a)//2):
    temp = a[i]
    a[i] = a[len(a)-i-1]
    a[len(a)-i-1] = temp

print(a)

# 3. list 함수 원리 구현해보기 (숫자로)
s = 123456
# list = list(s)
# print(lst)

lst = []

while s > 0:
    lst.append(s%10)
    s //= 10 # s = s // 10
    
lst.reverse()

print(lst)

s = 123456
num = 10
count = 1

while s > num:
    num *= 10
    count += 1
    
print(count)
print(s//10**count)

while s > 0:
    lst.append(s//10**count)
    s = s % 10**count
    count -= 1
    
print(lst)

# 오답 1 )
# s = "123456"
# 오답 2 )
# s = [1,2,3,4,5,6]
# 오답 3 )
# s = 123456
# s2 = str(s)

# 4. [3,6,9,20,-7,5] 리스트를 sort와 같은 함수를 사용하지 말고 for문을 활용하여 오름차순으로 정렬해주세요.

# 5. 2 x 5 이차원 리스트 만들어서 1-10까지 채우기
# lst = [[0,0],[0,0],[0,0],[0,0],[0,0]]

# for(int i = 0; i < arr.length(); i++) {
#     for(int j = 0; j < arr[0].length(); j++) {
#         arr[i][j] = 5*i+j+1
#     }
# }

lst = []
for i in range(len(lst)):
    for j in range(len(lst[0])):
        lst[i][j] = 2*i+j+1
        
for i in range(len(lst)):
    for j in range(len(lst[0])):
        print(lst[i][j], end=" ")
    print()
    
lst = []
num = 1

for i in range(5):
    temp = []
    for j in range(2):
        temp.append(num)
        num += 1
    lst.append(temp)
        
print(lst)