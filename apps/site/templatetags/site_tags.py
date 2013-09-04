#coding: utf-8

import datetime
from django import template
from apps.site import static as static_site
from apps.site_user import statics

register = template.Library()


@register.inclusion_tag('site/left.html', takes_context=True)
def left_site_bar(context, request):

    if request.COOKIES.has_key('date'):
        date = statics.date_sql(request.COOKIES['date'])
    else:
        date = statics.date_sql('')

    return {
        'request': request,
        'duties': statics.user_obj.getDutiesTree(),
        'level_duties': statics.user_obj.getLevelDuties(),
        'duty_list': 'duty_list_left'
    }


@register.inclusion_tag('site/menu.html', takes_context=True)
def menu_list(context, request):
    if static_site.has_blokc(
        request.user.groups.all(),
        request.user.id,
        request.user.is_superuser,
        'menu'
    ):
        return {
            'request': request,
            'menu_list': static_site.getAllMenuItem(
                request.user.groups.all(),
                request.user.id,
                request.user.is_superuser
            ),
        }

    return {
        'request': request,
        'menu_list': []
    }