import numpy as np

arr1 = np.array([10,20,30,40])
arr2 = np.array([1,2,3,4])

print(arr1 + arr2)
print(arr1 - arr2)
print(arr1 * arr2)
print(arr1 *2)
print(arr1 / arr2)
print(arr1**2)
print(arr1 > 20)
a = np.array([1,2,3,4,5,6])
print(a[a > 3])
print(a[(a % 2) == 0])
print(a[1])
print(a[:2])