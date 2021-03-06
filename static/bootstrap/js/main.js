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


function alert_error(er) {
    $('.top-right').notify({
        message: { text: er }, type: 'error'
    }).show();
}

function alert_messeng(er) {
    $('.top-right').notify({
        message: { text: er }, type: 'success'
    }).show();
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

    if ($('.date_picer').size() > 0) {
        var date = new Date()
        $('.date_picer').datepicker({
            'format': 'dd.mm.yyyy',
            'weekStart': 1
        }).on('changeDate', function(ev){
					var dd = new Date(ev.date.valueOf());
                    dd = date_rus(dd)
                    $.cookie('date', dd);
					window.document.location.reload();
				});
        if ($('.date_picer_icon').size() > 0) {
            $('.date_picer_icon').click(function () {
                $('.date_picer').datepicker('show');
                return false;
            });
        }
    }


    start_tree('tree_left');
    $('#duty_list_left li div').click(function () {

        if (!$(this).hasClass('alert-info')) {
            $('.tree_left li div').removeClass('alert-info')
            $(this).addClass('alert-info')
        }

        var duty = $(this).parent().attr('id').replace(/d-/, '');

        treeNode($(this), 'tree_left');
    });

    $('#duty_list_left li div').dblclick(function () {
        var duty_coock = $(this).parent().attr('id').replace(/d-/, '');
        $.cookie('duty', duty_coock)
        window.document.location.reload();
        return false;
    });

    if ($.cookie('duty')) {
        $('#d-'+Number($.cookie('duty'))+">div").addClass('alert-info');
    }

});



