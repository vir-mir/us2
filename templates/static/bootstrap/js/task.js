
var task = 0;


// var list_heder = $('.list_heder');
// var list_heder_hr = $('.list_heder').next();


function add_task() {
    try {
        $('#task_list li div i').droppable('destroy');
        $('#task_list li div i').draggable('destroy');
    } catch (exception_var) { true }


    /*$('#task_list li div i').draggable({ revert: true });
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
    });//*/


    $('#task_list li>div.row-fluid').unbind('click');
    $('#task_list li>div.row-fluid>.span6').unbind('dblclick');
    $('#task_list li>div.row-fluid>.span6').dblclick(function () {
        if (!$(this).parents('li>div.row-fluid').hasClass('alert-info')) {
            $(this).parents('li>div.row-fluid').click();
        }
        if (!is_valid_edit(null, 'status_edit')) {
            return false;
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

function add_edit_task2(param, textObj, smallObj, obj, cal) {
    if (!isset(param.not_name)) {
        if (!isset(param.name) || (isset(param.name) && trim(param.name,'\r\n\t ')=='')) {
            alert_error('Задача не может быть пустой!')
            return false;
        }
    }

    if (isset(obj)) {
        obj.attr('disabled', true);
    }

    $.get('/task/', param, function (data) {
        if (!isset(cal)) {
            if (data.error == 0) {
                alert_error(data.error);
                textObj.html(param.name)
            } else {
                textObj.html(data.name)
                alert_messeng('Задача отредактирована!');
            }
        }

        if (isset(smallObj)) {
            smallObj.show();
        }
        if (isset(cal)) {
            cal(data, textObj)
        }
        if (isset(obj)) {
            obj.attr('disabled', false);
        }

    }, 'json');



}

function get_status_html(data) {
    return '<span class="'+data.class_alt+' tos t"' +
                'data-placement="top"' +
                'id="status-'+data.id+'"' +
                'data-original-title="'+data.name+'">' +
                '<i class="'+data.class_icon+' icon-white"></i>' +
                '</span>';
}

function is_valid_edit(obj, valid, cal) {

    return JSON.parse($.ajax({
        url: '/task/',
        type: 'get',
        data: {action: 'is_valid_task_edit', task_id: task, valid:valid},
        dataType: 'json',
        async: false,
        success: function(data) {
            var ret = true;
            if (isset(data.error)) {
                alert_error(data.error);
                ret = false;
            }
            if (isset(cal)) cal(obj, ret);

        }
     }).responseText).error==''?true:false;
}

function date_task_dblclick() {
    $('.date_task').dblclick(function () {
        $('.date_task').unbind('dblclick')
        if (!$(this).parents('li>div.row-fluid').hasClass('alert-info')) {
            $(this).parents('li>div.row-fluid').click();
        }
        var mainObj = $(this);

        mainObj.find('>div:eq(0)').hide();
        mainObj.find('>div:eq(1)').hide();

        if (!is_valid_edit(mainObj, 'status_edit', function (mainObj, ret) {
            if (!ret) {
                mainObj.find('>div:eq(0)').show();
                mainObj.find('>div:eq(1)').show();
            }
        })) {
            date_task_dblclick();
            return false;
        }

        var date_start_old = trim(mainObj.find('>div:eq(0)').html(), '\r\n\t ');
        var date_end_old = trim(mainObj.find('>div:eq(1)').html(), '\r\n\t ');

        mainObj.append('<div>' +
            '<input name="date_start" type="text" class="span12" value="'+date_start_old+'" />' +
            '<input name="date_end" type="text" class="span12" value="'+date_end_old+'" />' +
            '</div>');


        var cal = function (data, mainObj) {
            if (isset(data.error)) alert_error(data.error);

            var date_end = date_rus_obj(mainObj.find('input[name=date_end]').val()).valueOf();
            var cur_date = date_rus_obj($.cookie('date')).valueOf();

            mainObj.find('>div:eq(1)').attr('class', '')

            if (date_end <= cur_date) {
                mainObj.find('>div:eq(1)').addClass('text-error');
            } else {
                mainObj.find('>div:eq(1)').addClass('text-success');
            }

            mainObj.find('>div:eq(0)').html(mainObj.find('input[name=date_start]').val());
            mainObj.find('>div:eq(1)').html(mainObj.find('input[name=date_end]').val());
            mainObj.find('>div:eq(0)').show();
            mainObj.find('>div:eq(1)').show();
            mainObj.find('>div:eq(2)').remove();
            date_task_dblclick();
        }

        var checkin = mainObj.find('input[name=date_start]').datepicker({
            'format': 'dd.mm.yyyy',
            'weekStart': 1,
          onRender: function(date) {
            return '';
          }
        }).on('changeDate', function(ev) {
          if (ev.date.valueOf() > checkout.date.valueOf()) {
            var newDate = new Date(ev.date)
            newDate.setDate(newDate.getDate() + 1);
            checkout.setValue(newDate);
          }
          checkin.hide();
          mainObj.find('input[name=date_end]').focus();
        }).data('datepicker');
        mainObj.find('input[name=date_start]').datepicker('show');
        var checkout = mainObj.find('input[name=date_end]').datepicker({
            'format': 'dd.mm.yyyy',
            'weekStart': 1,
          onRender: function(date) {
            return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
          }
        }).on('changeDate', function(ev) {
          checkout.hide();
            var param = {
                'not_name': true,
                'action': 'add_edit_date',
                'id': mainObj.parents('li').attr('id').replace(/task-/, ''),
                'is_folder': mainObj.parents('li').attr('is_folder'),
                'parent': mainObj.parents('li').attr('parent')
            }
            param.date_start = mainObj.find('input[name=date_start]').val();
            param.date_end = mainObj.find('input[name=date_end]').val();
            add_edit_task2(param, mainObj, null, null, cal)
        }).data('datepicker');
        mainObj.find('input').focus(function () {
            $('.datepicker:visible').css('left', $('.datepicker:visible').position().left - 80);
        });
        mainObj.find('input[name=date_start]').focus();

        return false;

    });
}

function status_data_dblclick() {
    $('.status_data').unbind('dblclick');
    $('.status_data').dblclick(function () {
        if (!$(this).parents('li>div.row-fluid').hasClass('alert-info')) {
            $(this).parents('li>div.row-fluid').click();
        }

        var status_id_old = $('>span', this).attr('id').replace(/status-/, '')
        var obj = $(this);
        obj.find('>span').hide();

        $.get('/task/', {
            action: 'get_status_all'
        }, function(data) {
            if (isset(data.statuses)) {
                if (obj.find('>div').size() > 0) obj.find('>div').remove();
                obj.prepend('<div></div>');
                $.each(data.statuses, function (k,v) {
                    obj.find('>div').append(get_status_html(v));
                });
                obj.tooltip({
                    selector: ".tos"
                });
                obj.find('.tos').click(function () {
                    if (!$(this).parents('li>div.row-fluid').hasClass('alert-info')) {
                        $(this).parents('li>div.row-fluid').click();
                    }
                    var status_id = $(this).attr('id').replace(/status-/, '')
                    var tosObj = $(this);

                    var param = {
                        'not_name': true,
                        'action': 'add_edit_task',
                        'id': tosObj.parents('li').attr('id').replace(/task-/, ''),
                        'is_folder': tosObj.parents('li').attr('is_folder'),
                        'status_id': status_id,
                        'parent': tosObj.parents('li').attr('parent')
                    }

                    add_edit_task2(param, tosObj, obj.find('>span'), null, function (data, textObj) {
                        if (isset(data.error)) {
                            alert_error(data.error);
                        } else {
                            alert_messeng('Статус изменен!');
                            textObj.parents('.status_data').find('>span').attr('class', textObj.attr('class'));
                            textObj.parents('.status_data').find('>span').addClass('tooltips');
                            textObj.parents('.status_data').find('>span').removeClass('tos');
                            textObj.parents('.status_data').find('>span').removeClass('t');
                            textObj.parents('.status_data').find('>span').attr('data-original-title', textObj.attr('data-original-title'));
                            textObj.parents('.status_data').find('>span').attr('id', textObj.attr('id'));
                            textObj.parents('.status_data').find('>span>i').attr('class', textObj.find('>i').attr('class'));
                        }

                        if (textObj.hasClass('label-inverse')) {
                            textObj.parents('li>div.row-fluid').addClass('task_dep')
                        } else {
                            textObj.parents('li>div.row-fluid').removeClass('task_dep')
                        }
                        //textObj.parents('status_data>div').tooltip();

                        textObj.parents('.status_data').find('>div').remove();
                        status_data_dblclick();

                    });



                    return false;
                });
            } else if (isset(data.error)) {
                alert_error(data.error);
                obj.find('>span').show();
            } else {
                alert_error('Что-то пошло не так!!!');
                obj.find('>span').show();
            }
        }, 'json');



        return true;
    });
}

$(function () {
    add_task();


    date_task_dblclick();

    status_data_dblclick();


    //start_tree_menu('tree_menu');
})