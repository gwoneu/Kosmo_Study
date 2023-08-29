import numpy as np
import matplotlib.pylab as plt
import matplotlib as mpl

mpl.rcParams['font.family'] = 'Malgun Gothic'
mpl.rcParams['axes.unicode_minus'] = False

member_IDs = ['m_01', 'm_02', 'm_03', 'm_04']
before_ex = [27, 35, 40, 33]
afer_ex = [30, 38, 42, 37]

n_data = len(member_IDs)
index = np.arange(n_data)
plt.bar(index, before_ex, tick_label = member_IDs)
plt.show()

colors = ['r', 'g', 'b', 'm']
plt.bar(index, before_ex, tick_label = member_IDs, color = colors)
plt.show()

colors = ['r', 'g', 'b', 'm']
plt.bar(index, before_ex, tick_label = member_IDs, color = colors, width = 0.1)
plt.show()

colors = ['r', 'g', 'b', 'm']
plt.barh(index, before_ex, tick_label = member_IDs, color = colors)
plt.show()

bwidth = 0.5
plt.bar(index, before_ex, tick_label = member_IDs, color = 'c', align = 'edge', width = bwidth, label = 'before')
plt.bar(index + bwidth, before_ex, tick_label = member_IDs, color = 'm', align = 'edge', width = bwidth, label = 'after')

plt.xticks(index + bwidth, member_IDs)
plt.legend()
plt.xlabel('회원 ID')
plt.ylabel('윗몸일으키기 횟수')
plt.title('운동 시작 전과 후의 변화')
plt.show()