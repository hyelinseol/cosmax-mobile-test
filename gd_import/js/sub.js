$(function(){
    //랜덤박스
    setInterval(function()
    {
        $(".re_product_detail .sec05 .right .random ul li").find("a").removeClass("on");
        var count_pdon = 0;
        $(".re_product_detail .sec05 .right .random ul li").each(function(){
            if( Math.random()*10 > 7 && count_pdon < 5 ){
                $(this).find("a").addClass("on");
                count_pdon++;
            }
        });
        $(".re_product_detail .sec05 .right .random ul li").each(function(){
            if( $(this).hasClass("on") === false && Math.random()*10 > 5 && count_pdon < 5 ){
                $(this).find("a").addClass("on");
                count_pdon++;
            }
        });
    }, 2000 );



    //상단슬라이드

	if ($("meta[name=path_role]").attr('content') == 'PRODUCT_DETAIL')
	{
		var _productId = $('meta[property="product:productId"]').attr('content');
		console.log("_productId ==> ", _productId);

		if (_productId == null)
		{
			if (iProductNo != null)
			{
				_productId = iProductNo;
			}
		} 
		console.log("_productId 112 ==> ", _productId);

		if (_productId == '11' || _productId == '12' || _productId == '13' || _productId == '15' || _productId == '17')
		{
			if (_productId == '11')
			{
				var _Html = '<div class="swiper-slide"><img src="/web/upload/mynomy/kr_mobile/prd/shampoo/1.jpg" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr_mobile/prd/shampoo/2.jpg" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr_mobile/prd/shampoo/3.jpg" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr_mobile/prd/shampoo/4.jpg" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr_mobile/prd/shampoo/5.jpg" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr_mobile/prd/shampoo/6.jpg" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr_mobile/prd/shampoo/7.jpg" /></div>';
			}
			else if (_productId == '12')
			{
				var _Html = '<div class="swiper-slide"><img src="/web/upload/mynomy/kr_mobile/prd/treatment/1.jpg" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr_mobile/prd/treatment/2.jpg" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr_mobile/prd/treatment/3.jpg" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr_mobile/prd/treatment/4.jpg" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr_mobile/prd/treatment/5.jpg" /></div>';
			}
			else if (_productId == '13')
			{
				var _Html = '<div class="swiper-slide"><img src="/web/upload/mynomy/kr_mobile/prd/set/1.jpg" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr_mobile/prd/set/2.jpg" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr_mobile/prd/set/3.jpg" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr_mobile/prd/set/4.jpg" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr_mobile/prd/set/5.jpg" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr_mobile/prd/set/6.jpg" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr_mobile/prd/set/7.jpg" /></div>';
			}
			else if (_productId == '15' || _productId == '17')
			{
				var _Html = '<div class="swiper-slide"><img src="/web/upload/mynomy/kr_mobile/prd/essence/prd_essence01.png" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr_mobile/prd/essence/prd_essence02.png" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr_mobile/prd/essence/prd_essence03.png" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr_mobile/prd/essence/prd_essence04.png" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr_mobile/prd/essence/prd_essence05.png" /></div>';
			}
			$('#big-swiper-wrapper').empty();
			$('#big-swiper-wrapper').html(_Html);
		}

		if (_productId == '13' || _productId == '14' || _productId == '15')
		{
			if (_productId == '14')
			{
				var _Html = '<img src="/web/upload/mynomy/kr/layout/emblem_04.svg" alt="쓰리와우 품평단 재구매의사 99.5%">';
			}
			else if (_productId == '15')
			{
				var _Html = '';
			}
			else if (_productId == '13')
			{
				var _Html = '<img src="/web/upload/mynomy/kr/layout/emblem_04.svg" alt="쓰리와우 품평단 재구매의사 99.5%">';
			}
			$('#emblem').empty();
			$('#emblem').html(_Html);
		}

		if (_productId == '13' || _productId == '14' || _productId == '15')
		{
			if (_productId == '14')
			{
				var _Html = '<img src="/web/upload/mynomy/kr/layout/emblem_glowpick.svg" alt="emblem_glowpick">';
			}
			else if (_productId == '15')
			{
				var _Html = '';
			}
			else if (_productId == '13')
			{
				var _Html = '<img src="/web/upload/mynomy/kr/layout/emblem_glowpick.svg" alt="emblem_glowpick">';
			}
			$('#glowemblem').empty();
			$('#glowemblem').html(_Html);
		}
	}


    let bigImgslide = new Swiper('.big_img',{
		autoplay: { delay: 4000, disableOnInteraction: false },
		speed: 800,
		loop: true,
		effect: 'fade',
		/*
		navigation: {
			nextEl: '.keyvisual_main .arrow-next',
			prevEl: '.keyvisual_main .arrow-prev',
		},*/
		pagination: {
			el: '.big_img .pagination',
			type: 'bullets',
		}
	});
    //system_slide
    let sysImgslide = new Swiper('.system_slide',{
		autoplay: { delay: 4000, disableOnInteraction: false },
		speed: 800,
		loop: true,
		effect: 'fade',
		/*
		navigation: {
			nextEl: '.keyvisual_main .arrow-next',
			prevEl: '.keyvisual_main .arrow-prev',
		},*/
		pagination: {
			el: '.system_slide .pagination',
			type: 'bullets',
		}
	});

    //슬라이드
    var slide_wrap = new Swiper('.typeSlide', {
        speed: 600,
        slidesPerView: 'auto',
        slidesOffsetBefore : 20,
        slidesOffsetAfter : 20,
        spaceBetween: 16,
        centeredSlides: false,
        parallax: true,
        observer: true,
        observeParents: true,
        loop: false,
        watchOverflow : true,
    });

    //더 많은 성분보기
	$(".re_product_detail .sec08 .ingredient_wrap .ingredient_plus .btn_more a").click(function(){
        $(this).toggleClass("on");
		$(".ingredient_plus ul.add").slideToggle();
    });

//    $(".re_product_detail .sec08 .ingredient_wrap .ingredient_plus .btn_more a").click(function(){
//        if($(this).hasClass("on")){
//            $(this).removeClass("on");
//            $(this).parents().parents().children("ul").animate( {
//                height: '300px',
//            },2000 );
//        }else{
//            $(this).addClass("on");
//            $(this).parents().parents().children("ul").animate( {
//                height: '100%',
//            },2000 );
//        }
//        return false;
//    });

    //
//    let controller = new ScrollMagic.Controller();
//    let sceneFixed = new ScrollMagic.Scene({
//		triggerElement: '.shampoo .detail_02.linear',
//		duration: '100%',
//		triggerHook : .7
//	})
//	.setPin('.shampoo  .represcription .sec03', {pushFollowers: false})
//	.addTo(controller)
//
//    let controller2 = new ScrollMagic.Controller();
//    let sceneFixed2 = new ScrollMagic.Scene({
//		triggerElement: '.treatment .detail_02.linear',
//		duration: '100%',
//		triggerHook : .7
//	})
//	.setPin('.treatment .represcription .sec03', {pushFollowers: false})
//	.addTo(controller2)

    //조합가능 레시피 수 가리기
//    let controller2 = new ScrollMagic.Controller();
//
//    let sceneFixed3 = new ScrollMagic.Scene({
//		triggerElement: '.re_product_detail .sec02_f',
//		duration: '100%',
//		triggerHook : .7
//	})
//	.setPin('.re_product_detail .sec02', {pushFollowers: false})
//	.addTo(controller2)



});

