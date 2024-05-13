# alice.txt에서 1.단어가 총 몇개 있는지 - 2145
# 2.어떤 단어가 있는지, 각 단어가 몇 개씩 있는지 - 숙제

with open('alice.txt', 'r') as f:
    contents = f.read()

# 구두점 제거
punctuations = '''!()-[]{};:'"\,<>./?@#$%^&*_~'''
for punctuation in punctuations:
    contents = contents.replace(punctuation, "")

contents = contents.replace("\n", " ")

print(contents.split())
print(len(contents.split()))

# result = contents.split()
# word_count = len(result)

# print(result)
# print(word_count)

words = contents.split()
words = contents.lower().split()

# 각 단어 개수 계산
words_count = {}
for word in words:
    if word in words_count:
        words_count[word] += 1 #값 1 증가
    else:
        words_count[word] = 1 #딕셔너리 새로 추가
        
#단어 개수 출력
for word, count in words_count.items():
    print(f"{word}:{count}")