$(document).ready(function(){
    $("div[name=교환완료]").hide();
    
    var giftInfoContents = $("#giftInfo_선물하기").html().trim();
	console.log("giftInfoContents : " + giftInfoContents);
    if(giftInfoContents != null && giftInfoContents != "" && giftInfoContents != " ")
    	$("#deliveryInfoSection").hide();
});
