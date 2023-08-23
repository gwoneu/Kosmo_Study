#Hello world -> Hell wrld
s = "Hello world"

print(s.replace("o",""))

lst = list(s)
print(lst)

for i in lst:
    if(i == 'o'):
        continue
    print(i, end = "") #줄바꿈을 해준다. (=) end = "\n"

print()
print(lst[:4] + lst[5:7] + lst[8:])

s = ("")

for i in lst[:4] + lst[5:7] + lst[8:]:
    s += i
print(s)

s = ("")
for i in lst:
    if(i == 'o'):
        continue
    s += i
print(s)

print(lst[0:4] + lst[5:7] + lst[8:len(lst)-1])

lst2 = []
start = 0
for i in range(len(lst)):
    if lst[i] == 'o' or i == len(lst)-1:
        lst2 += lst[start:i] #0,4 / 5,7 / 8,len-1
        start = i+1

print(lst2)

lst = list('hellooooo woorld')

i = 0
while(True):
    if(i == len(lst)):
        break

    if lst[i] == 'o':
        del lst[i]
    else :
        i += 1
        
lst = list('oooooooooooooooooooo')