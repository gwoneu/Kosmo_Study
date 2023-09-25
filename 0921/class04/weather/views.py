from django.shortcuts import render, get_object_or_404
from django.views import View
import requests
from .models import City
from .forms import CityForm

# Create your views here.
class BaseView(View):
    url = 'http://api.openweathermap.org/data/2.5/weather?q={}&units=imperial&appid=04d7188b31e7040bba5bfe09331391d2'

class IndexView(BaseView):
    def get(self, request): # get() : 단순 조회 
        cities = City.objects.all()
        form = CityForm()
        weather_data = []
        
        for city in cities:
            city_weather = requests.get(url.format(city)).json()

            weather = {
                'id' : city.id,
                'city' : city,
                'temperature' : round((city_weather['main']['temp']-32)*5/9, 1),
                'description' : city_weather['weather'][0]['description'],
                'icon' : city_weather['weather'][0]['icon'],
            }
            print(weather)
            weather_data.append(weather)

        context = {'weather_data' : weather_data, 'form' : form}

        return render(request, 'weather/index.html', context)
        
    def post(self, request): # post() :  추가
        form = CityForm(request.POST)
        if form.is_valid():
            form.save()
        
        return self.get(request)
        
class DetailView(View):
    def get(self, request):
        
        city = get_object_or_404(City, pk=city_id)
        city_weather = requests.get(url.format(city)).json()

        weather = {
            'id' : city.id,
            'city' : city,
            'temperature' : round((city_weather['main']['temp']-32)*5/9, 1),
            'description' : city_weather['weather'][0]['description'],
            'lon' : city_weather['coord']['lon'],
            'lat' : city_weather['coord']['lat'],
        }

        return render(request, 'weather/detail.html', {'weather':weather})