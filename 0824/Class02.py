# 성적 관리 프로그램 개발
import pickle

def menu():
    a = int(input("메뉴를 선택해주세요 : 1.입력, 2.조회, 3.삭제, 0.종료"))
    if a == 1:
        name = input("이름: ")
        math = int(input("수학: "))
        science = int(input("과학: "))
        english = int(input("영어: "))
    # elif a == 2:
        
while True:
    menu()