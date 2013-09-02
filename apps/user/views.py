#coding: utf-8

from django.shortcuts import render, redirect, HttpResponse
from django.contrib.auth import authenticate, login as auth_login
from apps.user.static import is_authenticated
import json
from apps.user import static


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


@is_authenticated
def admin_user(request):

    if request.method == 'GET' and request.GET.has_key('action') and request.GET['action'] == 'add_edit_duty':
        data = request.GET.copy()
        data = static.user_obj.addEditDuties(data)
        ret = {
            'name': 1
        }
        return HttpResponse(json.dumps(ret, sort_keys=True))

    duties = static.user_obj.getDutiesTree()

    return render(request, 'user/admin_user.html', {
        'duties': duties
    })

