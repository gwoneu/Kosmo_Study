from django.shortcuts import render
from .models import NewModel

# Create your views here.
def home(request):
    models = NewModel.objects.all()
    # context = {"message" : "MY HOME"}
    return render(request, 'home.html', {'models' : models})