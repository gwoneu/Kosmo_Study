# # 별 출력하기

# # 사각형별
# lst = []

# #1
# for i in range(5):
#     for j in range(5):
#         print("*", end = " ")
#     print()

# #2 
# # 리스트에 저장   
# for i in range(5):
#     temp = ""
#     for j in range(5):
#         temp += "*"
#     lst.append(temp)

# for i in lst:
#     print(i)
# print(lst)

# #4
# lst = [["*" for i in range(5)] for _ in range(5)]
    
# # 계단식별
# #1
# for i in range(5):
#     print((i+1) * "*")

#2
# for i in range(5):
#     for j in range(5):
#         if i >= j:
#             print("*", end = " ")
#         else :
#             print()
#             break
        
# #3
# lst = []
# for i in range(5):
#     temp = ""
#     for j in range(i+1):
#         temp += "*"
#     lst.append(temp)
    
# for i in lst:
#     print(i)
# print(lst)

# #4
# lst = ["*****" for _ in range(5)]
# lst = [["*" for i in range(j+1)] for j in range(5)]
# print(lst)
# lst = ["*" * (i+1) for i in range(5)]

# for i in lst:
#     print(i)
# print(lst)
    
# 대각선별
#1
# for i in range(5):
#     for j in range(5):
#         if j == i:
#             print("*",end = " ")
#         else :
#             print(" ",end = " ")
#     print()
    
# #2
# for i in range(5):
#     for j in range(5):
#         if j == i:
#             print("*")
#             break
#         else :
#             print(end = " ") #print(" ", end = "")
#     print()
    
# #3 list
# lst = []
# for i in range(5):
#     temp = ""
#     for j in range(5):
#         if i == j:
#             temp += "*"
#             break
#         else :
#             temp += " "
#     lst.append(temp)
    
# for i in lst:
#     print(i)
# print(lst)

# #4
# lst = [" "*i + "*" for i in range(5)]

    
# 계단식(역순)
# #1
# for i in range(5):
#     for j in range(5):
#         if i <= j:
#             print("", end = "*")
#     print()

#2
#역순으로 접근

# for i in range(5):
#     for j in range(4, -1, -1):
#         if i <= j:
#             print("*",end="")
#         else :
#             print(end = " ")
#     print()
    
# #3
# lst = []
# for i in range(5):
#     temp = ""
#     for j in range(5):
#         if i <= j: #i가 j 이하일때만 temp에 *을 추가하겠다.
#             temp += "*"
#         lst.append(temp)
        
# for i in lst:
#     print(i)
# print(lst)

lst = []
for i in range(5):
    temp = ""
    for j in range(5):
        if i <= j:
            temp += "*"
        else : 
            temp += " "
    lst.append(temp)
    
for i in lst: 
    print(i)
print(lst)

lst = [["*" for i in range(5-j)] for j in range(5)]
lst = ["*"*(5-i) for i in range(5)]
for i in lst:
    print(i)
print(lst)

    
# 계단식(역순)
#1
# for i in range(5):
#     for j in range(5):
#         if i <= j:
#             print("*", end = "")
#         else :
#             print(" ", end = "")
#     print()

#2
lst = [" " *i+ "*"*(5-i) for i in range(5)]
for i in lst:
    print(i)
print(lst)

lst = ["*"*(i+1) for i in range(5)]

for i in reversed(lst):
    print(i)
print(lst)

lst = []
for i in range(5):
    temp = []
    for j in range(4,-1,-1) :
        if i <= j:
            temp.append("*")
        else :
            temp.append(" ")
    lst.append(temp)
    
for i in lst:
    i.reverse()
    
for i in lst:
    print(i)
print(lst)