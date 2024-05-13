import matplotlib.pyplot as plt
import matplotlib as mpl

mpl.rcParams['font.family'] = 'Malgun Gothic'
mpl.rcParams['axes.unicode_minus'] = False
def create_bar_chart(address, freq):
    plt.bar(address, freq)
    plt.xlabel('주소')
    plt.ylabel('빈도수')
    plt.title('서초구 주소별 빈도수')

address = ['강남대로', '반포대로', '신반포로', '잠원로']
freq = [50,30,20,40]

create_bar_chart(address, freq)
plt.show()