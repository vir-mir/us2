#coding: utf-8

from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login as auth_login


def login(request):
    if request.user.is_authenticated():
        return redirect(u'/')

    data = []
    errors = []

    if request.method == 'POST':
        data = request.POST.copy()

        user = authenticate(username=data['login'], password=data['password'])

        if user is not None:
            if user.is_active:
                auth_login(request, user)
                return redirect(data['ref'])
            else:
                errors.append(u'Пользователь заблокирован!')
        else:
            errors.append(u'Неверный логин или пароль!')

    return render(request, 'user/login.html', {
        'data': data,
        'errors': errors
    })

