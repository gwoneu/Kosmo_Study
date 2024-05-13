# Numpy (Numerical Python)
# 과학, 공학 연산을 쉽게 하도록 지원하는 다차원 배열(multi-dimensional array) 라이브러리
# Numpy를 사용해서 대규모 배열 처리를 쉽게 하도록 하고, 파이썬 list와는 차이가 있다.

import numpy as np
a = np.array([1,2,3,4,5])
b = np.array([[1,2,3],[4,5,6]])

print(a)
print(b)

# 내부에 연속된 메모리 구조를 가지고 (Array Interface)를 가지고 있고, C를 통해 연산된다.

# 생성 함수 : np.array(), np.zeros(), np.ones(), np.empty(), np.arange(), np.linspace
# 변환 함수 : ndarray.reshape(), ndarray.ravel(), ndarray.transpose(), ndarray.swapaxes()
# 연산 함수 : np.add(), np.substract(), np.multiply(), np.divide(), np.sqrt(), np.dot(), np.sum()
#           np.mean(), np.std(), np.max(), np.min(), np.argmax(), mp.argmin()
# 집계 함수 : ndarray.sum(), ndarray.mean(), ndarray.std(), ndarray.max(), ndarray.min(),
#            ndarray.argmax(), ndarray.argmin()
# 논리 함수 : np.logical_and(), np.logical_or(), np.logical_not()

arr1 = np.zeros(5)
print(arr1)

arr2 = np.zeros((21,81))
print(arr2)

arr1 = np.ones(5)
print(arr1)

arr2 = np.ones((10,10))
print(arr2)

arr3 = np.empty(5)
print(arr3)

arr4 = np.empty((3,3))
print(arr4)

arr1 = np.arange(5)
print(arr1)

arr2 = np.arange(3,10)
print(arr2)

arr3 = np.arange(1,10,0.2)
print(arr3)

arr1 = np.linspace(0,1,5)
print(arr1)

arr2 = np.linspace(-10,10,10)
print(arr2)

# 변환 함수
# 배열 형태 변환

# 1차원 배열을 2차원 배열로 변환 - 오류 
arr = np.array([1,2,3,4,5,6])
arr2 = np.reshape(arr,(2,3))

print(arr2)

# 2차원 배열을 1차원 배열로 변환
arr1 = arr2.flatten()
print(arr1)

# 타입 변환

# 정수를 실수로 변환
arr_int = np.array([1,2,3])
arr_float = arr_int.astype(float)

print(arr_float)

#문자열 배열을 정수형 배열로 변환
arr_str = np.array(['1','2','3'])
arr_int = arr_str.astype(int)
print(arr_int)

# 축 변환
b = np.array([[1,2],[3,4],[5,6]])
trans = b.transpose()
print(trans)
print(np.transpose(trans))

# 집계 함수

print(b)
print(b.sum())
print(b.mean())
print(b.std())
print(b.max())
print(b.min())
print(b.argmax()) # 인덱스 번호 가장 큰 걸 불러온다.
print(b.argmin())

# 논리 함수
arr1 = np.array([True, False, False, True])
arr2 = np.array([True, True, False, False])

print(np.logical_and(arr1, arr2))
print(np.logical_or(arr1, arr2))
print(np.logical_not(arr1))
print(np.logical_not(arr2))