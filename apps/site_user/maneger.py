#coding: utf-8
import datetime
from django.contrib.auth.hashers import make_password

from apps.site_user.models import Duties, Staff, DateDuties, User


class ManegerUser():

    def getDutiesTree(self):
        return Duties.objects.all()

    def getDutiesId(self, id):
        try:
            data = Duties.objects.get(id=id)
        except BaseException:
            data = None

        return data

    def getStaffDuties(self, date, id_duty):
        return DateDuties.objects.order_by('date_expire').filter(date__lte=date, duty_id=id_duty)

    def getStaffDutiesNull(self, duty):
        try:
            data = DateDuties.objects.get(duty_id=duty, date_expire=None)
        except BaseException:
            data = None

        return data

    def getStaffs(self):
        return Staff.objects.all()

    def getUserId(self, id):
        try:
            data = User.objects.get(id=id)
        except BaseException:
            data = None

        return data

    def getStaffId(self, id):
        try:
            data = Staff.objects.get(id=id)
        except BaseException:
            data = None

        return data

    def addStaffUser(self, staff, duty, date):
        data = self.getStaffDutiesNull(duty)

        if data:
            if data.date == date or date <= data.date :
                data.delete()
            else:
                data.date_expire = date
                data.save()

        date_duties = DateDuties()

        date_duties.duty_id = duty
        date_duties.staff_id = staff
        date_duties.date_expire = None
        date_duties.date = date

        date_duties.save()

        return date_duties


    def addEditStaff(self, param):
        if param.has_key('id'):
            id = int(param['id'])
        else:
            id = 0

        if id == 0:
            staff = Staff()
        else:
            staff = self.getStaffId(id)

        if param.has_key('name'):
            staff.name = str(param['name'].encode('utf-8'))
        if param.has_key('surname'):
            staff.surname = str(param['surname'].encode('utf-8'))
        if param.has_key('patronymic'):
            staff.patronymic = str(param['patronymic'].encode('utf-8'))
        if id == 0:
            staff.date = datetime.datetime.today()
        if param.has_key('date_expire'):
            staff.date_expire = param['date_expire']

        staff.save()

        return staff

    def getUserStaff(self, id):
        data = self.getStaffId(id)
        if data:
            users = data.user.all()
            return users
        return None

    def addEditUser(self, param):
        if param.has_key('id'):
            id = int(param['id'])
        else:
            id = 0

        if id == 0:
            user = User()
        else:
            user = self.getUserId(id)

        if param.has_key('username'):
            user.username = str(param['username'].encode('utf-8'))
        if param.has_key('password'):
            user.password = make_password(str(param['password'].encode('utf-8')))

        user.save()



        if param.has_key('staff'):
            staff = int(param['staff'])
            staff = self.getStaffId(staff)
            staff.user.remove(user)
            staff.user.add(user)

        return user

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