#coding: utf-8
import datetime
from django.db.models import Max, Q, Min
from apps.site_user.statics import date_sql

from apps.task.models import Task, Status


class ManagersTask():

    def getTaskId(self, id):
        try:
            return Task.objects.get(id=id)
        except BaseException:
            return None

    def getTasksDuty(self, duty_id):
        return Task.objects.filter(responsible__id=duty_id)

    def getAllStatus(self):
        return Status.objects.all()

    def addEditTask(self, param):

        if param.has_key('id'):
            id = int(param['id'])
        else:
            id = 0

        if id == 0:
            task = Task()
        else:
            task = self.getTaskId(id)

        if param.has_key('name'):
            task.name = str(param['name'].encode('utf-8'))

        if param.has_key('is_folder'):
            task.is_folder = int(param['is_folder'])

        if param.has_key('main'):
            task.main = int(param['main'])

        if param.has_key('percent'):
            task.percent = int(param['percent'])

        if param.has_key('important'):
            task.important = int(param['important'])

        if param.has_key('checked_id'):
            task.checked_id = int(param['checked_id'])

        if param.has_key('staff_id'):
            task.staff_id = int(param['staff_id'])

        if param.has_key('status_id'):
            task.status_id = int(param['status_id'])

        if param.has_key('date_start'):
            task.date_start = date_sql(str(param['date_start']))

        if param.has_key('date_end'):
            task.date_end = date_sql(str(param['date_end']))

        if param.has_key('date_checked'):
            task.date_checked = date_sql(str(param['date_checked']))

        if param.has_key('parent'):
            parent = self.getTaskId(int(param['parent']))
            if parent:
                task.parent = parent


        task.save()


        if param.has_key('responsible'):
            task.responsible.add(param['responsible'])

        return task