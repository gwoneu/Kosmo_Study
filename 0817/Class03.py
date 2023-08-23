a = [i for i in range(10)]

# a = [i] a에 [i]를 넣겠다.
# i가 뭔데?
# for i in range(10) : 0...9
# a = [0,...,9]

print(a)

a = [i for i in range(10) if i % 2 == 0]

# a = [i] a에 [i]를 넣겠다.
# i가 뭔데?
# for i in rane(10) i는 0...9야
# if i % 2 == 0 i는 2로 나눈 나머지가 0이야
# a = [0,2,4,6,8]

print(a)

a = [i*j for i in range(2, 10) for j in range(1, 10)]

# a = [i*j] a에 i*j를 넣겠다.
# i가 뭔데?
# for i in range(2, 10) i는 2...9까지야
# j는 뭔데?
# for j in range(1, 10) j는 1...9까지야

print(a)

# 리스트 컴프리핸션
# 실습 01 (word 중 글자수가 6글자 이상인 문자를 모아 새로운 리스트를 생성하세요)
word = ["school","game","piano","science","hotel","mountian"]

a = [i for i in word if i >= 6]
# a = [wor[i] for i in range(len(word)) if word[i] >= 6]

print(a)

# 실습 02
word = ["school","game","piano","science","hotel","mountian"]

a = [len(i) for i in word]

print(a)


# 실습 03
a = [0,0,0,0,0,0,0,0,0,0]
a = [i for i in range(10) if i == 0] #a에 i 를 넣을꺼야 i는 0...9야, 근데 i가 0일때만 넣어줘

a = [i*0 for i in range(10)]
print(a)