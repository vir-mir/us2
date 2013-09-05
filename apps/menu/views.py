#coding: utf-8

from django.shortcuts import render, HttpResponse
from apps.site import static
from apps.menu import statics



@static.is_authenticated
def admin_menu(request):
    if request.method == 'GET' \
            and request.GET.has_key('action') \
            and (request.GET['action'] == 'add_edit_menu' or request.GET['action'] == 'drag-and-drop'):
        data = request.GET.copy()
        menu = statics.menu_obj.addEditMenu(data)
        if menu:
            if data.has_key('law'):
                law = statics.menu_obj.addEditLaw(data, menu.id)
            return HttpResponse(1)
        else:
            return HttpResponse(u'Такой URL уже занят!')

    return render(request, 'menu/admin_menu.html', {
        'menus': statics.menu_obj.getMenuAll()
    })

