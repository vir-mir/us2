#coding: utf-8
import datetime
from django.contrib.auth.hashers import make_password
from django.db.models import Max, Q, Min

from apps.site_user.models import Duties, Staff, DateDuties, User


class ManegerUser():

    def getLevelDuties(self):
        try:
            data = Duties.objects.aggregate(level=Max('level'))['level']
        except BaseException:
            data = 0

        return data

    def getDutiesTree(self, id=None):
        item = self.getDutiesId(id)
        if not item:
            return Duties.objects.all()
        else:
            return Duties.objects.filter(lft__gte=item.lft, rght__lte=item.rght)

    def getDutiesId(self, id):
        try:
            data = Duties.objects.get(id=id)
        except BaseException:
            data = None

        return data

    def getStaffDuties(self, date, id_duty):
        try:
            return DateDuties.objects.get(
                Q(date_expire__gt=date) | Q(date_expire=None),
                date__lte=date,
                duty_id=id_duty)
        except BaseException:
            return None

    def getStaffDutiesNull(self, duty):
        try:
            data = DateDuties.objects.get(duty_id=duty, date_expire=None)
        except BaseException:
            data = None

        return data

    def getStaffsExpire(self):
        return Staff.objects.filter(date_expire=None)

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

    def getDateDutiesStaffDutyDate(self, staff, duty, date):
        return DateDuties.objects.filter(staff_id=staff, duty_id=duty, date=date)

    def getDateDutiesGte(self, duty_id, date):
        try:
            data = DateDuties.objects.filter(duty_id=duty_id, date__gt=date).aggregate(min_date=Min('date'))['min_date']
        except BaseException:
            data = None
        return data

    def addStaffUser(self, staff, duty, date):
        """
            Магия. Не трогать!
            Ниже я попытался описать все подробно
            Но если ты рескнешь исправить и у тебя не получится увеличь счетчик

            boss_shot = 0
        """

        # Получаем пользователя и удоляем занись с такимеже параметрами как переданны
        data = self.getDateDutiesStaffDutyDate(staff, duty, date)
        if data:
            for item in data:
                item.delete()

        # Получаем пользователя для должности на тякушиюю дату
        data = self.getStaffDuties(date, duty)
        if data:
            if data.date == date:
                # удоляем если дата назначения = переданной дате
                # это нужно чтоб небыло мусора с датами в БД, к примеру:
                # - дата назначения 01.09.2013
                # - дата снятия с должности 01.09.2013
                # - дата назначения для новой записи 01.09.2013
                data.delete()
            else:
                # если даты не равня то увольняем пользователя переданной датой пример:
                # - дата назначения 01.09.2013
                # - дата увольнения 25.09.2013
                # - увольняем переданной датой 13.09.2013 - день программиста=)
                data.date_expire = date
                data.save()

        # получаем новую дату увольнения, для новой записи
        # а нужно это для того что если у нас есть в будушем дата назначения для должности
        # то мы должны уволить работника в этот день
        # тоесть если переданная дата назначения на должность 13.09.2013,
        # а в БД для этой должности есть запись, с назначением на должность нового леловека с 23.09.2013
        # то значит дата увольнения для этой записи будет 23.09.2013
        # еслиже в БД нету записей то дата увольнения будет равнятся null
        date_expire = self.getDateDutiesGte(duty, date)

        # назначаем на должность
        date_duties = DateDuties()
        date_duties.duty_id = duty
        date_duties.staff_id = staff
        date_duties.date_expire = date_expire
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

    def getUserName(self, username):
        try:
            data = User.objects.get(username=username)
        except BaseException:
            data = None
        return data

    def addEditUser(self, param):
        if param.has_key('id'):
            id = int(param['id'])
        else:
            id = 0

        if id == 0:
            if self.getUserName(str(param['username'].encode('utf-8'))):
                return None
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