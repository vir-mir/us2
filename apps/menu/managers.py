#coding: utf-8
import datetime
from django.db.models import Max, Q, Min

from apps.menu.models import Item, Law


class ManagersMenu():

    def getMenuId(self, id):
        try:
            return Item.objects.get(id=id)
        except BaseException:
            return None

    def getLawId(self, id):
        try:
            return Law.objects.get(id=id)
        except BaseException:
            return None

    def getLawFed(self, fed):
        try:
            return Law.objects.get(fed=fed)
        except BaseException:
            return None

    def getMenuUrl(self, url):
        try:
            return Item.objects.get(url=url)
        except BaseException:
            return None

    def getMenuAll(self):
        return Item.objects.all()

    def getMenuChildren(self, id):
        item = self.getMenuId(id)
        if not item:
            return []
        else:
            return Item.objects.filter(lft__gt=item.lft, rght__lt=item.rght)

    def addEditLaw(self, param, menu_id):
        if not param.has_key('law'):
            return None

        law = self.getLawFed(str(param['law'].encode('utf-8')))

        if not law:
            law = Law()
            law.fed = str(param['law'].encode('utf-8'))
            law.save()

        menu = self.getMenuId(menu_id)

        menu.law_id = law.id

        menu.save()

        return law


    def addEditMenu(self, param):
        if param.has_key('id'):
            id = int(param['id'])
        else:
            id = 0

        if id == 0:
            if self.getMenuUrl(str(param['url'].encode('utf-8'))):
                return None
            item = Item()
        else:
            item = self.getMenuId(id)

        if param.has_key('name'):
            item.name = str(param['name'].encode('utf-8'))
        if param.has_key('url'):
            item.url = str(param['url'].encode('utf-8'))

        if param.has_key('parent'):
            parent = self.getMenuId(int(param['parent']))
            if parent:
                item.parent = parent

        item.save()


        return item