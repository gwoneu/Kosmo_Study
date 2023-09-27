def selection_sort(arr):
    min_index = 0
    
    for i in range(len(arr)):
        if arr[i] < arr[min_index]:
            min_index = i
            
            for j in range(i+1, len(arr)):
                if arr[j] < arr[min_index]:
                    min_index = j
            
    arr[i], arr[min_index] = arr[min_index], arr[i]
    
    return arr

lst = [11,3,24,9,40,33,7,2,8,30]
print(selection_sort(lst))