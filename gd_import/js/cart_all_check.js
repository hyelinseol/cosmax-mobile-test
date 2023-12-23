$(document).ready(function(){
var link = document.location.href; //현재 페이지 url 를 가지고 옵니다.
if (link.match('basket')) { //가지고온 url 중에 basket(장바구니)이 있는지 확인합니다.
$( "input[type=checkbox]" ).each(function(){ //확인됐으면 모든 체크박스에 체크를 해줍니다.
$(this).attr('checked', true);
});
}
});