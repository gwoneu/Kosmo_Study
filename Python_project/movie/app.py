from flask import Flask, render_template, request
import pickle
from tmdbv3api import Movie,TMDb

app = Flask(__name__)

movie = Movie()
tmdb = TMDb()
tmdb.api_key = 'c668cda4cf75bf267ef2aeffa2da0341'
tmdb.language = 'ko-KR'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/page1')
def page1():
    return render_template('page1.html')

@app.route('/page2')
def page2():
    return render_template('page2.html')

#전체 영화 중 상위10% 영화 정보 가져오기
@app.route('/movie1.json')
def movie1():
    movies = pickle.load(open('./data/movies1.pickle', 'rb'))
    json = []
    for i in range(10):
        etitle = movies['title'].iloc[i]
        id = movies['id'].iloc[i]
        
        details = movie.details(id)
        image = details['poster_path']
        title = details['title']
        if image:
            image='http://image.tmdb.org/t/p/w500' + image
        else:
            image = 'http://via.placeholder.com/100x120'
        
        score = round(movies['score'].iloc[i],2) 
        data = {'title' : title, 'id':str(id), 'score':str(score), 'image':image, 'etitle':etitle}
        json.append(data)
    return json

#전체영화 제목 가져오기
@app.route('/movies.json')
def movies():
    movies = pickle.load(open('./data/movies.pickle', 'rb'))
    json = movies.to_json(orient = 'records')
    return json

if __name__ == '__main__':
    app.run(port=5000, debug=True)