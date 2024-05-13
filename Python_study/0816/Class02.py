# for i in range(0,10,2):
#     print(i)
#
# for i in range(10,0,-1):
#     print(i)

#range(1.처음, 2.끝, 3.증가)
#1.어디부터 시작할래?
#2.어디까지 할래?
#3.어떻게 진행할래?

#실습01

# a = int(input("몇 단을 출력하시겠습니까? "))
# for i in range(1,10,1):
#     print(a, "*", i, "=", a * i)
#
# print("------------------")
# for i in range(2,10,1):
#     for j in range(1,10,1):
#         print(i,"*",j,"=",i*j)
        #print("%d X %d = %d" %(i,j,i*j))

#실습01(while)

# x = 1
# sum = 0
# while(x != 0):
#     x = int(input("값을 입력해주세요 : "))
#     sum += x
#
# print("합계는? ", sum)
#
# x = 1
# sum = 0
# while(True) :
#     x = int(input("값을 입력해주세요 : "))
#     sum += x
#     if x == 0:
#         break
#
# print("합계는? ", sum)

#홀수단, 짝수단 출력

a = int(input("숫자를 입력하세요 : "))

if a == 1:
    for i in range(2,10,1):
        for j in range(1,10,1):
            if i % 2 != 0:
                print(i,"*",j,"=",i*j)

elif a == 2:
    for i in range(2,10,1):
        for j in range(1,10,1):
            if i % 2 == 0:
                print(i,"*",j,"=",i*j)