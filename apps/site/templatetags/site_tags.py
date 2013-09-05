#coding: utf-8

import datetime
from django import template
from apps.menu.statics import menu_obj
from apps.site import static as static_site
from apps.site_user import statics

register = template.Library()


@register.simple_tag
def get_dutu_dynamic(request, duty_id):
    if request.COOKIES.has_key('date'):
        date = statics.date_sql(request.COOKIES['date'])
    else:
        date = statics.date_sql('')
    staff = statics.user_obj.getStaffDuties(date, duty_id)
    name = u''

    if staff:
        name = u"%s %s.%s." % (staff.staff.surname if staff.staff.surname else '',
                                       staff.staff.name[0] if staff.staff.name else '',
                                       staff.staff.patronymic[0] if staff.staff.patronymic else '')
        name += u" (%s" % staff.date.strftime('%d.%m.%Y')
        if staff.date_expire:
            name += u' - %s)' % staff.date_expire.strftime('%d.%m.%Y')
        else:
            name += ')'

    return name


@register.simple_tag
def get_dutu_dynamic_nodate(request, duty_id):
    if request.COOKIES.has_key('date'):
        date = statics.date_sql(request.COOKIES['date'])
    else:
        date = statics.date_sql('')
    staff = statics.user_obj.getStaffDuties(date, duty_id)
    name = u''

    if staff:
        name = u"%s %s.%s." % (staff.staff.surname if staff.staff.surname else '',
                                       staff.staff.name[0] if staff.staff.name else '',
                                       staff.staff.patronymic[0] if staff.staff.patronymic else '')

    return name


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
        'is_duties_dynamic': True,
        'duty_list': 'duty_list_left'
    }


@register.inclusion_tag('site/menu.html', takes_context=True)
def menu_list(context, request):
    return {
        'request': request,
        'menu_list': menu_obj.getMenuChildren(1),
        'parent_id': 1
    }