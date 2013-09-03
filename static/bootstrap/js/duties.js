var duty = 0;

function add_edit_duty(obj) {
    $('#add_duty').addClass('disabled');
    $('#add_duty').unbind('click');
    obj.attr('disabled', true);

    var id = obj.parents('li').attr('id').replace(/duty-/ig, '')
    var name = obj.val()
    var parent = obj.parents('li').attr('parent')

    $.get('/admin/user/', {action: 'add_edit_duty', id: id, name:name, parent:parent}, function (data) {
        $('#add_duty').removeClass('disabled');
        $('#add_duty').unbind('click');
        obj.parents('li').attr('id', 'duty-'+data.id)
        obj.parents('li div').html('<i class="icon-folder-close"></i> '+data.name);
        add_duty();
        return false;
    }, 'json');

    return false;
}

function duty_html(obj, id) {
    var parent = duty > 0?duty:0;
    var html = "<li id='duty-"+id+"' parent='"+parent+"'>" +
            "<div class='offset0'><input class='span12 duty_name' type='text' name='name' /></div>" +
        "</li>";

    if (duty==0) {
        obj.prepend(html)
    } else {
        $('#duty-'+duty).after(html)
        var offset = $('#duty-'+duty+' div').attr('class').replace(/[^\d]+/, '');
        offset = Number(offset)+1;
        $('#duty-0 div').attr('class','offset'+offset)

    }

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
function alertPosition() {
    $('#alert').css({
            'position': 'absolute',
            'top': -$('#alert').height()-10,
            'left': 0
        });
}

function add_duty() {

    $('#duty_list li').droppable({ revert: "valid" });
    $('#duty_list li').droppable({
      activeClass: "ui-state-hover",
      hoverClass: "ui-state-active",
      drop: function( event, ui ) {
        /*$( this )
          .addClass( "ui-state-highlight" )
          .find( "p" )
            .html( "Dropped!" );*/
      }
    });

    $('#duty_list li').unbind('click', 'hover');
    $('#duty_list li').hover(function () {

        var html = '<div id="alert" class="popover top show">' +
            '<div class="arrow"></div>' +
            '<h3 class="popover-title">Загрузка...</h3>' +
            '<div class="popover-content">' +
            '<p class="text-center">'+loader+'</p>' +
            '</div>' +
            '</div>';
        $('>div', this).append(html)
        alertPosition();

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
    });

    $('#add_duty').click(function () {
        duty_html($('#duty_list'), 0)
        return false;
    });
}


$(function () {
   if ($('#add_duty').size() > 0) {
        add_duty();
    }
});