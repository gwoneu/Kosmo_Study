import random
    
def play():
    
    total_game, win_count_game = read_game().split(',')
    win_count = 0
    print(f"TOTAL : {total_game}, WIN : {win_count_game}")
    
    p = input("가위(1), 바위(2), 보(3)! 👉 ")
    com = random.randrange(1,4)

    if com == 1:
        print("컴퓨터가 가위를 냈습니다.")
    elif com == 2:
        print("컴퓨터가 바위를 냈습니다.")
    else:
        print("컴퓨터가 보를 냈습니다.")
    
    p = int(p)
    
    if p == com:
        print("무승부")
        
    if p == 1:
        if com == 2:
            print("패배")
        else:
            print("승리")
            win_count += 1
        
    if p == 2:
        if com == 1:
            print("승리")
            win_count += 1
        else:
            print("패배")
        
    if p == 3:
        if com == 1:
            print("승리")
            win_count += 1
        else:
            print("패배")
            
    write_game(int(total_game)+1, int(win_count_game))
    
def write_game(total, win_count):
    with open("game.txt", 'w') as f:
        f.write(str(total) + "," + str(win_count))

    
def read_game():
    try:
        with open("game.txt",'r') as f:
            contents = f.read()
    except:
        with open("game.txt", 'w') as f:
            f.write(0,0)
            contents = "0,0"
    return contents

while True:
    play()
