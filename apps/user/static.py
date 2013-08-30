#coding: utf-8

from django.shortcuts import redirect
from apps.user.views import login


def is_authenticated(f):
    def red_log(request, *args, **kwargs):
        if not request.user.is_authenticated():
            return login(request, *args, **kwargs)
        else:
            return f(request, *args, **kwargs)

    return red_log

