#실습 02

a = [[10, 20],[30, 40],[50,60]]
b = [[2, 3],[4, 5],[6, 7]]

c = [[0]*2]*3

for i in range(len(a)):
    c[i] = [a*b for a,b in zip(a[i],b[i])]

print(c)

#문제 01
#[[1,2],[3,4],[5,6]] 리스트 컴프리헨션으로 만들기
a = [[i,i+1] for i in range(1,6,2)]

print(a)

#문제 02
#2차원 10x10 리스트 0으로 채우기 / 컴프리헨션으로 만들기

b = [i*0 for i in range(10)]
print(b)
b = [[i*0 for i in range(10)] * j*0 for j in range(10)]
print(b)


#문제 03
#100이하의 소수(약수가 1과 자기자신)으로 이루어진 1차원 리스트 컴프리헨션으로 만들기