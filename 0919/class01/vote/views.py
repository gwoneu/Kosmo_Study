from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect
from django.urls import reverse
from .models import Choice, Question

# Create your views here.
def index(request):
    latest_question_list = Question.objects.all().order_by('-pub_date')[:5]
    context = {'latest_question_list' : latest_question_list} # 딕셔너리화
    return render(request, '/vote/index.html', context)

def vote(request, question_id) :
    question = get_object_or_404(Question, pk=question_id)
    try :
        selected_choice = question.choice_set.get(pk=request.POST['choice'])
    except (KeyError, Choice.DoesNotExist):
        return render(request, '/vote/detail.html', {
            'question' : question,
            'error_message' : "잘못된 선택입니다.",
        })
    else:
        selected_choice.votes += 1
        selected_choice.save()
        return HttpResponseRedirect(reverse('vote:results', args=(question_id)))
    # POST 데이터 처리 후 항상 HTTPResponseRedirect로 사용자가 뒤로가기 버튼을 눌렀을 때, 중복 전달되는 것을 방지한다.

def detail(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    return render(request, '/vote/detail.html', {'question' : question})

def results(request, question_id):
    question = get_object_or_404(Question, question_id)
    return render(request, '/vote/results.html', {'question' : question})