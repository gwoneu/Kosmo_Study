from django.contrib import admin #관리자 사이트를 만들기 위해서
from .models import Question, Choice #Question과 Choice를 사용할거다

admin.site.register(Question) #관리자 사이트에 Question을 등록한다.
admin.site.register(Choice) #관리자 사이트에 Choice를 등록한다.