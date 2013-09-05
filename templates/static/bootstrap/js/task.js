
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


    $('#task_list li div').unbind('click');
    $('#task_list li div').unbind('dblclick');
    $('#task_list li div').dblclick(function () {
        if (!$(this).hasClass('alert-info')) {
            $(this).click();
        }
        var parent = $(this).parent().attr('parent');
        var id = $(this).parent().attr('id').replace(/task-/,'');
        //task_html($(this), id, parent, $(this).html());
        return false;
    });

    $('#task_list li div').click(function () {
        task = $(this).parent().attr('id').replace(/task-/, '');
        //treeNodeMenu($(this), 'tree_menu');
        if ($(this).hasClass('alert-info')) {
            $(this).removeClass('alert-info');
            task = 0;
        } else {
            $('#task_list li div').removeClass('alert-info');
            $(this).addClass('alert-info');
        }
    });

    $('#add_task').click(function () {
        task_html($('#task_list'), 0, (task > 0)?task:0, '', 0)
        return false;
    });
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


function add_edit_task(param) {
    if (!isset(param.name) || (isset(param.name) && trim(param.name,'\r\n\t ')=='')) {
        alert_error('Задача не может быть пустой!')
        return false;
    }

    $('#add_task').fadeOut(100);


    $.get('/task/', param, function (data) {
        var name = ''
        if ($('#task-'+task+'>row-fluid>span6 span11 div').size() > 0) {
            name = trim($('#task-'+task+'>row-fluid>span6 span11 div'),'\r\n\t ')
        }

        $('.duty_name').parents('li').remove();

        if (data==0) {
            alert_error('Ошибка вставки задачи!');
        } else {
            name = data;
            if (to_int(param.id)>0) alert_messeng('Задача отредактирована!');
        }

        if (to_int(param.id)==0) {
            window.document.location.reload()
        } else {
            $('#task-'+task+'>row-fluid>span6 span11 div').html(name)
            $('#task-'+task).show()
            $('#add_task').fadeTo(0);
        }

    });



}


$(function () {
    add_task();
    //start_tree_menu('tree_menu');
})