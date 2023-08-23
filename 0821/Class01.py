example = [[1,2,3],[4,[5,6]],7,[8,9]]

    
lst = [[1,2,3],[4,5,6]]
empty_lst = []
for i in range(len(example)):
    if type(example[i]) == list:
        for j in range(len(example[i])):
            if type(example[i][j]) == list:
                for k in range(len(example[i][j])):
                    empty_lst.append(example[i][j][k])
            else:
                empty_lst.append(example[i][j])
    else:
        empty_lst.append(example[i])
        
print(empty_lst)

example = [[1,2,3],[4,[5,6]],7,[8,9]]

def flatten(data):
    flat_lst = []
    for i in data:
        if type(i) == list:
            flat_lst += flatten(i)
        else:
            flat_lst += [i]
            
    return flat_lst

print(flatten(example))

#풀이
def flatten(data):
    flat_lst = []
    for i in data:
        if type(i) == list:
            flat_lst += flatten(i)
        else:
            flat_lst.append(i)
    return flat_lst