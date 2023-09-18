from urllib.request import urlopen
from urllib.parse import urlencode

url = "http://127.0.0.1:8888/cgi-bin/script.py"

data = {
    "name" : "KIM",
    "email" : "Kim@gamil.com",
    "url" : "http://www.naver.com",
}

encData = urlencode(data)
postData = encData.encode('ascii')

f = urlencode(url, postData)
print(f.read().decode('cp949'))