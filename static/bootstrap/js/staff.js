var staff = 0;

function html_staff(obj, id, val) {


    val = trim(val, '\r\n\t ');

    val = explode(' ', val);

    if (!isset(val[0])) {
        val[0] = ''
    }
    if (!isset(val[1])) {
        val[1] = ''
    }
    if (!isset(val[2])) {
        val[2] = ''
    }

    var add = (obj.find('li').size() > 0)

    var html = '<li id="staff-'+id+'">' +
        '<input class="span4" name="surname" value="'+val[0]+'" type="text" />' +
        '<input class="span4" name="name" value="'+val[1]+'" type="text" />' +
        '<input class="span4" name="patronymic" value="'+val[2]+'" type="text" />' +
        '</li>'


    if (id==0) {
        obj.prepend(html);
    } else {
        obj.after(html)
        obj.remove()
    }

    $('input[name=surname]').focus();


    $('input[name=surname], input[name=name], input[name=patronymic]').unbind('keyup');
    $('input[name=surname], input[name=name], input[name=patronymic]').keyup(function (event) {
        if (event.keyCode == 13) {
            add_edit_staff($(this).parents('li'))
        }
    });

}

function add_edit_staff(obj) {
    var surname = trim(obj.find('input[name=surname]').val(), '\t\n\r ');
    var name = trim(obj.find('input[name=name]').val(), '\t\n\r ');
    var patronymic = trim(obj.find('input[name=patronymic]').val(), '\t\n\r ');
    var id = obj.attr('id').replace(/staff-/,'');

    obj.find('input[name=surname], input[name=name], input[name=patronymic]').attr('disabled', true);

    $.get('/admin/user/', {
        action: 'add_edit_staff',
        surname: surname,
        name: name,
        patronymic: patronymic,
        id: id
    }, function(data) {
        window.document.location.href = window.document.location.href
    });

}


function click_staff() {
    add_user_click();
    $('#staff_list li').unbind('click');
    $('#staff_list li').click(function () {
        staff = $(this).attr('id').replace(/staff-/, '');
        if ($(this).hasClass('alert-info')) {
            $(this).removeClass('alert-info');
            staff = 0;
        } else {
            $('#staff_list li').removeClass('alert-info');
            $(this).addClass('alert-info');
        }
        add_user_click();
        add_staff_user();
        return false;
    });
    $('#staff_list li').unbind('dblclick');
    $('#staff_list li').dblclick(function () {
        if (!$(this).hasClass('alert-info')) {
            $(this).click();
        }

        var text = trim($(this).text(), '\r\n\t ');
        var id = $(this).attr('id').replace(/staff-/,'');

        html_staff($(this), id, text);

        return false;
    });
}


function add_staff_user() {
    $('#add_staff_user')

    if (staff > 0 && duty > 0) {
        $('#add_staff_user').removeClass('disabled');
        $('#add_staff_user').unbind('click');
        $('#add_staff_user').click(function () {
            $.get('/admin/user/', {
                action: 'add_staff_user',
                staff: staff,
                duty: duty,
                date: $('.date_picer').val()
            }, function(data) {
                alert_messeng('Пользователь назначен на должность!')
            });

            return false;
        });
    } else {
        $('#add_staff_user').unbind('click');
        $('#add_staff_user').addClass('disabled');
        $('#add_staff_user').click(function () { return false; });
    }

}

$(function () {
    $('#add_staff').click(function () {
        html_staff($('#staff_list'), 0, '');
        return false;
    });
    click_staff();




});