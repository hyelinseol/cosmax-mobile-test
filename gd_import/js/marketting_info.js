// 로그인 여부
if (sessionStorage.getItem('member_' + CAFE24.SDE_SHOP_NUM) !== null) {
    let sessionMemberInfo = JSON.parse(sessionStorage.getItem('member_' + CAFE24.SDE_SHOP_NUM));
    let member_id = sessionMemberInfo.data.member_id; 
    
    console.log("11:"+member_id);
    
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'user_properties': {
            'user_id': member_id
        }
    });
}