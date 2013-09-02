#coding: utf-8

from django.db import models
from mptt.fields import TreeForeignKey
import mptt


class Item(models.Model):
    parent = TreeForeignKey('self', blank=True, null=True)
    name = models.CharField(max_length=255)
    url = models.CharField(max_length=255)


mptt.register(Item)


