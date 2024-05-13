from django.db import models

# Create your models here.
class NewModel(models.Model):
    name = models.CharField(max_length=10)
    skill = models.TextField()