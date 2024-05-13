class Queue:
    def __init__(self):
        self.queue = []
        
    def __len__(self):
        return len(self.queue)
    
    def is_empty(self):
        return len(self.queue) == 0
    
    def enqueue(self, item):
        self.queue.append(item)
        
    def dequeue(self):
        if self.is_empty():
            return "Empty"
        else :
            return self.queue.pop(0)
        
    def peek(self):
        if self.is_empty():
            return "Empty"
        else :
            return self.queue[0]
        
queue = Queue()
queue.enqueue(10)
queue.enqueue(20)
queue.enqueue(30)

print(queue.peek())

print(queue.dequeue())
print(queue.dequeue())
print(queue.dequeue())

print(queue.is_empty())

# 숫자 뒤집기

def reverse(a):
    queue = Queue()
    
    while a > 0:
        digit = a%10
        queue.enqueue(digit)
        a //= 10
        
    number = 0
    value = 1
        
    while queue:
        digit = queue.dequeue()
        number += digit * value
        value *= 10
        
    return number

print(reverse(12345)) #54321
print(reverse(987654321)) #123456789