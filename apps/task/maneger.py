#coding: utf-8
import datetime
from django.db.models import Max, Q, Min

from apps.task.models import Task, Status


class ManagersTask():

    def getTaskId(self, id):
        try:
            return Task.objects.get(id=id)
        except BaseException:
            return None