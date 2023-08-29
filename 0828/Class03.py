# CSV 파일 읽기
import csv
import numpy as np
import matplotlib.pyplot as plt
import matplotlib as mpl

mpl.rcParams['font.family'] = 'Malgun Gothic'
mpl.rcParams['axes.unicode_minus'] = False

def read_csv_file(file_path):
    data = []
    with open(file_path, mode='r', encoding='utf-8') as file:
        reader = csv.reader(file)
        next(reader)  # 헤더 건너뛰기

        for row in reader:
            name, age, gender, address = row
            data.append((int(age), gender, address))

    return data

def create_scatter_plot(data):
    coordinates_lst = [(age, 0 if gender == '남성' else 1) for age, gender, _ in data]
    x_coords_lst, y_coords_lst = zip(*coordinates_lst)

    plt.scatter(x_coords_lst, y_coords_lst, c = y_coords_lst, cmap=plt.get_cmap('tab20b'))
    plt.yticks([0,1], ['남성', '여성'])
    plt.xlabel('나이')
    plt.title('서초구 주민 인구 - 나이와 성별')
    
def compare_age(data):
    male_lst = [age for age, gender, _ in data if gender=='남성']
    female_lst = [age for age, gender, _ in data if gender=='여성']

    average_male = sum(male_lst) / len(male_lst)
    average_female = sum(female_lst) / len(female_lst)
    print(f'남성 평균 나이 :  {average_male:.2f}')
    print(f'여성 평균 나이 :  {average_female:.2f}')

data_set = read_csv_file('seocho_people.csv')

create_scatter_plot(data_set)
plt.colorbar(label='Gender')
plt.show()

compare_age(data_set)
# 나이와 성별에 따른 산점도 그래프를 그리고
# 성별 평균 나이 구해보기

