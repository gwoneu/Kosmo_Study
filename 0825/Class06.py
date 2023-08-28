import pandas as pd
import numpy as np

# 1000명의 사람 데이터 만들기
# ID : ID_1, ID_2 ... ID_1000
# 나이 : 20 ~ 60 랜덤
# 도시 : 특정 도시에서 랜덤으로 할당 ex) New York, Paris, Berlin, London, Seoul, Tokyo

# 2번 데이터셋
# ID : ID_1, ID_2, ... ID_1000
# 연봉 : 랜덤

# 3번 데이터셋
# 도시 : 특정 도시에서 랜덤으로 할당 ex)New York, Paris, Berlin, London, Seoul, Tokyo
# 나라 : 특정 도시의 나라 ex) USA, France, Germany, Korea, Japan

# 1. 1번 데이터셋과 2번 데이터셋 병합(ID 기준)
# 2. 병합된 데이터에 City를 기준으로 병합
# 3. 각 나라별 평균 연봉
# 4. 제일 연봉이 높은 사람 어느 나라 사람인지?
np.random.seed(0)

df1 = pd.DataFrame({
    'ID' : ['ID_' + str(i) for i in range(1,1001)],
    'Age' : np.random.randint(20, 60, 1000),
    'City' : np.random.choice(['New York', 'Paris', 'Berlin', 'London', 'Seoul', 'Tokyo'], 1000)
    })

df2 = pd.DataFrame({
    'ID' : ['ID_' + str(i) for i in range(1,1001)],
    'Salary' : np.random.randint(2000000,4000000,1000)
})

df3 = pd.DataFrame({
    'City' : ['New York', 'Paris', 'Berlin', 'London', 'Seoul', 'Tokyo'],
    'Nation' : ['USA', 'France','Germany','UK','Korea','Japan']
})

#1
res1 = pd.merge(df1, df2, on = 'ID', how = 'outer')
print(res1)

#2
res2 = pd.merge(res1, df3, on = 'City')
print(res2)

#3
average_salary_per_nation = res2.groupby('Nation')['Salary'].mean()
print(average_salary_per_nation)

#4
high_salary_person_nation = res2.loc[res2['Salary'].idxmax()]['Nation']
print("Highest salary person's Nation : ", high_salary_person_nation)