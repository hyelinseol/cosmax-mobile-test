$(document).ready(function(){
    EC$("#setOptLoadBtn").bind("click", function(){        
        EC$('.productSet ul.product > li').each(function(){
            var _thisSelect = EC$(this).find('.option select');
            var choosenOpt = EC$(this).find('.option select option:nth-child(2)').val();
            console.log(choosenOpt);
            var setNameChk = $('.boardWrite .name').text();

            //$(this).find('.option select option:nth-child(2)').attr('selected','selected');
            select_option( _thisSelect, choosenOpt);
            //EC$(this).find('.option select').val(choosenOpt);
            function select_option( selector, value ){        
                EC$(selector).find('option[value="' + value + '"]').prop('selected', true).trigger('change');	
            }
        });	

    });
    var setNameChk = $('.boardWrite .name').text();

    if(setNameChk.indexOf('세트') != "-1"){
        setTimeout(function (){ 
            EC$("#setOptLoadBtn").click();

            //EC$(".btnClose").click();
            //$(top.document).find("#chatis_gp_button").click();
            giftBtnChk('.xans-product-action', function(){ 
                EC$("#chatis_gp_button").click();

            }); 
        },500);
    }
});




function giftBtnChk(selector, callback) {
    var input = $(selector);
    var oldvalue = input.text();
    setInterval(function(){
        if (input.text()!=oldvalue){
            oldvalue = input.text();
            callback();
        }
    }, 100);
}
