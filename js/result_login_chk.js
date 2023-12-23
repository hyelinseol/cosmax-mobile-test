$(function() {
    // 로그인 여부
    //if (sessionStorage.getItem('member_' + CAFE24.SDE_SHOP_NUM) !== null) {
    //if (CAFE24.FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.common_member_id_crypt !== null && CAFE24.FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.common_member_id_crypt !== "") {

    if ($('.xans-layout-statelogon').length) {
        // 로그인이 된 경우
        $(".beforeLogin").hide();
        $(".afterLogin").show();
    } else {
        // 로그인이 안 된 경우
        $(".afterLogin").hide();
        $(".beforeLogin").show();
    }
    var nowPathName1 = window.location.href;
    var nowPathName2 = window.location.assign;

    console.log(nowPathName1);
    console.log(nowPathName2);

	
    $(document).ajaxComplete(function(){

        var nowPathName3 = window.location.href;
        var nowPathName4 = window.location.pathname;

        console.log(nowPathName3);
        console.log(nowPathName4);

        setCookie("resultChk", 'false');
        setCookie("resultHref", '');

        jQuery(".buttonLogin").bind("click", function() {
            // 쿠키에 닫기상태 저장 ( 브라우저 닫을 때까지 자동으로 열리지않고, 클릭해야만 열리게함 )
            setCookie("resultHref", nowPathName3);
            setCookie("resultChk", 'true');
            window.location = '/member/login.html';
        });


    });




    function setCookie(cookieName, value, exdays){		//쿠키저장
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var cookieValue = escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toGMTString());
        document.cookie = cookieName + "=" + cookieValue+"; path=/";
        //console.log(cookieName+" 변수에 쿠키 저장되었습니다. 값:"+value);
    }

    function getCookie(cookieName) {
        cookieName = cookieName + '=';
        var cookieData = document.cookie;
        var start = cookieData.indexOf(cookieName);
        var cookieValue = '';
        if(start != -1){
            start += cookieName.length;
            var end = cookieData.indexOf(';', start);
            if(end == -1)end = cookieData.length;
            cookieValue = cookieData.substring(start, end);
        }
        return unescape(cookieValue);
    } 




});



