#coding: utf-8

from django.shortcuts import render, HttpResponse
from apps.site.static import is_authenticated
from apps.site_user import statics
import json



@is_authenticated
def admin_user(request):

    if request.method == 'GET' and request.GET.has_key('action') and request.GET['action'] == 'add_edit_duty':
        data = request.GET.copy()
        data = statics.user_obj.addEditDuties(data)
        ret = {
            'name': 1
        }
        return HttpResponse(json.dumps(ret, sort_keys=True))

    duties = statics.user_obj.getDutiesTree()

    return render(request, 'user/admin_user.html', {
        'duties': duties
    })

