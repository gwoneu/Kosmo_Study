import matplotlib.pyplot as plt
import numpy as np

# 데이터 생성
x = np.linspace(0, 10, 100)
y = np.sin(x)

# 선그래프 생성
plt.plot(x, y)

# 그래프 꾸미기
plt.title('Sine 그래프')
plt.xlabel('Time')
plt.ylabel('Sine of Time')

# 그래프 출력
plt.show()

# matplotlib - 가장 기본적인 데이터 시각화 라이브러리
# 2D 그래프 특화 - 3D 일부 가능
# 선 그래프, 막대 그래프, 히스토그램, 산점도...

# Seaborn - matplot 기반의 고급 통계 차트

import numpy as np
x = np.arange(-4.5, 5, 0.5)
y = 2*x**2
print(plt.plot(x, y))
print(plt.show())

#차트 꾸미기
ax = plt.gca() # get current axes - 현재 활성화된 축 객체를 가져온다
ax.spines["top"].set_visible(False) - 스파인
ax.spines["right"].set_visible(False)
ax.spines["bottom"].set_linewidth(0.5)
ax.spines["left"].set_linewidth(0.5)
ax.tick_params(width = 0.5)

# 차트 출력
plt.show()