var parent_def = [0, 1]
var duty_parent = {}


function slide_parent_show(parent) {
    $('.tree > ul li[parent='+parent+']').each(function () {
        $(this).show('fast');
    });
    $('.tree > ul li[id=duty-'+parent+'] i').each(function () {
        $(this).removeClass('icon-plus').addClass('icon-minus');
    });
}

function slide_parent_hide(parent) {
    $('.tree > ul li[parent='+parent+']').each(function () {
        $(this).hide('fast');
    });
    $('.tree > ul li[id=duty-'+parent+'] i').each(function () {
        $(this).addClass('icon-plus').removeClass('icon-minus');
    });
    if (isset(duty_parent['i'+parent])) {
        for (var i = 0; i < duty_parent['i'+parent].length; i++) {
            slide_parent_hide(duty_parent['i'+parent][i]);
        }
    }
}


function treeNode(obj) {
    var parent = obj.attr('id').replace(/duty-/, '')
    if ($('.tree > ul li[parent='+parent+']').is(':visible')) {
        slide_parent_hide(parent)
    } else {
        slide_parent_show(parent)
    }
}

$(function() {

    $('.tree > ul li').hide('fast');

    for (var i = 0; i < parent_def.length; i++) {
        slide_parent_show(parent_def[i]);
    }
});