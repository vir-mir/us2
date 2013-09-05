#coding: utf-8
from django.shortcuts import render, redirect, HttpResponse
from django.contrib.auth import authenticate, login as auth_login
from apps.menu.statics import menu_obj
from apps.site_user.statics import user_obj, date_sql


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
                },
                {
                    'url': '/admin/menu/',
                    'name': u'Меню',
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


def is_law(request):
    path = request.path
    menu = menu_obj.getMenuUrl(path)

    if not menu:
        return False

    if menu.law and menu.law.fed:
        return globals()[menu.law.fed](request)

    #menu.law.staff.all()

    return False


def super_user(request):
    return request.user.is_superuser


def task(request):
    Staff = user_obj.getStaffUserId(request.user.id)

    if not Staff:
        return False

    if request.COOKIES.has_key('date'):
        date = date_sql(request.COOKIES['date'])
    else:
        date = date_sql('')

    duty_main = user_obj.getDutiesStaff(date, Staff.id)

    if request.COOKIES.has_key('duty'):
        duty_id = int(request.COOKIES['duty'])
    else:
        duty_id = None

    duty = user_obj.getDutiesStaff(date, Staff.id, duty_id)

    ret = True

    if not duty:
        ret = False

    if duty_main and duty_id and duty_main.duty.id != duty_id:
        ret = user_obj.isChildrenNodeId(duty_main.duty.id, duty_id)

    return ret


def is_authenticated(f):
    def red_log(request, *args, **kwargs):
        if not request.user.is_authenticated():
            return fn_login(request, *args, **kwargs)
        else:
            if is_law(request):
                return f(request, *args, **kwargs)
            else:
                return render(request, 'site/not.html', {'text': u'У вас нету прав доступа!'})

    return red_log