$(document).ready(function () {    
    //if (sessionStorage.getItem('member_' + CAFE24.SDE_SHOP_NUM) !== null) {
    if ($(".xans-layout-statelogon").length) {
        // 로그인이 된 경우
        // alert("로그인 되었습니다.");
        location.replace('/');
    } else {
        // 로그인이 안 된 경우
        // alert("로그인 전 입니다니다.");
    }
    


    var attendRefer= document.referrer;
    console.log(attendRefer);

        
    
});

