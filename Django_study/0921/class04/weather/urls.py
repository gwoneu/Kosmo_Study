from django.urls import path
from .views import IndexView, DetailView

app_name = 'weather'

urlpatterns = [
    path('', IndexView.as_view()),
    path('detail/<int:city_id>/', DetailView.as_view(), name='detail'),
]