
var menu = 0;


function add_menu() {
    try {
        $('#menu_list li div i').droppable('destroy');
        $('#menu_list li div i').draggable('destroy');
    } catch (exception_var) { true }


    $('#menu_list li div i').draggable({ revert: true });
    $('#menu_list li div i').droppable({
        activeClass: "ui-state-active",
        hoverClass: "ui-state-hover",
        over: function (event, ui) {
          $('#alert').remove();
        },
        drop: function( event, ui ) {
            var parent = $(this).parents('li').attr('id').replace(/menu-/,'')
            var id_duty = ui.draggable.parents('li').attr('id').replace(/menu-/,'')
            $.get('/admin/menu/', {action: 'drag-and-drop', id: id_duty, parent:parent}, function (data) {
                    window.document.location.reload()
                    return false;
                });
        }
    });


    $('#menu_list li div').unbind('click');
    $('#menu_list li div').unbind('dblclick');
    $('#menu_list li div').dblclick(function () {
        if (!$(this).hasClass('alert-info')) {
            $(this).click();
        }
        var parent = $(this).parent().attr('parent');
        var id = $(this).parent().attr('id').replace(/menu-/,'');
        menu_html($(this), id, parent, $(this).text());
        return false;
    });

    $('#menu_list li div').click(function () {
        menu = $(this).parent().attr('id').replace(/menu-/, '');
        treeNodeMenu($(this), 'tree_menu');
        if ($(this).hasClass('alert-info')) {
            $(this).removeClass('alert-info');
            menu = 0;
        } else {
            $('#menu_list li div').removeClass('alert-info');
            $(this).addClass('alert-info');
        }
    });

    $('#add_menu').click(function () {
        menu_html($('#menu_list'), 0, (menu > 0)?menu:0, '')
        return false;
    });

}

function menu_html(obj, id, parent, val) {
    val = trim(val, '\t\n\r ');
    val = explode('~', val);
    if (!isset(val[0])) {
        val[0] = ''
    }
    if (!isset(val[1])) {
        val[1] = ''
    }
    if (!isset(val[2])) {
        val[2] = ''
    }
    var html = "<li id='menu-"+id+"' parent='"+parent+"'>" +
            "<div>" +
        "<input class='span4 duty_name' value='"+val[0]+"' type='text' name='name' />" +
        "<input class='span4 duty_name' value='"+val[1]+"' type='text' name='url' />" +
        "<input class='span4 duty_name' value='"+val[2]+"' type='text' name='law' />" +
        "</div>" +
        "</li>";

    if (menu==0) {
        obj.prepend(html)
    } else {
        if (obj.find('li').size() > 0) {
            $('#menu-'+menu).after(html)
        } else {
            obj.after(html)
        }

        if (!(obj.find('li').size() > 0)) {
            obj.remove();
        }

    }
    $("#duty-"+id+" input").focus();
    $('.duty_name').unbind('keyup');
    $('.duty_name').keyup(function (event) {
        if (event.keyCode == 13) {
            add_edit_menu($(this));
        }
        return false;
    });
}

function add_edit_menu(obj) {
    $('#add_duty').addClass('disabled');
    $('.duty_name[name=name]').attr('disabled', true);
        $('.duty_name[name=url]').attr('disabled', true);
        $('.duty_name[name=law]').attr('disabled', true);

    var id = obj.parents('li').attr('id').replace(/menu-/ig, '')
    var name = trim($('.duty_name[name=name]').val(), '\t\r\n ');
    var url = trim($('.duty_name[name=url]').val(), '\t\r\n ');
    var law = trim($('.duty_name[name=law]').val(), '\t\r\n ');
    var parent = obj.parents('li').attr('parent')
    if (!isset(name)) {
        alert_error('Меню никак не называется!');
        $('.duty_name[name=name]').attr('disabled', false);
        $('.duty_name[name=url]').attr('disabled', false);
        $('.duty_name[name=law]').attr('disabled', false);
        obj.focus()
        return false;
    }
    if (!isset(url)) {
        alert_error('Пустой URL!');
        $('.duty_name[name=name]').attr('disabled', false);
        $('.duty_name[name=url]').attr('disabled', false);
        $('.duty_name[name=law]').attr('disabled', false);
        obj.focus()
        return false;
    }
    $.get('/admin/menu/', {action: 'add_edit_menu', id: id, url:url, name:name, parent:parent, law:law}, function (data) {
        if (data==1) {
            window.document.location.reload();
        } else {
            alert_error(data)
        }
        return false;
    });

    return false;
}


$(function () {
    add_menu();
    start_tree_menu('tree_menu');
})