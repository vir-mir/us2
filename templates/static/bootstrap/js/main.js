function isset(a){return(a===null||a===''||a===false||a===undefined)?false:true}function to_int(a){if(!isNaN(Number(a)))return Number(a);else return 0}function to_str(a){return String(a)}function explode(a,b){return b.split(a)}function implode(a,b){var c="";for(var i=0;i<b.length;++i){c+=b[i]+a}return trim(c,a)}function trimLeft(a,b){if(!isset(b))b="^[ ]+";else b="^["+b+"]+";var c=new RegExp(b,"i");return a.replace(c,'')}function trimRight(a,b){if(!isset(b))b="[ ]+$";else b="["+b+"]+$";var c=new RegExp(b,"i");return a.replace(c,'')}function trim(a,b){return trimLeft(trimRight(a,b),b)}function p(){for(var i=0;i<arguments.length;i++){alert("arguments["+i+"] = "+arguments[i])}}function t(){for(var i=0;i<arguments.length;i++){alert("arguments["+i+"] = "+arguments[i].toSource())}}

/**
 *
 * @param data
 * {
 *     body:
 *     form_attr:
 *     head:
 *     button: {
 *         attr:
 *         class:
 *         name:
 *     }
 * }
 */
function show_model(data) {


    var html = '<div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';

    if (data.head!==undefined && data.head!==null && data.head!=='' && data.head!==false) {

        html += '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>' +
            '<h3 id="myModalLabel">' +
            data.head +
            '</h3>' +
            '</div>';
    }


    html += "<form"+data.form_attr+">"

    if (data.body!==undefined && data.body!==null && data.body!=='' && data.body!==false) {

        html += '<div class="modal-body">' +
            data.body +
            '</div>';
    }

    html += '<div class="modal-footer">';

    if (data.button!==undefined && data.button!==null && data.button!=='' && data.button!==false) {

        $.each(data.button, function (i,v) {
            html += '<button '+v.attr+' class="btn '+v.class+'">'+v.name+'</button>';
        });

    }

    html += '<button class="btn" data-dismiss="modal">Закрыть</button>' +
        '</div>';

    html += '</form>'

    html += '</div>';

    if ($("#myModal").size() > 0) {
        $("#myModal").remove();
    }

    $('body').append(html);
    $("#myModal").modal();


}



$(function () {

    $('body').tooltip({
        selector: ".tooltips"
    });

    /*var data = {
            'head': "Задать вопрос",
            'body': body_fos,
            'form_attr': ' method="post" class="form_fos" action="/feedback/ajax/?function_event=send_fos" style="margin: 0"',
            'button': [
                {name: 'Отправить', attr:'type="submit" name="send_fos"', class:'btn-primary'}
            ]
        };

        show_model(data);*/


    $("a[href$='.jpg'], a[href$='.png'], a[href$='.gif'], a[href$='.jpeg'], .lightbox").lightBox();

    if (isset(errors)) {
        for (var i=0; i<errors.length; i++) {
            $('.top-right').notify({
                message: { text: errors[i] }, type: 'error'
            }).show();
        }
    }
    if (isset(success)) {
        for (var i=0; i<errors.length; i++) {
            $('.top-right').notify({
                message: { text: errors[i] }, type: 'success'
            }).show();
        }
    }


    if ($('#add_duty').size() > 0) {
        add_duty();
    }



});



var duty = 0;

function add_edit_duty(obj) {
    $('#add_duty').addClass('disabled');
    $('#add_duty').unbind('click');
    obj.attr('disabled', true);

    var id = obj.parents('li').attr('id').replace(/duty-/ig, '')
    var name = obj.val()
    var parent = obj.parents('li').attr('parent')

    $.get('/admin/user/', {action: 'add_edit_duty', id: id, name:name, parent:parent}, function (data) {
        alert(data)
        $('#add_duty').removeClass('disabled');
        $('#add_duty').unbind('click');
        obj.parents('li').remove()
        return false;
    });

    return false;
}

function duty_html(obj, id) {
    var parent = duty > 0?duty:0;
    var html = "<li id='duty-"+id+"' parent='"+parent+"'>" +
            "<div class='row-fluid'>" +
            "<div class='span6'><span><input class='span12 duty_name' type='text' name='name' /></span></div>" +
        "</li>";

    obj.prepend(html)

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

function add_duty() {
    $('#duty_list li').unbind('click');
    $('#duty_list li').click(function () {
        duty = $(this).attr('id').replace(/duty-/, '');
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