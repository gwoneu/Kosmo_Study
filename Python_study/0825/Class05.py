# 데이터 통합
# 여러개의 데이터셋을 결합해서 단일 데이터 셋으로 만든다.

import pandas as pd

# concat
# 동일한 열 이름을 가진 여러 데이터프레임을 행 방향(axis = 0)나 열 방향(axis = 1)로 결합할 때 사용한다.

df1 = pd.DataFrame({'A' : ['A0','A1'], 'B' : ['B0', 'B1']})
df2 = pd.DataFrame({'A' : ['A2','A3'], 'B' : ['B2','B3']})

row = pd.concat([df1, df2], axis = 1)

print(row)

column = pd.concat([df1,df2], axis = 1)

print(column)

# merge
# 공통된 열 혹은 인덱스 기준으로 통합된다.

df1 = pd.DataFrame({'Name' : ['john', 'Anna', 'Perter'], 'Age' : [28,24,36]})
df2 = pd.DataFrame({'Name' : ['john', 'Anna', 'Peter'], 'City' : ['New York', 'Paris', 'Seoul']})

res = pd.merge(df1, df2, on = 'Name')
print(res)

# join
# 인덱스 기반 결합 작업, 왼쪽으로 조인, how(내부 inner, 외부 outer, 왼쪽 left, 오른쪽 right)
df1 = pd.DataFrame({'A' : ['A0','A1'], 'B' : ['B0', 'B1']}, index = ['I','J','K'])
df2 = pd.DataFrame({'A' : ['A2','A3'], 'B' : ['B2','B3']}, index = ['I','J','K'])

res = df1.join(df2)
print(res)