
var task = 0;


// var list_heder = $('.list_heder');
// var list_heder_hr = $('.list_heder').next();


function add_task() {
    try {
        $('#task_list li div i').droppable('destroy');
        $('#task_list li div i').draggable('destroy');
    } catch (exception_var) { true }


    $('#task_list li div i').draggable({ revert: true });
    $('#task_list li div i').droppable({
        activeClass: "ui-state-active",
        hoverClass: "ui-state-hover",
        over: function (event, ui) {
          $('#alert').remove();
        },
        drop: function( event, ui ) {
            var parent = $(this).parents('li').attr('id').replace(/task-/,'')
            var id_duty = ui.draggable.parents('li').attr('id').replace(/task-/,'')
            $.get('/admin/menu/', {action: 'drag-and-drop', id: id_duty, parent:parent}, function (data) {
                    window.document.location.reload()
                    return false;
                });
        }
    });


    $('#task_list li>div.row-fluid').unbind('click');
    $('#task_list li>div.row-fluid>.span6').unbind('dblclick');
    $('#task_list li>div.row-fluid>.span6').dblclick(function () {
        if (!$(this).hasClass('alert-info')) {
            $(this).click();
        }
        var parent = $(this).parents('li').attr('parent');
        var is_folder = $(this).parents('li').attr('is_folder');
        var id = $(this).parents('li').attr('id').replace(/task-/,'');
        task_html_edit_name($(this), id, parent, is_folder);
        return false;
    });

    $('#task_list li>div.row-fluid').click(function () {
        task = $(this).parents('li').attr('id').replace(/task-/, '');
        //treeNodeMenu($(this), 'tree_menu');
        if ($(this).hasClass('alert-info')) {
            $(this).removeClass('alert-info');
            task = 0;
        } else {
            $('#task_list li div.row-fluid').removeClass('alert-info');
            $(this).addClass('alert-info');
        }
    });

    $('#add_task').click(function () {
        $(this).fadeOut(300)
        task_html($('#task_list'), 0, (task > 0)?task:0, '', 0)
        return false;
    });
}



function task_html_edit_name(obj, id, parent, is_folder) {
    var textObj = obj.find('.span11>div:eq(0)');
    var smallObj = obj.find('.span11>.small');
    smallObj.hide();
    var val = trim(textObj.html(), '\r\n\t ');
    textObj.html('<input name="name" id="intput" value="'+val+'" type="text" class="span12" />');
    $('#intput').focus();

    $('#intput').unbind('keyup');
    $('#intput').unbind('blur');
    $('#intput').keyup(function (event) {
        if (event.keyCode == 13) {
            var param = {
                'action': 'add_edit_task',
                'name': $(this).val(),
                'id': id,
                'is_folder': is_folder,
                'parent': parent
            }
            add_edit_task2(param, textObj, smallObj);
        }
    });
    $('#intput').blur(function (event) {
            var param = {
                'action': 'add_edit_task',
                'name': $(this).val(),
                'id': id,
                'is_folder': is_folder,
                'parent': parent
            }
            add_edit_task2(param, textObj, smallObj, $(this));
    });

    return false;
}



function task_html(obj, id, parent, val, is_folder) {
    val = trim(val, '\t\n\r ');
    var html = "<li is_folder='"+is_folder+"' id='task-"+id+"' parent='"+parent+"'>" +
            "<div>" +
        "<input class='span6 duty_name' value='"+val+"' type='text' name='name' />" +
        "</div>" +
        "</li>";

    if (task==0) {
        obj.prepend(html)
    } else {
        if (obj.find('li').size() > 0) {
            $('#task-'+task).after(html)
            $('#task-'+task).hide()
        } else {
            obj.after(html)
        }

    }
    $("#duty-"+id+" input").focus();
    $('.duty_name').unbind('keyup');
    $('.duty_name').unbind('blur');
    $('.duty_name').keyup(function (event) {
        if (event.keyCode == 13) {
            var param = {
                'action': 'add_edit_task',
                'name': $(this).val(),
                'id': $(this).parents('li').attr('id').replace(/task-/, ''),
                'is_folder': $(this).parents('li').attr('is_folder'),
                'parent': $(this).parents('li').attr('parent')
            }
            add_edit_task(param);
        }
        return false;
    });
    $('.duty_name').blur(function (event) {
        var param = {
            'action': 'add_edit_task',
            'name': $(this).val(),
            'id': $(this).parents('li').attr('id').replace(/task-/, ''),
            'is_folder': $(this).parents('li').attr('is_folder'),
            'parent': $(this).parents('li').attr('parent')
        }
        add_edit_task(param);
        return false;
    });
}


function add_edit_task(param, obj, obj2) {
    if (!isset(param.name) || (isset(param.name) && trim(param.name,'\r\n\t ')=='')) {
        alert_error('Задача не может быть пустой!')
        $('#add_task').fadeIn(0)
        return false;
    }
    $('#task-'+task+' input').attr('disabled', true);

    $.get('/task/', param, function (data) {
            window.document.location.reload()
    });



}

function add_edit_task2(param, textObj, smallObj, obj) {
    if (!isset(param.name) || (isset(param.name) && trim(param.name,'\r\n\t ')=='')) {
        alert_error('Задача не может быть пустой!')
        return false;
    }

    obj.attr('disabled', true);

    $.get('/task/', param, function (data) {
        if (data==0) {
            alert_error('Ошибка вставки задачи!');
            textObj.html(param.name)
        } else {
            var name = data;
            textObj.html(data)
            alert_messeng('Задача отредактирована!');
        }
        if (isset(smallObj)) {
            smallObj.show();
        }
        obj.attr('disabled', false);
    });



}


$(function () {
    add_task();
    //start_tree_menu('tree_menu');
})