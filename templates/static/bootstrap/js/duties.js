var duty = 0;

function add_edit_duty(obj) {
    $('#add_duty').addClass('disabled');
    $('#add_duty').unbind('click');
    obj.attr('disabled', true);

    var id = obj.parents('li').attr('id').replace(/duty-/ig, '')
    var name = trim(obj.val(), '\t\r\n ');
    var parent = obj.parents('li').attr('parent')
    if (!isset(name)) {
        alert_error('Должность не должна быть пустой!');
        obj.attr('disabled', false);
        obj.focus()
        return false;
    }
    $.get('/admin/user/', {action: 'add_edit_duty', id: id, name:name, parent:parent}, function () {
        window.document.location.href = window.document.location.href
        return false;
    });

    return false;
}

function duty_html(obj, id, parent, val) {
    val = trim(val, '\t\n\r ');
    var html = "<li id='duty-"+id+"' parent='"+parent+"'>" +
            "<div class='offset0'><input class='span12 duty_name' value='"+val+"' type='text' name='name' /></div>" +
        "</li>";

    if (duty==0) {
        obj.prepend(html)
    } else {
        if (obj.find('li').size() > 0) {
            $('#duty-'+duty).after(html)
        } else {
            obj.after(html)
        }

        var offset = $('#duty-'+duty+' div').attr('class').replace(/[^\d]+/, '');
        offset = Number(offset)+1;
        $('#duty-'+id+' div').attr('class','offset'+offset);
        if (!(obj.find('li').size() > 0)) {
            obj.remove();
        }

    }
    $("#duty-"+id+" input").focus();
    $('.duty_name').unbind('blur', 'keyup');
    $('.duty_name').keyup(function (event) {
        if (event.keyCode == 13) {
            add_edit_duty($(this));
        }
        return false;
    });
    $('.duty_name').blur(function (event) {
        add_edit_duty($(this));
        return false;
    });


}
function alertPosition(obj) {
    $('#alert').css({
            'position': 'absolute',
            'top': obj.height()+10,
            'left': 30
        });
}

function add_duty() {
    $('#alert').remove();

    try {
        $('#duty_list li i').droppable('destroy');
        $('#duty_list li i').draggable('destroy');
    } catch (exception_var) { true }


    $('#duty_list li i').draggable({ revert: true });
    $('#duty_list li i').droppable({
        activeClass: "ui-state-active",
        hoverClass: "ui-state-hover",
        over: function (event, ui) {
          $('#alert').remove();
        },
        drop: function( event, ui ) {
            var parent = $(this).parents('li').attr('id').replace(/duty-/,'')
            var id_duty = ui.draggable.parents('li').attr('id').replace(/duty-/,'')
            $.get('/admin/user/', {action: 'drag-and-drop', id: id_duty, parent:parent}, function (data) {
                    $('#alert').remove();
                    window.document.location.href = window.document.location.href
                    return false;
                });
        }
    });



    $('#duty_list li').unbind('click');
    $('#duty_list li').unbind('hover');
    $('#duty_list li').unbind('dblclick');
    $('#duty_list li').dblclick(function () {
        if (!$(this).hasClass('alert-info')) {
            $(this).click();
        }
        var parent = $(this).attr('parent');
        var id = $(this).attr('id').replace(/duty-/,'');
        $('#alert').remove();
        duty_html($(this), id, parent, $('>div', this).text());
        return false;
    });
    $('#duty_list li').hover(function () {

        var html = '<div id="alert" class="popover bottom show">' +
            '<div class="arrow"></div>' +
            '<h3 class="popover-title">Загрузка...</h3>' +
            '<div class="popover-content">' +
            '<p class="text-center">'+loader+'</p>' +
            '</div>' +
            '</div>';
        $('>div', this).append(html)
        alertPosition($(this));
        var obj = $(this);
        var id = $(this).attr('id').replace(/duty-/, '')
        $.get('/admin/user/', {action: 'info', id: id, date: $('.date_picer').val()}, function (data) {
            $('#alert .popover-title').html(data.name);
            var html = '<p>Дата создания: '+data.date+'</p>';
            if (isset(data.staff) && data.staff.length > 0) {
                html += '<p><strong>Работники:</strong></p>';
                $.each(data.staff, function (k,v) {
                    var date_expire = isset(v.date_expire)?" - " + v.date_expire:'';
                    html += "<p class='offset1'>" +
                        v.name +
                        " (" +
                        v.date +
                        date_expire +
                        ")" +
                        "</p>"
                });
            }
            $('#alert .popover-content').html(html);
            alertPosition(obj);
        }, 'json');

    }, function () {
        $('>div>#alert', this).remove()
    });
    $('#duty_list li').click(function () {
        duty = $(this).attr('id').replace(/duty-/, '');
        treeNode($(this));
        if ($(this).hasClass('alert-info')) {
            $(this).removeClass('alert-info');
            duty = 0;
        } else {
            $('#duty_list li').removeClass('alert-info');
            $(this).addClass('alert-info');
        }
        add_staff_user();
    });

    $('#add_duty').click(function () {
        duty_html($('#duty_list'), 0, (duty > 0)?duty:0, '')
        return false;
    });
}


$(function () {
   if ($('#add_duty').size() > 0) {
        add_duty();
    }
});