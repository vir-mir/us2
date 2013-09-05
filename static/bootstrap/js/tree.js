var parent_def = [1];

if ($.cookie('parent_def')) {
    parent_def = $.cookie('parent_def').split(',').map(to_int_array_item);
}

function to_int_array_item(i) {
    return Number(i);
}


function level_tree(level, tree_class) {
    parent_def = [];



    $('.'+tree_class+' li').hide();
    $('.'+tree_class+'>ul>li').each(function () {
        $(this).show()
        $(this).find('i').addClass('icon-plus').removeClass('icon-minus');
    });
    for (var i=0; i<level;i++)
        $('.'+tree_class+' li[level='+i+']').each(function () {
            treeNode($('>div', this), tree_class);
        });


    return false;
}


function treeNode(obj, tree_class) {
    if (obj.size() == 0) return ;
    var duty = 0;
    // переделать нормально
    // сейчас нету необходимости так как актуально для страниц с 2 выводами структуры
    // если будет 3, то не за работает!
    if (tree_class=='tree') {
        duty = Number(obj.parent().attr('id').replace(/duty-/, ''));
    } else {
        duty = Number(obj.parent().attr('id').replace(/d-/, ''));
    }

    var children = obj.parent('li.parent_li').find(' > ul > li');
        if (children.is(':visible')) {
    		children.hide('fast');
    		obj.find('i').addClass('icon-plus').removeClass('icon-minus');
            if (parent_def.indexOf(duty) > -1) {
                var parent_def_left = parent_def.slice(0,parent_def.indexOf(duty));
                var parent_def_right = parent_def.slice(parent_def.indexOf(duty)+1, parent_def.length);
                parent_def = parent_def_left.concat();
                for (var i = 0; i < parent_def_right.length; i++) parent_def.push(parent_def_right[i]);

            }
        } else {
    		children.show('fast');
    		obj.find('i').addClass('icon-minus').removeClass('icon-plus');
            if (parent_def.indexOf(duty) < 0) {
                parent_def.push(duty);
            }
        }

    $.cookie('parent_def', parent_def.toString())

}

function showStaffTree(obj) {
    if (obj.parents('.well').next().find('small').hasClass('hidden'))
        obj.parents('.well').next().find('small').removeClass('hidden').addClass('block');
    else
        obj.parents('.well').next().find('small').addClass('hidden').removeClass('block');
    return false;
}

function start_tree(tree_class) {
    $('.'+tree_class+' > ul').attr('role', tree_class).find('ul').attr('role', 'group');
	$('.'+tree_class+'').find('li:has(ul)').addClass('parent_li').attr('role', 'treeitem');

    var duty = 'd-';
    if (tree_class=='tree') {
        duty = 'duty-';
    }
    $('.'+tree_class+' li').hide();
    $('.'+tree_class+'>ul>li').each(function () {
        $(this).show()
    });

    var def = parent_def.concat();
    if (def.length > 0) {
        for (var i = 0; i < def.length; i++) {
            treeNode($('.'+tree_class).find('#'+duty+def[i]+'>div'), tree_class);
        }
    }

    var level = eval(tree_class+'_level');
    var is_duties_dynamic = eval(tree_class+'_is_duties_dynamic');

    if (level > 0 || is_duties_dynamic) {
        var html = '<div class="well well-small"><div class="pull-left">';
        for (var i = 1; i<level+1;i++)
            html += '<a href="#" class="badge badge-info" onclick="return level_tree('+i+', \''+tree_class+'\')">'+i+'</a> ';
        html += '</div><div class="pull-right">' +
            '<a href="#" onclick="return showStaffTree($(this));"><i class="icon-user"></i></a>' +
            '</div>';
        html += '<div class="clearfix"></div></div>';


        $('.'+tree_class).before(html)
    }



}


