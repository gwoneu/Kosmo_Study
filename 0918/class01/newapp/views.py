from django.shortcuts import render
from .models import NewModel

# Create your views here.
def home(request):
    models = NewModel.objects.all()
    context = {"message" : "MY HOME", 'models' : models}
    return render(request, 'home.html', context)