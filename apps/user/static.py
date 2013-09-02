#coding: utf-8


from apps.user.views import *
from apps.user.maneger import ManegerUser

user_obj = ManegerUser()


def is_authenticated(f):
    def red_log(request, *args, **kwargs):
        if not request.user.is_authenticated():
            return fn_login(request, *args, **kwargs)
        else:
            return f(request, *args, **kwargs)

    return red_log

