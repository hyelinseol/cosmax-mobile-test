function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
var link = document.location.href; 
var tabNum = link .split('#').reverse()[0];

if(tabNum  == 'ING'){
    $('.galleryCate ul li').eq(0).addClass('on');
} else {
    $('.galleryCate ul li').eq(1).addClass('on');
}