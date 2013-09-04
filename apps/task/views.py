#coding: utf-8

from django.shortcuts import render, HttpResponse
from apps.site.static import is_authenticated
from apps.task import statics
import json


@is_authenticated
def task(request):

    return render(request, 'task/task.html', {

    })

