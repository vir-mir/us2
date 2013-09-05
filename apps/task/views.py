#coding: utf-8
from django.contrib.sites.models import Site

from django.shortcuts import render, HttpResponse
from apps.site.static import is_authenticated, date_sql
from apps.site_user.statics import user_obj
from apps.task import statics
import json


@is_authenticated
def add_edit_task(request):

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

    task = statics.task_obj.addEditTask(param)

    if task:
        return HttpResponse(task.name)

    return HttpResponse(0)


@is_authenticated
def task(request):

    if request.GET.has_key('action') and request.GET['action'] == 'add_edit_task':
        return add_edit_task(request)

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

