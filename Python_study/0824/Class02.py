# 1.성적 관리 프로그램 개발
import pickle

def write_user(name, math, science, english):
    dic = {"이름" : name, "수학" : math, "과학" : science, "영어" : english}
    lst = []

    try:
        with open('data.p', 'rb') as f:
            while True:
                try:
                    lst.append(pickle.load(f))
                except:
                    break
                
        with open('data.p','wb') as f:
            i = 0
            while True:
                try:
                    pickle.dump(lst[i],f)
                except:
                    break
                i += 1
            pickle.dump(dic, f)
    except FileNotFoundError:
        with open('data.p', 'wb') as f:
            pickle.dump(dic, f)
            
def load_user():
    with open('data.p','rb') as f:
        i = 0
        while True:
            try:
                data = pickle.load(f)
            except:
                break
            print(f'[{i}] 이름 : {data["이름"]}, 수학 : {data["수학"]}, 과학 : {data["과학"]}, 영어 : {data["영어"]}')
            i += 1
        
def delete_user(delete):
    with open('data.p','rb') as f:
        data = []
        while True:
            try:
                d = pickle.load(f)
                data.append(d)
            except EOFError:
                break
            
    if delete < 0 or delete >= len(lst):
        print("잘못된 입력입니다. 삭제할 수 없습니다.")
        return
    
    with open('data.p', 'wb') as f:
        for i, d in enumerate(data) :
            if i == delete:
                print("삭제가 완료되었습니다.")
            else:
                pickle.dump(d, f)
    
def menu():
    a = int(input("메뉴를 선택해주세요 1.입력, 2.조회, 3.삭제, 0.종료"))
    
    if a == 1:
        name = input("이름 :")
        math = input("수학 :")
        science = input("과학 :")
        english = input("영어 :")
        write_user(name, math, science, english)
        
    elif a == 2:
        load_user()
        
    elif a == 3:
        load_user()
        delete = int(input("삭제할 번호를 입력해주세요 :"))
        delete_user(delete)
        
    elif a == 0:
        print("종료되었습니다.")
        return -1
    return 0

try:
    with open('data.p', 'rb') as f:
        pickle.load(f)
except:
    with open('data.p', 'wb') as f:
        pickle.dump("", f)

while True:
    if menu() == -1:
        break