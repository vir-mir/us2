var menu_def = [1];

if ($.cookie('menu_def')) {
    menu_def = $.cookie('menu_def').split(',').map(to_int_array_item_menu);
}

function to_int_array_item_menu(i) {
    return Number(i);
}


function level_tree_menu(level, tree_class) {
    menu_def = [];



    $('.'+tree_class+' li').hide();
    $('.'+tree_class+'>ul>li').each(function () {
        $(this).show()
        $(this).find('i').addClass('icon-plus').removeClass('icon-minus');
    });
    for (var i=0; i<level;i++)
        $('.'+tree_class+' li[level='+i+']').each(function () {
            treeNodeMenu($('>div', this), tree_class);
        });


    return false;
}


function treeNodeMenu(obj, tree_class) {
    if (obj.size() == 0) return ;
    var duty = 0;
    // переделать нормально
    // сейчас нету необходимости так как актуально для страниц с 2 выводами структуры
    // если будет 3, то не за работает!
    duty = Number(obj.parent().attr('id').replace(/menu-/, ''));

    var children = obj.parent('li.parent_li').find(' > ul > li');
        if (children.is(':visible')) {
    		children.hide('fast');
    		obj.find('i').addClass('icon-plus').removeClass('icon-minus');
            if (menu_def.indexOf(duty) > -1) {
                var menu_def_left = menu_def.slice(0,menu_def.indexOf(duty));
                var menu_def_right = menu_def.slice(menu_def.indexOf(duty)+1, menu_def.length);
                menu_def = menu_def_left.concat();
                for (var i = 0; i < menu_def_right.length; i++) menu_def.push(menu_def_right[i]);

            }
        } else {
    		children.show('fast');
    		obj.find('i').addClass('icon-minus').removeClass('icon-plus');
            if (menu_def.indexOf(duty) < 0) {
                menu_def.push(duty);
            }
        }

    $.cookie('menu_def', menu_def.toString())

}

function showStaffTreeMenu(obj) {
    if (obj.parents('.well').next().find('small').hasClass('hidden'))
        obj.parents('.well').next().find('small').removeClass('hidden').addClass('block');
    else
        obj.parents('.well').next().find('small').addClass('hidden').removeClass('block');
    return false;
}

function start_tree_menu(tree_class) {
    $('.'+tree_class+' > ul').attr('role', tree_class).find('ul').attr('role', 'group');
	$('.'+tree_class+'').find('li:has(ul)').addClass('parent_li').attr('role', 'treeitem');

    var duty = 'menu-';

    $('.'+tree_class+' li').hide();
    $('.'+tree_class+'>ul>li').each(function () {
        $(this).show()
    });

    var def = menu_def.concat();
    if (def.length > 0) {
        for (var i = 0; i < def.length; i++) {
            treeNodeMenu($('.'+tree_class).find('#'+duty+def[i]+'>div'), tree_class);
        }
    }

    var level = eval('menu_level');
    var is_duties_dynamic = eval('tree_is_menu');

    if (level > 0 || is_duties_dynamic) {
        var html = '<div class="well well-small"><div class="pull-left">';
        for (var i = 1; i<level+1;i++)
            html += '<a href="#" class="badge badge-info" onclick="return level_tree_menu('+i+', \''+tree_class+'\')">'+i+'</a> ';
        html += '</div><div class="pull-right">' +
            '<a href="#" onclick="return showStaffTreeMenu($(this));"><i class="icon-user"></i></a>' +
            '</div>';
        html += '<div class="clearfix"></div></div>';


        $('.'+tree_class).before(html)
    }



}


