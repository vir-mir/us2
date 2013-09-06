#coding: utf-8
from django.contrib.sites.models import Site

from django.shortcuts import render, HttpResponse
from apps.site.static import is_authenticated, date_sql
from apps.site_user.statics import user_obj
from apps.task import statics
import json


@is_authenticated
def add_edit_task(request, ret={}):

    param = request.GET.copy()

    if request.COOKIES.has_key('duty'):
        duty_id = int(request.COOKIES['duty'])
    else:
        duty_id = None

    if request.COOKIES.has_key('date'):
        date = date_sql(request.COOKIES['date'])
    else:
        date = date_sql('')

    duty = user_obj.getStaffDuties(date, duty_id)

    if int(param['id']) == 0:
        param['date_start'] = date.strftime('%d.%m.%Y')
        param['date_end'] = date.strftime('%d.%m.%Y')
        param['responsible'] = duty.duty
        param['staff_id'] = user_obj.getStaffUserId(request.user.id).id
        param['status_id'] = 1
        param['percent'] = 0
    elif param.has_key('status_id'):
        ret = is_valid_task_edit(request, {
            'task_id': int(param['id']),
            'valid': 'status_not',
            'status_id': param['status_id'],
        })

    if ret.has_key('error') and ret['error'] != u'':
        return HttpResponse(json.dumps(ret))

    task = statics.task_obj.addEditTask(param)
    if task:
        ret['name'] = task.name
        return HttpResponse(json.dumps(ret))

    return HttpResponse(json.dumps({
        'error': u'Нету такой задачи!'
    }))


@is_authenticated
def is_valid_task_edit(request, data=None):

    param = request.GET.copy() if not data else data.copy()

    task = statics.task_obj.getTaskId(int(param['task_id']))

    if task:
        ret = {
            'error': u'',
        }

        if param['valid'] == 'status_edit':
            ret['error'] = u'' if task.status_id == 1 else u'Задача утверждена, теперь ее нельзя редактировать!'
        elif param['valid'] == 'status_not':
            ret['error'] = u'Задача утверждена, нельзя сменить статус на "Новая задача"!' \
                if task.status_id > 1 and int(param['status_id']) == 1 else u''
        if data:
            return ret
        else:
            return HttpResponse(json.dumps(ret))

    return HttpResponse(json.dumps({
        'error': u'Нету такой задачи!'
    }))


@is_authenticated
def get_status_all(request):
    statuses = statics.task_obj.getAllStatus()
    data = []

    if statuses:
        ret = []
        for status in statuses:
            ret.append({
                'name': status.name,
                'class_alt': status.class_alt,
                'class_icon': status.class_icon,
                'id': status.id,
            })

        data = {
            'statuses': ret
        }

    return HttpResponse(json.dumps(data))


@is_authenticated
def task(request):

    if request.GET.has_key('action') and request.GET['action'] == 'add_edit_task':
        return add_edit_task(request)

    if request.GET.has_key('action') and request.GET['action'] == 'get_status_all':
        return get_status_all(request)

    if request.GET.has_key('action') and request.GET['action'] == 'is_valid_task_edit':
        return is_valid_task_edit(request)

    if request.GET.has_key('action') and request.GET['action'] == 'add_edit_date':
        date_start = date_sql(request.GET['date_start'])
        date_end = date_sql(request.GET['date_end'])
        error = {}
        if date_start > date_end:
            error = {
                'error': u'Неверное заданны даты!'
            }
        return add_edit_task(request, error)

    if request.COOKIES.has_key('duty'):
        duty_id = int(request.COOKIES['duty'])
    else:
        duty_id = None

    if request.COOKIES.has_key('date'):
        date = date_sql(request.COOKIES['date'])
    else:
        date = date_sql('')

    duty = user_obj.getStaffDuties(date, duty_id)

    if not duty:
        return render(request, 'site/not.html', {'text': u'Это должность пустая, вы не можете на нее проставить задачи!'})

    tasks = statics.task_obj.getTasksDuty(duty.duty_id)

    param = {
        'duty': duty,
        'staff': user_obj.getStaffUserId(request.user.id),
        'curent_site': Site.objects.get_current(),
        'tasks': tasks,
        'date': date,
    }


    return render(request, 'task/task.html', param)

