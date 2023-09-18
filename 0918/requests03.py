from urllib.request import urlopen
from html.parser import HTMLParser

class ImageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.result = []

    def handle_starttag(self, tag, attrs): #<tag>를 처리하기 위해 오버라이딩을 한 것!
        if tag != 'img':
            return
        if not hasattr(self, 'result'):
            self.result = []
        for name, value in attrs:
            if name == 'src':
                self.result.append(value)

def parseImage(data):
    parser = ImageParser()
    parser.feed(data)
    dataSet = set(x for x in parser.result) # result를 하나씩 하나씩 넣는다. set은 중복된걸 없애기 위함
    return dataSet

def main():
    url = "http://www.google.co.kr"

    f = urlopen(url)
    charset = f.info().get_param('charset')
    data = f.read().decode(charset)
    f.close()

    dataSet = parseImage(data)
    print("\n>>>>>> Fetch Images from", url)
    print(dataSet)
    print('\n'.join(sorted(dataSet)))

if __name__ == '__main__':
    main()