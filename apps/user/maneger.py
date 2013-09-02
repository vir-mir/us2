#coding: utf-8
import datetime

from apps.user.models import Duties

class ManegerUser():

    def getDutiesTree(self):
        return Duties.objects.all()

    def getDutiesId(self, id):
        try:
            data = Duties.objects.get(id=id)
        except BaseException:
            data = None

        return data

    def addEditDuties(self, param):

        if param.has_key('id'):
            id = int(param['id'])
        else:
            id = 0

        if id == 0:
            duties = Duties()
        else:
            duties = self.getDutiesId(id)

        if param.has_key('name'):
            duties.name = str(param['name'].encode('utf-8'))

        if id == 0:
            duties.date = datetime.datetime.today()

        if param.has_key('parent'):
            parent = self.getDutiesId(int(param['parent']))
            if parent:
                duties.parent = parent

        duties.save()

        return duties