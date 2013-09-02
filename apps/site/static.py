#coding: utf-8
from django.shortcuts import render, redirect, HttpResponse
from django.contrib.auth import authenticate, login as auth_login


def has_blokc(groups, id, is_superuser, blokc):
    if is_superuser:
        return True


def getAllMenuItem(groups, id, is_superuser):

    return [
        {
            'url': '/admin/',
            'name': u'Админка',
            'parent': [
                {
                    'url': '/admin/user/',
                    'name': u'Пользователи',
                    'parent': None,
                }
            ]
        }
    ]


def fn_login(request):
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


def is_authenticated(f):
    def red_log(request, *args, **kwargs):
        if not request.user.is_authenticated():
            return fn_login(request, *args, **kwargs)
        else:
            return f(request, *args, **kwargs)

    return red_log