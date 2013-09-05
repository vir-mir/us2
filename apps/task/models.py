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
    parent = TreeForeignKey('self', blank=True, null=True)
    name = models.CharField(max_length=255)
    status = models.ForeignKey(Status, blank=True, null=True)
    checked = models.ForeignKey(Staff, blank=True, null=True)
    staff = models.ForeignKey(Staff, related_name='emp', blank=True, null=True)
    date_start = models.DateField(blank=True, null=True)
    date_end = models.DateField(blank=True, null=True)
    date_checked = models.DateField(blank=True, null=True)
    is_folder = models.SmallIntegerField(max_length=1, blank=True, null=True)
    important = models.SmallIntegerField(max_length=1, blank=True, null=True)
    main = models.SmallIntegerField(max_length=1, blank=True, null=True)
    responsible = models.ManyToManyField(Duties, blank=True, null=True)


mptt.register(Task)


