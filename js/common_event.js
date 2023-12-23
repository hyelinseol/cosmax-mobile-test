$(document).ready(function(){
    if (window.location.pathname == "/survey/result.html"){
        return;
    }
    var _resultHref = getCookie("resultHref");
    var loginChk = $(".loginChk div").text();
    var loginChkTrim = loginChk.trim();
    if (loginChkTrim == "로그인" && jQuery.cookie('resultChk') == 'true') {	
        console.log("이벤트 체크 확인용");
        location.replace(_resultHref);
    }
});