#coding: utf-8

from django.db import models
from mptt.fields import TreeForeignKey
import mptt
from apps.site_user.models import Staff


class Law(models.Model):
    staff = models.ManyToManyField(Staff, blank=True, null=True)
    fed = models.CharField(max_length=255, blank=True, null=True)


class Item(models.Model):
    parent = TreeForeignKey('self', blank=True, null=True)
    name = models.CharField(max_length=255)
    url = models.CharField(max_length=255)
    law = models.ForeignKey(Law, blank=True, null=True)

mptt.register(Item)


