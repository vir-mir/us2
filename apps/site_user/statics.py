#coding: utf-8
import datetime

from apps.site_user.maneger import ManegerUser

user_obj = ManegerUser()


def date_sql(date_str):
    date_list = date_str.split('.')
    if len(date_list) == 3:
        date = datetime.date(int(date_list[2]), int(date_list[1]), int(date_list[0]))
        return date

    date_list = date_str.split('-')
    if len(date_list) == 3:
        date = datetime.date(int(date_list[0]), int(date_list[1]), int(date_list[2]))
        return date

    return datetime.datetime.today()



