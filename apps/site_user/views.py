#coding: utf-8
from django.contrib.auth.models import User

from django.shortcuts import render, HttpResponse
from apps.site.static import is_authenticated
from apps.site_user import statics
from dateutil.relativedelta import *
import json


@is_authenticated
def admin_user(request):

    """

    :param request:
    :return:
    """
    if request.method == 'GET' \
            and request.GET.has_key('action') \
            and ( request.GET['action'] == 'drag-and-drop'
                  or request.GET['action'] == 'get_user_staffs'):
        data = request.GET.copy()
        users = statics.user_obj.getUserStaff(int(data['staff']))
        ret = {}
        if users:
            for user in users:
                ret['user-%s' % user.id] = user.username

        return HttpResponse(json.dumps(ret, sort_keys=True))

    if request.method == 'GET' \
            and request.GET.has_key('action') \
            and ( request.GET['action'] == 'drag-and-drop'
                  or request.GET['action'] == 'add_edit_duty'):
        data = request.GET.copy()
        statics.user_obj.addEditDuties(data)

        return HttpResponse(1)

    if request.method == 'GET' \
            and request.GET.has_key('action') \
            and request.GET['action'] == 'add_edit_user':
        data = request.GET.copy()
        statics.user_obj.addEditUser(data)

        return HttpResponse(1)

    if request.method == 'GET' \
            and request.GET.has_key('action') \
            and request.GET['action'] == 'add_staff_user':
        data = request.GET.copy()
        statics.user_obj.addStaffUser(int(data['staff']), int(data['duty']), statics.date_sql(data['date']))

        return HttpResponse(1)

    if request.method == 'GET' \
            and request.GET.has_key('action') \
            and request.GET['action'] == 'add_edit_staff':
        data = request.GET.copy()
        statics.user_obj.addEditStaff(data)

        return HttpResponse(1)

    if request.method == 'GET' \
            and request.GET.has_key('action') \
            and request.GET['action'] == 'info':
        data = statics.user_obj.getDutiesId(request.GET['id'])
        date = statics.date_sql(request.GET['date']) + relativedelta(days=1)
        staffs = statics.user_obj.getStaffDuties(date, data.id)
        ret = {
            'name': data.name,
            'date': "%s.%s.%s" % (data.date.day, data.date.month, data.date.year),
            'staff': [],
        }
        if staffs:
            for staff in staffs:
                item = {
                    'name': "%s %s.%s." % (staff.staff.surname, staff.staff.name[0], staff.staff.patronymic[0]),
                    'date': staff.date.strftime('%d.%m.%Y'),
                    'date_expire': staff.date_expire.strftime('%d.%m.%Y') if staff.date_expire else staff.date_expire,
                }
                ret['staff'].append(item)

        return HttpResponse(json.dumps(ret, sort_keys=True))

    duties = statics.user_obj.getDutiesTree()
    staffs = statics.user_obj.getStaffs()

    return render(request, 'user/admin_user.html', {
        'duties': duties,
        'staffs': staffs
    })

