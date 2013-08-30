#coding: utf-8

from django.shortcuts import render


def login(request):
    return render(request, 'user/login.html')

