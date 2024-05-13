class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
        
class SinglyLinkedList:
    def __init__(self):
        self.head = None
        
    def is_empty(self):
        return self.head is None
    
    def append(self, data):
        newNode = Node(data)
        
        if self.is_empty():
            self.head = newNode
        else :
            temp = self.head
            while temp.next:
                temp = temp.next
            temp.next = newNode
            
    def prepend(self, data):
        newNode = Node(data)
        if not self.is_empty():
            newNode.next = self.head
        self.head = newNode
            
    def delete(self, data):
        prevNode, currentNode = None, self.head
        
        if not self.is_empty():
            if self.head.data == data:
                self.head = self.head.next
            else:
                while currentNode != None and currentNode.data != data:
                    prevNode = currentNode
                    currentNode = currentNode.next
                    
                if currentNode != None:
                    prevNode.next = currentNode.next
                    
def print_linked_list(linked_list):
    currentNode = linked_list.head
    while currentNode is not None:
        print(currentNode.data, end=' ')
        currentNode = currentNode.next
        
    print()
    
def reverse(linked_list):
    prev_node = None
    curr_node = linked_list.head
    
    while curr_node is not None:
        temp = curr_node.next
        curr_node.next = prev_node
        
        prev_node = curr_node
        curr_node = temp
        
    linked_list.head = prev_node
        
linked_list = SinglyLinkedList()

linked_list.append(1)
linked_list.append(2)
linked_list.append(3)

print_linked_list(linked_list)

linked_list.delete(2)

print_linked_list(linked_list)

reverse(linked_list)
print_linked_list(linked_list)

# 단일 연결 리스트를 역순으로 뒤집는 함수 만들기