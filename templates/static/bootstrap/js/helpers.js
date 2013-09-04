function isset(a){return(a===null||a===''||a===false||a===undefined)?false:true}function to_int(a){if(!isNaN(Number(a)))return Number(a);else return 0}function to_str(a){return String(a)}function explode(a,b){return b.split(a)}function implode(a,b){var c="";for(var i=0;i<b.length;++i){c+=b[i]+a}return trim(c,a)}function trimLeft(a,b){if(!isset(b))b="^[ ]+";else b="^["+b+"]+";var c=new RegExp(b,"i");return a.replace(c,'')}function trimRight(a,b){if(!isset(b))b="[ ]+$";else b="["+b+"]+$";var c=new RegExp(b,"i");return a.replace(c,'')}function trim(a,b){return trimLeft(trimRight(a,b),b)}function p(){for(var i=0;i<arguments.length;i++){alert("arguments["+i+"] = "+arguments[i])}}function t(){for(var i=0;i<arguments.length;i++){alert("arguments["+i+"] = "+arguments[i].toSource())}}


var loader = '<img src="/static/bootstrap/img/loading.gif" />';

function date_rus(date){
    var date_str = ((date.getDate()<10)?("0"):(""))+date.getDate();
    date_str += '.';
    date_str += ((date.getMonth()<9)?("0"):(""))+(date.getMonth()+1);
    date_str += '.';
    date_str += date.getFullYear();
    return date_str;
}

function date_sql(date){
    var date_str = date.getFullYear();
    date_str += '-';
    date_str += ((date.getMonth()<9)?("0"):(""))+(date.getMonth()+1);
    date_str += '-';
    date_str += ((date.getDate()<10)?("0"):(""))+date.getDate();
    return date_str
}