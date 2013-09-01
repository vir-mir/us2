#coding: utf-8


def has_blokc(groups, id, is_superuser, blokc):
    if is_superuser:
        return True


def getAllMenuItem(groups, id, is_superuser):

    return [
        {
            'url': '/admin/',
            'name': u'Админка',
            'parent': [
                {
                    'url': '/admin/user/',
                    'name': u'Пользователи',
                    'parent': None,
                }
            ]
        }
    ]