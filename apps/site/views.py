#coding: utf-8

from django.shortcuts import render
from apps.site import static


@static.is_authenticated
def index(request):
    return render(request, 'site/index.html')

