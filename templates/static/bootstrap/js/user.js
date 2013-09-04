var user = 0;


function get_user_staffs() {

    $('#user_list').html('');
    $('#user_list').after('<p class="test-center">'+loader+'</p>');

    $.get('/admin/user/', {
        action: 'get_user_staffs',
        staff: staff
    }, function(data) {
        $('#user_list').next().remove();
        if (isset(data)) {
            $.each(data, function (k,v) {
                $('#user_list').append('<li id="'+k+'"><i class="icon-asterisk"></i> '+v+'</li>');
                users_click();
            })
        }
    }, 'json')

}

function users_click() {

    $('#user_list li').unbind('click');
    $('#user_list li').click(function () {
        user = $(this).attr('id').replace(/staff-/, '');
        if ($(this).hasClass('alert-info')) {
            $(this).removeClass('alert-info');
            user = 0;
        } else {
            $('#user_list li').removeClass('alert-info');
            $(this).addClass('alert-info');
        }
        return false;
    });

    $('#user_list li').unbind('dblclick');
    $('#user_list li').dblclick(function () {
        if (!$(this).hasClass('alert-info')) {
            $(this).click();
        }

        var text = trim($(this).text(), '\r\n\t ');
        var id = $(this).attr('id').replace(/user-/,'');

        html_user($(this), id, text);

        return false;
    });

    return false;
}

function html_user(obj, id, val) {
    val = trim(val, '\r\n\t ');

    val = explode(' ', val);

    var add = (obj.find('li').size() > 0)

    var html = '<li id="user-'+id+'">' +
        '<input class="span6" name="username" value="'+val+'" type="text" />' +
        '<input class="span6" name="password" type="password" />' +
        '</li>'


    if (id==0) {
        obj.prepend(html);
    } else {
        obj.after(html)
        obj.remove()
    }

    $('input[name=username]').focus();


    $('input[name=username], input[name=password]').unbind('keyup');
    $('input[name=username], input[name=password]').keyup(function (event) {
        if (event.keyCode == 13) {
            add_edit_user($(this).parents('li'))
        }
    });
}

function add_edit_user(obj) {
    var username = trim(obj.find('input[name=username]').val(), '\t\n\r ');
    var password = trim(obj.find('input[name=password]').val(), '\t\n\r ');
    var id = obj.attr('id').replace(/user-/,'');

    obj.find('input[name=username], input[name=password]').attr('disabled', true);

    $.get('/admin/user/', {
        action: 'add_edit_user',
        username: username,
        password: password,
        staff: staff,
        id: id
    }, function(data) {
        if (data==1)
            window.document.location.href = window.document.location.href
        else {
            alert_error(data)
            obj.find('input[name=username], input[name=password]').attr('disabled', false);
        }
    });
}

function add_user_click() {
    if (staff == 0) {
        $('#add_user').unbind('click');
        $('#add_user').click(function () { return false; });
        $('#add_user').addClass('disabled');
    } else {

        get_user_staffs();

        $('#add_user').unbind('click');
        $('#add_user').removeClass('disabled');
        $('#add_user').click(function () {
            html_user($('#user_list'), 0, '');
            return false;
        });
    }

}