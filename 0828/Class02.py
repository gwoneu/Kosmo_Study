import numpy as np
import matplotlib.pyplot as plt

np.random.seed(100)
x = np.random.normal(0, 1, 50)
y = np.random.normal(0, 1, 50)

plt.scatter(x, y)

plt.xlabel('x')
plt.ylabel('y')

plt.title('Scatter Example')

plt.show()

height = [165, 177, 160, 180, 185, 155, 172]
weight =  [62, 67, 55, 74, 90, 43, 64]

plt.scatter(height, weight)
plt.xlabel('Height(m)')
plt.ylabel("Weight(Kg)")
plt.title('Height & Weight')
plt.grid()
plt.show()

plt.scatter(height, weight, s = 500 , c = 'r')
plt.show()

size = 100 * np.arange(1, 8)
color = ['r','g','b','c','m','k','y']

plt.scatter(height, weight, s = size, c = color)
plt.show()

city = ['서울', '인천', '대전', '대구', '울산', '부산', '광주']
lat = [37.56, 37.45, 36.35, 35.87, 35.53, 35.18, 35.16]
lon = [126.97, 126.70, 127.38, 128.60, 129.31, 129.07, 126.85]

pop_den = [16154, 2751, 2839, 2790,1099, 4454, 2995]

size = np.array(pop_den)
color = ['r', 'g', 'b', 'c', 'm', 'k', 'y']

plt. scatter(lon, lat, s = size, c = color)
plt.xlabel('경도(longitude)')
plt.ylabel('위도(latitude)')
plt.title('지역별 인구밀도')

for x, y, name in zip(lon, lat, city):
    plt.text(x, y, name)

plt.show()