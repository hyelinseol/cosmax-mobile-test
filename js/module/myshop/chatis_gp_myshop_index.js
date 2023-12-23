document.addEventListener("DOMContentLoaded", function(){
    console.log("Chatis Custom");
    var chatis_xhr = new XMLHttpRequest();
    chatis_xhr.onreadystatechange = function() {
        if (chatis_xhr.readyState === chatis_xhr.DONE) {
            if (chatis_xhr.status === 200 || chatis_xhr.status === 201) {
                console.log("chatisXHR Success");
                console.log(chatis_xhr.response);
                var data = JSON.parse(chatis_xhr.response);
                var chatis_custom_js = data.script_url;
                chatisLoadJavacript(chatis_custom_js);
            } else {
                console.log("chatisXHR Failed");
                console.error(chatis_xhr.responseText);
            }
        }
    };
    chatis_xhr.open('GET', 'https://gp.chatis.app/api/call_custom_js?mall_id='+CAFE24API.MALL_ID+"&shop_no="+CAFE24API.SHOP_NO); // 메소드와 주소 설정
    chatis_xhr.send(); // 요청 전송 
});

function chatisLoadJavacript(js) {
    var random_version = Math.random().toString(10).substr(2,8);
    var input_script = document.createElement("script");
    input_script.type = "text/javascript";
    input_script.src = js + "?v=" + random_version;
    input_script.async = false;
    document.getElementsByTagName( "head" )[0].appendChild( input_script );
}