#coding: utf-8

from django.shortcuts import render
from apps.user.static import is_authenticated


@is_authenticated
def index(request):
    return render(request, 'site/index.html')

