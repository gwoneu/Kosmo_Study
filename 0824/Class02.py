# 1.성적 관리 프로그램 개발
import pickle

def save_data(data, filename):
    with open(filename, 'wb') as f:
        pickle.dump(data, f)

def write_user(name, math, science, english):
    dic = {"이름" : name, "수학" : math, "과학" : science, "영어" : english}
    lst = []
    with open('data.p', 'rb') as f:
        lst.append(pickle.load())

    lst.append(dic)
    with open('data.p','wb') as f:
        pickle.dump(lst,f)
        
def load_user(delete):
    with open('data.p','rb') as f:
        lst = pickle.load()
        
    if delete < 0 or delete >= len(Data):
        print("잘못된 입력입니다. 삭제할 수 없습니다.")
        return
    lst.pop(delete)
    
    with open('data.p','wb') as f:
        pickle.dump(lst,f)
        
    print("삭제가 완료되었습니다.")
        
def menu():
    user_info_list = []
    
    while True:
        
        a = int(input("메뉴를 선택해주세요 : 1.입력, 2.조회, 3.삭제, 0.종료"))
        if a == 1:
            name = input("이름: ")
            math = int(input("수학: "))
            science = int(input("과학: "))
            english = int(input("영어: "))
            user_data = user_info(name, math, science, english)
            user_info_list.append(user_data)
            save_data(user_info_list, 'user_data.pkl')
            print(user_data)
menu()