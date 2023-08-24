# alice.txt에서 1.단어가 총 몇개 있는지 - 2145
# 2.어떤 단어가 있는지, 각 단어가 몇 개씩 있는지 - 숙제

with open('alice.txt', 'r') as f:
    contents = f.read()

# 구두점 제거
punctuations = '''!()-[];:'"\,<>./?@#$%^&*_~'''
for punctuation in punctuations:
    contents = contents.replace(punctuation, "")
    
contents = contents.replace("\n","")
    
print(len(contents.split()))

# result = contents.split()
# word_count = len(result)

# print(result)
# print(word_count)
