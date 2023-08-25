# Pandas
# 데이터 분석 및 조작을 위한 라이브러리 (Numpy 기반)

import pandas as pd
import numpy as np

# Series : 1차원 배열 구조
# DataFrame : 2차원 배열 구조

# CSV, Excel, SQL 쿼리

# Series
s = pd.Series([1,3,4, np.nan, 6,8])
print(s)

s1 = pd.Series([10,20,30,40,50])
print(s1)
print(s1.index)
print(s1.values)
s2 = pd.Series(['a','b','c',1,2,3])
print(s2)
date = ['2023-01-01','2023-06-15','2023-08-25','2023-10-06']
s4 = pd.Series([200,180,np.nan,210], index = date)
print(s4)
s5 = pd.Series({'2023' : 200, '2022' : 180, '2021' : 210})
print(s5)
print(pd.date_range(start = '2023-08-15', end = '2023-08-25'))
print(pd.date_range(start = '15.08.2023', end =  '2023/08/25'))
print(pd.date_range(start = '2023-08-25', periods = 4))
print(pd.date_range(start = '2023-08-25', periods = 6, freq = '2B'))
print(pd.date_range(start = '2023-08-25 09:30', periods = 6, freq = '30min'))

date = pd.date_range(start = '2023-08-21', end = '2023-08-25')
a = pd.Series(['가','나','다','라','마'], index = date)
print(a)

# 추가 풀이
# date = pd.date_range(start = '2023-08-21', periods = 5)

# DataFrame
data = {
    'Name' : ['짱구', '철수', '유리'],
    'Age' : [5,5,5]
}

df = pd.DataFrame(data)

print(df)
print(df['Name'])

print(df.loc[0]) # 이름
print(df.iloc[0]) # 위치

print(pd.DataFrame([[1,2,3],[4,5,6],[7,8,9]]))
data_list = np.array([[1,2,3],[4,5,6],[7,8,9]])
print(pd.DataFrame(data_list))

# date = pd.date_range('2023-08-25', periods = 3)
# column = ['A','B','C']
# print(pd.DataFrame(data_list, index = date, cloumns = column))

data1 = {'A' : [1,2,3,4,5], 'B' : [6,7,8,9,10], 'C' : [11,12,13,14,15]}
data2 = {'B' : [1,2,3,4,5], 'C' : [6,5,7,4,2], 'A' : [11,12,14,52,23]}
d1 = pd.DataFrame(data1)
d2 = pd.DataFrame(data2)
print(d1)
print(d2)
print(d1 + d2)
print(d1 - d2)

# data = {'봄' : [256.2, 156.2, 456.2, 315.5],
#         '여름' : [118.2, 154.6, 488.3, 159.3],
#         '가을' : [512.3, 765.1, 234.3, 486.3],
#         '겨울' : [132.9, 147.3, 487.9, 324.6]}
# columns_lst = ['봄','여름','가을','겨울']
# index_lst = [2020, 2021, 2022, 2023, 2024]

# df = pd.DataFrame(data, columns = columns_lst, index = index_lst)
# print(df)

KTX_data = {'경부선 KTX': [39060, 39896, 42005, 43621, 41702, 41266, 32427],
            '호남선 KTX': [7313, 6967, 6873, 6626, 8675, 10622, 9228],
            '경전선 KTX': [3627, 4168, 4088, 4424, 4606, 4984, 5570],
            '전라선 KTX': [309, 1771, 1954, 2244, 3146, 3945, 5766],
            '동해선 KTX': [np.nan,np.nan, np.nan, np.nan, 2395, 3786, 6667]}
col_list = ['경부선 KTX','호남선 KTX','경전선 KTX','전라선 KTX','동해선 KTX']
index_list = ['2011', '2012', '2013', '2014', '2015', '2016', '2017']

df_KTX = pd.DataFrame(KTX_data, columns = col_list, index = index_list)
print(df_KTX)
print(df_KTX.index)
print(df_KTX.columns)
print(df_KTX.head())
print(df_KTX.head(3))
print(df_KTX[2:4])
print(df_KTX.loc['2012' : '2016'])
print(df_KTX.loc['2012']['경전선 KTX'])
df = df_KTX.sort_values('호남선 KTX')
print(df)

data = {
    'Name' : ['짱구', '철수','훈이'],
    'Age' : [5,5,5],
    'Money' : [120,400,50]
}
df = pd.DataFrame(data)
print(df)
print(df[df['Age'] == 5]['Name'].values)
print(df.loc[df['Money'].idxmax()])



