#coding: utf-8

from django.contrib.auth.models import User
from django.db import models
from mptt.fields import TreeForeignKey
import mptt


class Duties(models.Model):
    """
        Структура дерева должностей конпаний
    """
    parent = TreeForeignKey('self', blank=True, null=True)
    name = models.CharField(max_length=255)
    date = models.DateField(blank=True, null=True)


class Staff(models.Model):
    """
        Служащий, для должности
    """
    name = models.CharField(max_length=255)
    surname = models.CharField(max_length=255)
    patronymic = models.CharField(max_length=255, blank=True, null=True)
    date_expire = models.DateField(blank=True, null=True)
    date = models.DateField(blank=True, null=True)
    user = models.ManyToManyField(User, blank=True, null=True)


class DateDuties(models.Model):
    """
        Должность служащего
    """
    date = models.DateField()
    date_expire = models.DateField(blank=True, null=True)
    staff = models.ForeignKey(Staff)


mptt.register(Duties)


