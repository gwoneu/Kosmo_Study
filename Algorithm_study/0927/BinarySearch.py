def binary_search(array, target, low=None, high=None):
    if low is None:
        low = 0
    if high is None:
        high = len(array) - 1
    
    if high < low:
        return False
    
    mid = (low+high) // 2
    print(array[mid], end=' ')
    if target == array[mid]:
        return True
    elif target < array[mid]:
        return binary_search(array, target, low, mid-1)
    else :
        return binary_search(array, target, mid+1, high)
        
lst = [1,3,4,9,10,13,17,24,28,30]
print(binary_search(lst, 4)) # True
print(binary_search(lst, 30)) # True
print(binary_search(lst, 38)) # False