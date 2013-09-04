#coding: utf-8

from django.db import models
from apps.site_user.models import Duties, Staff
from mptt.fields import TreeForeignKey
import mptt


class Status(models.Model):
    """
        Статусы задач
    """
    name = models.CharField(max_length=255)
    img = models.CharField(max_length=255)


class Task(models.Model):
    """
        Структура дерева должностей конпаний
    """
    parent = TreeForeignKey('self', blank=True, null=True)
    name = models.CharField(max_length=255)
    status = models.ForeignKey(Status)
    checked = models.ForeignKey(Staff)
    date_start = models.DateField()
    date_end = models.DateField()
    date_checked = models.DateField()
    is_folder = models.SmallIntegerField(max_length=1)
    important = models.SmallIntegerField(max_length=1)
    main = models.SmallIntegerField(max_length=1)
    responsible = models.ManyToManyField(Duties)


mptt.register(Task)