$(window).scroll(function(){

    //무한대배경 스크롤 움직임
//    if (wScroll > 0){
//        $(".feedback_wrap .feedback_top").addClass("action");
//    } else {
//        $(".feedback_wrap .feedback_top").removeClass("action");
//    }

    //제목효과
    var wScroll = $(this).scrollTop();

    if(wScroll >=$('.re_product_detail .sec01').offset().top - $(window).height()/2){
        $('.re_product_detail .sec01 .txt span').addClass('show');
        $('.re_product_detail .sec01 .txt strong').addClass('show');
        $('.re_product_detail .sec01 .txt .effect').addClass('show');
    }


    if(wScroll >=$('.re_product_detail .sec02').offset().top - $(window).height()/3  ){
        $('.re_product_detail .sec02 .img').addClass('show');
        $('.re_product_detail .sec02 .fixed_wrap .img_fixed').addClass('show');
        var numberCount= 12600000;
        $(".re_product_detail .sec02 .img_fixed p").addClass('number');
        if( $(".re_product_detail .sec02 .img_fixed p").hasClass('number') && wScroll < 1550 ){
           //숫자 카운팅

            $({ val : 0 }).animate({ val : numberCount }, {
                duration: 2000,
                step: function() {
                    var num = numberWithCommas(Math.floor(this.val));
                    $(".number").text(num);
                },
                complete: function() {
                    var num = numberWithCommas(Math.floor(this.val));
                    $(".number").text(num);
                }
            });

            //3자리마다 , 찍기
            function numberWithCommas(x) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
        }

    }
    if(wScroll >=$('.re_product_detail .sec03').offset().top - $(window).height()/2){
        $( '.re_product_detail .sec03 .tit').addClass('show');
        $( '.re_product_detail .sec03 .list ul li').addClass('show');
    }
    if(wScroll >=$('.re_product_detail .sec04').offset().top - $(window).height()/2){
        $( '.re_product_detail .sec04 .tit').addClass('show');
        $( '.re_product_detail .sec04 .txt').addClass('show');
    }

    if(wScroll >=$('.re_product_detail .sec05').offset().top - $(window).height()/2){
        $( '.re_product_detail .sec05 .c_tit').addClass('show');
        $( '.re_product_detail .sec05 .tit').addClass('show');
        $( '.re_product_detail .sec05 .txt > p').addClass('show');
        $( '.re_product_detail .sec05 .txt .sec05_list').addClass('show');
        $( '.re_product_detail .sec05 .txt > strong').addClass('show');
        $( '.re_product_detail .sec05 .right .random').addClass('show');
    }

//    if(wScroll >=$('.re_product_detail .sec06').offset().top - $(window).height()/2){
//        $( '.re_product_detail .sec06 .tit').addClass('show');
//        $( '.re_product_detail .sec06 .barArea').addClass('show');
//        //성분바
//        if( $(".re_product_detail .sec06 .barArea").hasClass("show") ){
//            var elem = document.getElementById("myBar");
//            var width = 1;
//            var id = setInterval(frame, 10);
//            function frame() {
//                if (width >= 80) {
//                  clearInterval(id);
//                } else {
//                  width++;
//                  elem.style.width = width + '%';
//                  elem.innerHTML = width * 1  + '%';
//                }
//            }
//        }
//
//    }

    if(wScroll >=$('.re_product_detail .sec07').offset().top - $(window).height()/2){
        $( '.re_product_detail .sec07 .c_tit').addClass('show');
        $( '.re_product_detail .sec07 .ingredient_list').addClass('show');
    }

    if(wScroll >=$('.re_product_detail .sec09').offset().top - $(window).height()/2){
        $( '.re_product_detail .sec09 .c_tit').addClass('show');
    }
    if(wScroll >=$('.re_product_detail .sec10').offset().top - $(window).height()/2){
        $( '.re_product_detail .sec10 .c_tit').addClass('show');
        $( '.re_product_detail .sec10 .process_list ul li').addClass('show');
    }

	if(wScroll >=$('.re_product_detail .sec11').offset().top - $(window).height()/2){
        $( '.re_product_detail .sec11 .c_tit').addClass('show');
    }

    if(wScroll >=$('.re_product_detail .sec14').offset().top - $(window).height()/2){
        $( '.re_product_detail .sec14 .tit').addClass('show');
        $( '.re_product_detail .sec14 .system_slide').addClass('show');
        $( '.re_product_detail .sec14 .txt').addClass('show');
    }


//	// s : 시원하게 / 부드럽게 비율 실시간 표시
//	setInterval(function(){
//		var w1 = parseInt($('.product_sec.sec06 .bar').css('width'));
//		var w2 = parseInt($('.product_sec.sec06 .bar .progress').css('width'));
//		var w3 = Math.round( w2 / w1 * 100);
//		$('#myBar').text( w3 + '%');
//		$('#myBar02').text( (100-w3) + '%');
//	}, 100);
//	// e : 시원하게 / 부드럽게 비율 실시간 표시


});

$(function() {
    /*
	$(".forYou").click(function() {
		$(".fixed-box").addClass("active");
		$(".fixed-btn").hide();
	});

	$(".btn-close").click(function() {
		$(".fixed-btn").show();
	});
    */
});

/* 진단 전 상세 Anchor */
function fnMove(seq)
{
	var offset = $("#" + seq).offset();
	$('html, body').animate({scrollTop : offset.top}, 400);
}