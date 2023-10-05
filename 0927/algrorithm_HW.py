def search_matrix(matrix, target):
    if not matrix:
        return False
    
    row = len(matrix) - 1
    col = 0

    while row >= 0 and col < len(matrix[0]):
        if matrix[row][col] > target:
            row -= 1
        elif matrix[row][col] < target:
            col += 1
        else:
            return True
    return False

matrix = [
    [1, 4, 7, 11, 15],
    [2, 5, 8, 12, 19],
    [3, 6, 9, 16, 22],
    [10, 13, 14, 17, 24],
    [18, 21, 23, 26, 30]
]

print(search_matrix(matrix, 5)) #true
print(search_matrix(matrix, 20)) #false

def most_number(arr):
    count = {}
    for i in arr:
        if i in count:
            count[i] += 1
        else:
            count[i] = 1
            
        max = 0
        keyValue = 0
        
        for key, value in count.items():
            if max < value:
                max = value
                keyValue = key
                
            return keyValue
    
arr = [1, 3, 2, 2, 8, 3, 5, 5, 5]
print(most_number(arr)) #5