# 다이어리 프로그램 - 날짜를 입력하고, 일기 작성, 날짜를 입력해서 작성한 일기를 출력

def menu():
    print("1. Write a diary")
    print("2. Read a diary")
    choice = int(input("어느 것을 하시겠습니까?"))
    
    if choice == 1:
        write_diary()
    elif choice == 2:
        read_diary()
        
        
def write_diary():
    date = input("날짜를 입력하세요 (dd-mm-yyyy)")
    text = input("오늘 하루는 어땠나요 ? ")
    
    with open(f"{date}.txt", "w") as f:
        f.write(text)
        
    print("저장이 완료되었습니다.")
    
    
def read_diary():
    view = input("보고 싶은 다이어리의 날짜를 입력해주세요 (dd-mm-yyyy)")
    
    try:
        with open(f"{view}.txt", "r") as f:
            res = f.read()
            
        print(res)
        
    except FileNotFoundError:
        print("해당 날짜의 다이어리를 찾을 수 없습니다.")
    
while True:
    menu()