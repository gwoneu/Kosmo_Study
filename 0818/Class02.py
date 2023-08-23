lst = [1,2,3,1,4,2,1]

def allindex(lst, a):
    temp = []
    for i in range(len(lst)):
        if a == lst[i]:
            temp.append(i)
    return temp

print(allindex(lst, a = 1))

person1 = ["치킨", "피자", "족발", "삼겹살"]
person2 = ["김밥", "김치찌개", "삼겹살", "쌈밥"]
person3 = ["치킨", "김치찌개", "떡볶이", "초밥", "삼겹살", "족발", "햄버거", "보쌈", "한우", "아이스크림"]

#all, any 사용하여 공통된 음식 찾기 일단 두명부터

# all 함수 : 모든 값이 True일 때, True (=and)
# any 함수 : 하나라도 True면 True를 리턴한다. (=or)

res = any(food in person2 for food in person1) #food가 person2에 있는지 확인 -> food가 ? -> food는 person1에 있는거야
common_foods = [food for food in person1 if any(food == food2 for food2 in person2)]

print(res)
print(common_foods)

lst = [food for food in common_foods if any(food == food3 for food3 in person3)]
print(lst)