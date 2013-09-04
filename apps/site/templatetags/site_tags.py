#coding: utf-8

import datetime
from django import template
from apps.site import static as static_site
from apps.site_user.statics import date_sql

register = template.Library()

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