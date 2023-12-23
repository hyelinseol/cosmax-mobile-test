textChange('#survey_result', function(){ 
    console.log("12355");

	var _nowHairType = $(".survey_osdl_type").text();
       var _nowHairType = $(".survey_osdl_type").text();
    if(_nowHairType.indexOf('NSHW') != "-1"){
        var downloadImage = "/web/contents/mbti/MBTI_NSHW.jpg";
        var downloadName = "MBTI_NSHW.jpg";
    }else if(_nowHairType.indexOf('OSHL') != "-1"){
        var downloadImage = "/web/contents/mbti/MBTI_OSHL.jpg";
        var downloadName = "MBTI_OSHL.jpg";
    }else if(_nowHairType.indexOf('OSHW') != "-1"){
        var downloadImage = "/web/contents/mbti/MBTI_OSHW.jpg";
        var downloadName = "MBTI_OSHW.jpg";
    }else if(_nowHairType.indexOf('OSDL') != "-1"){
        var downloadImage = "/web/contents/mbti/MBTI_OSDL.jpg";
        var downloadName = "MBTI_OSDL.jpg";
    }else if(_nowHairType.indexOf('OSDW') != "-1"){
        var downloadImage = "/web/contents/mbti/MBTI_OSDW.jpg";
        var downloadName = "MBTI_OSDW.jpg";
    }else if(_nowHairType.indexOf('OSEL') != "-1"){
        var downloadImage = "/web/contents/mbti/MBTI_OSEL.jpg";
        var downloadName = "MBTI_OSEL.jpg";
    }else if(_nowHairType.indexOf('OSEW') != "-1"){
        var downloadImage = "/web/contents/mbti/MBTI_OSEW.jpg";
        var downloadName = "MBTI_OSEW.jpg";
    }else if(_nowHairType.indexOf('ORHL') != "-1"){
        var downloadImage = "/web/contents/mbti/MBTI_ORHL.jpg";
        var downloadName = "MBTI_ORHL.jpg";
    }else if(_nowHairType.indexOf('ORHW') != "-1"){
        var downloadImage = "/web/contents/mbti/MBTI_ORHW.jpg";
        var downloadName = "MBTI_ORHW.jpg";
    }else if(_nowHairType.indexOf('ORDL') != "-1"){
        var downloadImage = "/web/contents/mbti/MBTI_ORDL.jpg";
        var downloadName = "MBTI_ORDL.jpg";
    }else if(_nowHairType.indexOf('ORDW') != "-1"){
        var downloadImage = "/web/contents/mbti/MBTI_ORDW.jpg";
        var downloadName = "MBTI_ORDW.jpg";
    }else if(_nowHairType.indexOf('OREL') != "-1"){
        var downloadImage = "/web/contents/mbti/MBTI_OREL.jpg";
        var downloadName = "MBTI_OREL.jpg";
    }else if(_nowHairType.indexOf('OREW') != "-1"){
        var downloadImage = "/web/contents/mbti/MBTI_OREW.jpg";
        var downloadName = "MBTI_OREW.jpg";
    }else if(_nowHairType.indexOf('NSHL') != "-1"){
        var downloadImage = "/web/contents/mbti/MBTI_NSHL.jpg";
        var downloadName = "MBTI_NSHL.jpg";
    }else if(_nowHairType.indexOf('NSDL') != "-1"){
        var downloadImage = "/web/contents/mbti/MBTI_NSDL.jpg";
        var downloadName = "MBTI_NSDL.jpg";
    }else if(_nowHairType.indexOf('NSDW') != "-1"){
        var downloadImage = "/web/contents/mbti/MBTI_NSDW.jpg";
        var downloadName = "MBTI_NSDW.jpg";
    }else if(_nowHairType.indexOf('NSEL') != "-1"){
        var downloadImage = "/web/contents/mbti/MBTI_NSEL.jpg";
        var downloadName = "MBTI_NSEL.jpg";
    }else if(_nowHairType.indexOf('NSEW') != "-1"){
        var downloadImage = "/web/contents/mbti/MBTI_NSEW.jpg";
        var downloadName = "MBTI_NSEW.jpg";
    }else if(_nowHairType.indexOf('NRHL') != "-1"){
        var downloadImage = "/web/contents/mbti/MBTI_NRHL.jpg";
        var downloadName = "MBTI_NRHL.jpg";
    }else if(_nowHairType.indexOf('NRHW') != "-1"){
        var downloadImage = "/web/contents/mbti/MBTI_NRHW.jpg";
        var downloadName = "MBTI_NRHW.jpg";
    }else if(_nowHairType.indexOf('NRDL') != "-1"){
        var downloadImage = "/web/contents/mbti/MBTI_NRDL.jpg";
        var downloadName = "MBTI_NRDL.jpg";
    }else if(_nowHairType.indexOf('NRDW') != "-1"){
        var downloadImage = "/web/contents/mbti/MBTI_NRDW.jpg";
        var downloadName = "MBTI_NRDW.jpg";
    }else if(_nowHairType.indexOf('NREL') != "-1"){
        var downloadImage = "/web/contents/mbti/MBTI_NREL.jpg";
        var downloadName = "MBTI_NREL.jpg";
    }else if(_nowHairType.indexOf('NREW') != "-1"){
        var downloadImage = "/web/contents/mbti/MBTI_NREW.jpg";
        var downloadName = "MBTI_NREW.jpg";
    }else if(_nowHairType.indexOf('DSHL') != "-1"){
        var downloadImage = "/web/contents/mbti/MBTI_DSHL.jpg";
        var downloadName = "MBTI_DSHL.jpg";
    }else if(_nowHairType.indexOf('DSHW') != "-1"){
        var downloadImage = "/web/contents/mbti/MBTI_DSHW.jpg";
        var downloadName = "MBTI_DSHW.jpg";
    }else if(_nowHairType.indexOf('DSDL') != "-1"){
        var downloadImage = "/web/contents/mbti/MBTI_DSDL.jpg";
        var downloadName = "MBTI_DSDL.jpg";
    }else if(_nowHairType.indexOf('DSDW') != "-1"){
        var downloadImage = "/web/contents/mbti/MBTI_DSDW.jpg";
        var downloadName = "MBTI_DSDW.jpg";
    }else if(_nowHairType.indexOf('DSEL') != "-1"){
        var downloadImage = "/web/contents/mbti/MBTI_DSEL.jpg";
        var downloadName = "MBTI_DSEL.jpg";
    }else if(_nowHairType.indexOf('DSEW') != "-1"){
        var downloadImage = "/web/contents/mbti/MBTI_DSEW.jpg";
        var downloadName = "MBTI_DSEW.jpg";
    }else if(_nowHairType.indexOf('DRHL') != "-1"){
        var downloadImage = "/web/contents/mbti/MBTI_DRHL.jpg";
        var downloadName = "MBTI_DRHL.jpg";
    }else if(_nowHairType.indexOf('DRHW') != "-1"){
        var downloadImage = "/web/contents/mbti/MBTI_DRHW.jpg";
        var downloadName = "MBTI_DRHW.jpg";
    }else if(_nowHairType.indexOf('DRDL') != "-1"){
        var downloadImage = "/web/contents/mbti/MBTI_DRDL.jpg";
        var downloadName = "MBTI_DRDL.jpg";
    }else if(_nowHairType.indexOf('DRDW') != "-1"){
        var downloadImage = "/web/contents/mbti/MBTI_DRDW.jpg";
        var downloadName = "MBTI_DRDW.jpg";
    }else if(_nowHairType.indexOf('DREL') != "-1"){
        var downloadImage = "/web/contents/mbti/MBTI_DREL.jpg";
        var downloadName = "MBTI_DREL.jpg";
    }else if(_nowHairType.indexOf('DREW') != "-1"){
        var downloadImage = "/web/contents/mbti/MBTI_DREW.jpg";
        var downloadName = "MBTI_DREW.jpg";
    }

   



    $("#captureWrap").addClass("ajaxOn");
    $(".ajaxOn .survey_bg_img").attr("id","testtest"); 
    $("#contents > #survey_result .detail_02.linear").append('<div class="share"><div class="shareTit">헤어타입 공유하기</div><div class="container-share"><a id="kakaotalk-sharing-btn" href="javascript:kakaoShare()"><svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_621_7639)"><path d="M40 80C62.0914 80 80 62.0914 80 40C80 17.9086 62.0914 0 40 0C17.9086 0 0 17.9086 0 40C0 62.0914 17.9086 80 40 80Z" fill="#F7E600"></path><path d="M39.7218 19.4209C27.3506 19.4209 17.3218 27.3492 17.3218 37.1292C17.3218 43.4948 21.5712 49.0749 27.9488 52.196C27.4801 53.9448 26.2522 58.5323 26.0069 59.5136C25.7023 60.732 26.452 60.7164 26.9441 60.3884C27.3292 60.1316 33.0815 56.2202 35.5642 54.5318C36.9116 54.7318 38.301 54.8375 39.7218 54.8375C52.093 54.8375 62.1218 46.9093 62.1218 37.1292C62.1218 27.3492 52.093 19.4209 39.7218 19.4209Z" fill="#3A1D1D"></path><path d="M31.3151 33.2725C29.6807 33.2725 24.2144 33.2732 24.2144 33.2732C22.8455 33.2753 22.849 35.5604 24.2179 35.5583H26.5527C26.5527 35.5583 26.5669 41.9247 26.5549 43.4189C26.5585 44.5089 28.9835 44.501 28.9799 43.411L28.9906 35.5613C28.9906 35.5613 29.7728 35.5604 31.3137 35.5613C32.7657 35.5621 32.7671 33.2733 31.3151 33.2725Z" fill="#F7E600"></path><path d="M36.785 33.9738C36.435 33.2262 34.4388 32.8682 33.9365 33.9738C33.3617 35.239 31.2869 41.2142 30.5978 42.7994C30.0999 43.9446 32.2479 44.8785 32.7458 43.7333L33.2127 42.0989L37.4854 42.0992C37.4854 42.0992 37.3385 42.1667 37.9057 43.6632C38.365 44.8752 40.583 44.0347 40.1237 42.8227C39.4676 41.0914 37.1985 34.8575 36.785 33.9738ZM33.9832 39.9509L35.3919 35.8806L36.6916 39.9509H33.9832Z" fill="#F7E600"></path><path d="M46.562 41.8773C45.4647 41.8773 43.4626 41.8656 43.4626 41.8656C43.4626 41.8656 43.4718 35.8127 43.4684 34.3417C43.4651 32.9161 40.9377 32.9219 40.941 34.3476C40.9457 36.3788 40.9527 42.9221 40.9527 42.9221C40.9527 42.9221 40.7659 44.2237 41.8808 44.2237C42.9956 44.2237 45.4705 44.2121 46.5679 44.2121C47.6652 44.2121 47.6594 41.8773 46.562 41.8773Z" fill="#F7E600"></path><path d="M56.0664 42.5464L52.7977 38.2426C52.7977 38.2426 55.0167 35.8425 55.8913 34.9739C56.402 34.4667 54.8217 32.8756 54.3111 33.3828C53.8167 33.8738 50.3423 37.3524 50.3423 37.3524C50.3423 37.3524 50.3734 35.168 50.3409 33.9602C50.3153 33.0119 47.9323 33.0761 47.9579 34.0244C47.9819 34.9152 47.9292 42.9666 47.9297 43.5639C47.9305 44.505 50.3275 44.5031 50.3267 43.562C50.3259 42.4685 50.3267 40.3945 50.3267 40.3945L51.0311 39.8302L54.1091 44.029C54.731 44.85 56.6884 43.3674 56.0664 42.5464Z" fill="#F7E600"></path></g><defs><clipPath id="clip0_621_7639"><rect width="80" height="80" fill="white"></rect></clipPath></defs></svg></a><a class="capture-btn" href="#none"><img src="/web/contents/mbti/down1.svg"></a></div></div>');
    $("#captureWrap").append('<a href="#none" class="captureClose"><img src="/web/upload/mynomy/kr_mobile/layout/close_slide.svg" alt="닫기"></a>');
	console.log(downloadImage);
    $(".capture-btn").click(function(){
        
     

        $(".layer_shadow").addClass("on");
        $("#captureWrap").removeClass("displaynone");
        
          $(".nowType").attr("src", downloadImage);

    });


    $(".captureClose,.layer_shadow").click(function(){
        $(".layer_shadow").removeClass("on");
        $("#captureWrap").addClass("displaynone");

    });
    
    
    
     


   
});



function textChange(selector, callback) {
    var input = $(selector);
    var oldvalue = input.css("visibility");
    setInterval(function(){
        if (input.css("visibility")!=oldvalue){
            oldvalue = input.css("visibility");
            callback();
        }
    }, 100);
}

function textChange2(selector, callback) {
    var input = $(selector);
    var oldvalue = input.hasClass("ajaxOn");
    setInterval(function(){
        if (input.hasClass("ajaxOn")!=oldvalue){
            oldvalue = input.hasClass("ajaxOn");
            callback();
        }
    }, 100);
}


