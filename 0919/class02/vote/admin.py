from django.contrib import admin #관리자 사이트를 만들기 위해서
from .models import Question, Choice #Question과 Choice를 사용할거다



class ChoiceAdmin(admin.ModelAdmin):
    fieldsets = (
        ('Choice', {
            'fields': ('choice_text', 'votes'),
        }),
        ('Question', {
            'fields': ('question',),
        }), # 파이썬 튜플은 하나짜리는 무조건 , 를 붙인다.
    )

admin.site.register(Question) #관리자 사이트에 Question을 등록한다.
admin.site.register(Choice, ChoiceAdmin) #관리자 사이트에 Choice를 등록한다.
