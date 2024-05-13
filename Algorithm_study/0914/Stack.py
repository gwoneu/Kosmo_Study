class Stack:
    def __init__(self):
        self.stack = []
        
    def __len__(self):
        return len(self.stack)
        
    def is_empty(self):
        return len(self.stack) == 0
    
    def push(self, item):
        self.stack.append(item)
        
    def pop(self):
        if self.is_empty():
            return "Empty"
        else :
            return self.stack.pop()
            
    def peek(self):
        if self.is_empty():
            return "Empty"
        else :
            return self.stack[-1]
        
stack = Stack()
stack.push('10')
stack.push('20')
stack.push('30')
print(stack.is_empty()) #비어있는지 물어보는거 push로 값을 넣었으니 false가 나온다.

print(stack.pop())
print(stack.pop())
print(stack.pop())

print(stack.is_empty()) #pop으로 비워서 비어있기 때문에 true가 나온다.

# 문제 : 괄호 짝 맞추기
# () {} [] 짝이 맞는지
# () : true
# ()[]{} : true
# {] : false
#([)] : false

def is_valid(a):
    stack = Stack()
    open = "({["
    close = ")]}"
    
    for char in a:
        if char in open:
            stack.push(char)
        elif char in close:
            if len(stack) == 0:
                return False
            else :
                top = stack.pop()
                if(char == ')' and top != '(') or (char == ']' and top != '[') or (char == '}' and top != '{'):
                    return False
                
    return len(stack) == 0

print(is_valid('()')) # true
print(is_valid('{[}]')) # false
print(is_valid('((()))')) # true
print(is_valid('(((({]))))')) # false