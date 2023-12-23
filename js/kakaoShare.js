Kakao.init('c849cafb84900f4883215fd905ecfa5d');


function kakaoShare() {
    var linkUrl = "https://3waau.com/survey?product_no=13"; //url
    var sharetitle = jQuery(".detail_02 .title h3").text();
    var _nowHairTypeKakao = $("#survey_osdl_text_top").text();

    if(_nowHairTypeKakao.indexOf('NSHW') != "-1"){
        var shareimg = "https://3waau.com/web/contents/mbti/MBTI_NSHW.jpg";
    }else if(_nowHairTypeKakao.indexOf('OSHL') != "-1"){
        var shareimg = "https://3waau.com/web/contents/mbti/MBTI_OSHL.jpg";
    }else if(_nowHairTypeKakao.indexOf('OSHW') != "-1"){
        var shareimg = "https://3waau.com/web/contents/mbti/MBTI_OSHW.jpg";
    }else if(_nowHairTypeKakao.indexOf('OSDL') != "-1"){
        var shareimg = "https://3waau.com/web/contents/mbti/MBTI_OSDL.jpg";
    }else if(_nowHairTypeKakao.indexOf('OSDW') != "-1"){
        var shareimg = "https://3waau.com/web/contents/mbti/MBTI_OSDW.jpg";
    }else if(_nowHairTypeKakao.indexOf('OSEL') != "-1"){
        var shareimg = "https://3waau.com/web/contents/mbti/MBTI_OSEL.jpg";
    }else if(_nowHairTypeKakao.indexOf('OSEW') != "-1"){
        var shareimg = "https://3waau.com/web/contents/mbti/MBTI_OSEW.jpg";
    }else if(_nowHairTypeKakao.indexOf('ORHL') != "-1"){
        var shareimg = "https://3waau.com/web/contents/mbti/MBTI_ORHL.jpg";
    }else if(_nowHairTypeKakao.indexOf('ORHW') != "-1"){
        var shareimg = "https://3waau.com/web/contents/mbti/MBTI_ORHW.jpg";
    }else if(_nowHairTypeKakao.indexOf('ORDL') != "-1"){
        var shareimg = "https://3waau.com/web/contents/mbti/MBTI_ORDL.jpg";
    }else if(_nowHairTypeKakao.indexOf('ORDW') != "-1"){
        var shareimg = "https://3waau.com/web/contents/mbti/MBTI_ORDW.jpg";
    }else if(_nowHairTypeKakao.indexOf('OREL') != "-1"){
        var shareimg = "https://3waau.com/web/contents/mbti/MBTI_OREL.jpg";
    }else if(_nowHairTypeKakao.indexOf('OREW') != "-1"){
        var shareimg = "https://3waau.com/web/contents/mbti/MBTI_OREW.jpg";
    }else if(_nowHairTypeKakao.indexOf('NSHL') != "-1"){
        var shareimg = "https://3waau.com/web/contents/mbti/MBTI_NSHL.jpg";
    }else if(_nowHairTypeKakao.indexOf('NSDL') != "-1"){
        var shareimg = "https://3waau.com/web/contents/mbti/MBTI_NSDL.jpg";
    }else if(_nowHairTypeKakao.indexOf('NSDW') != "-1"){
        var shareimg = "https://3waau.com/web/contents/mbti/MBTI_NSDW.jpg";
    }else if(_nowHairTypeKakao.indexOf('NSEL') != "-1"){
        var shareimg = "https://3waau.com/web/contents/mbti/MBTI_NSEL.jpg";
    }else if(_nowHairTypeKakao.indexOf('NSEW') != "-1"){
        var shareimg = "https://3waau.com/web/contents/mbti/MBTI_NSEW.jpg";
    }else if(_nowHairTypeKakao.indexOf('NRHL') != "-1"){
        var shareimg = "https://3waau.com/web/contents/mbti/MBTI_NRHL.jpg";
    }else if(_nowHairTypeKakao.indexOf('NRHW') != "-1"){
        var shareimg = "https://3waau.com/web/contents/mbti/MBTI_NRHW.jpg";
    }else if(_nowHairTypeKakao.indexOf('NRDL') != "-1"){
        var shareimg = "https://3waau.com/web/contents/mbti/MBTI_NRDL.jpg";
    }else if(_nowHairTypeKakao.indexOf('NRDW') != "-1"){
        var shareimg = "https://3waau.com/web/contents/mbti/MBTI_NRDW.jpg";
    }else if(_nowHairTypeKakao.indexOf('NREL') != "-1"){
        var shareimg = "https://3waau.com/web/contents/mbti/MBTI_NREL.jpg";
    }else if(_nowHairTypeKakao.indexOf('NREW') != "-1"){
        var shareimg = "https://3waau.com/web/contents/mbti/MBTI_NREW.jpg";
    }else if(_nowHairTypeKakao.indexOf('DSHL') != "-1"){
        var shareimg = "https://3waau.com/web/contents/mbti/MBTI_DSHL.jpg";
    }else if(_nowHairTypeKakao.indexOf('DSHW') != "-1"){
        var shareimg = "https://3waau.com/web/contents/mbti/MBTI_DSHW.jpg";
    }else if(_nowHairTypeKakao.indexOf('DSDL') != "-1"){
        var shareimg = "https://3waau.com/web/contents/mbti/MBTI_DSDL.jpg";
    }else if(_nowHairTypeKakao.indexOf('DSDW') != "-1"){
        var shareimg = "https://3waau.com/web/contents/mbti/MBTI_DSDW.jpg";
    }else if(_nowHairTypeKakao.indexOf('DSEL') != "-1"){
        var shareimg = "https://3waau.com/web/contents/mbti/MBTI_DSEL.jpg";
    }else if(_nowHairTypeKakao.indexOf('DSEW') != "-1"){
        var shareimg = "https://3waau.com/web/contents/mbti/MBTI_DSEW.jpg";
    }else if(_nowHairTypeKakao.indexOf('DRHL') != "-1"){
        var shareimg = "https://3waau.com/web/contents/mbti/MBTI_DRHL.jpg";
    }else if(_nowHairTypeKakao.indexOf('DRHW') != "-1"){
        var shareimg = "https://3waau.com/web/contents/mbti/MBTI_DRHW.jpg";
    }else if(_nowHairTypeKakao.indexOf('DRDL') != "-1"){
        var shareimg = "https://3waau.com/web/contents/mbti/MBTI_DRDL.jpg";
    }else if(_nowHairTypeKakao.indexOf('DRDW') != "-1"){
        var shareimg = "https://3waau.com/web/contents/mbti/MBTI_DRDW.jpg";
    }else if(_nowHairTypeKakao.indexOf('DREL') != "-1"){
        var shareimg = "https://3waau.com/web/contents/mbti/MBTI_DREL.jpg";
    }else if(_nowHairTypeKakao.indexOf('DREW') != "-1"){
        var shareimg = "https://3waau.com/web/contents/mbti/MBTI_DREW.jpg";
    }

    Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
            title: "쓰리와우와 함께하는 1:1 맞춤 케어",
            description: '헤어MBTI 확인하고 나만의 레시피 추천받기!',
            imageUrl:shareimg,
            link: {
                mobileWebUrl: linkUrl,
                webUrl: linkUrl
            }
        },
        buttons: [
            {
                title: '내 헤어MBTI는?',
                link: {
                    mobileWebUrl: linkUrl,
                    webUrl: linkUrl
                }
            },
        ]
    });
}
