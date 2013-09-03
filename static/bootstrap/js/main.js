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

    /*$('body').tooltip({
        selector: ".tooltips"
    });*/

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
        });
    }


});



