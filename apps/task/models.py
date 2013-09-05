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
        Структура дерева задач
    """
    parent = TreeForeignKey('self', blank=True, null=True) # родитель
    name = models.CharField(max_length=255) # название задачи
    percent = models.SmallIntegerField(max_length=3) # процен выполнения
    status = models.ForeignKey(Status, blank=True, null=True) # статус задачи
    checked = models.ForeignKey(Staff, blank=True, null=True) # пользователь закрывший забачу
    staff = models.ForeignKey(Staff, related_name='emp', blank=True, null=True) # пользователь создавший задачу
    date_start = models.DateField(blank=True, null=True) # Дата начала task
    date_end = models.DateField(blank=True, null=True) # дата окончания task
    date_checked = models.DateField(blank=True, null=True) # дата закрытия task
    is_folder = models.SmallIntegerField(max_length=1, blank=True, null=True) # папка или задача
    important = models.SmallIntegerField(max_length=1, blank=True, null=True) # важность задачи
    main = models.SmallIntegerField(max_length=1, blank=True, null=True) # затача совета учередителей
    responsible = models.ManyToManyField(Duties, blank=True, null=True) # ответственный


mptt.register(Task)


