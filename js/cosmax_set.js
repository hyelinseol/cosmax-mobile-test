$(document).ready(function(){
 

    var setNameChk = $('.re_product_detail .detail-header .box-info .name').text();

    if(setNameChk.indexOf('세트') != "-1"){
        $('head').append('<style>#opt_layer_window{display:none!important}</style>');
    }

});

