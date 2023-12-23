$(function(){


	//scroll animation
	let controller = new ScrollMagic.Controller();

	let staggerElement = $('.line-wrap');
	for(let i=0; i<staggerElement.length; i++){
		let sceneH = new ScrollMagic.Scene({
			triggerElement : staggerElement[i],
			triggerHook : .9,
			reverse: false
		})	
		.setClassToggle(staggerElement[i], 'active')
		.addTo(controller)
		//.addIndicators();
	}

	let symbolElement = $('.line-wrap .line-v .symbol');
	for(let i=0; i<symbolElement.length; i++){
		let tween = gsap.to(symbolElement[i], 100, { rotate: '-45deg' });
		let sceneV = new ScrollMagic.Scene({
			triggerElement : symbolElement[i],
			duration: '100%',
			triggerHook : .9
		})	
		.setTween(tween)
		.addTo(controller)
		//.addIndicators();
	}

	let sceneFixed = new ScrollMagic.Scene({
		triggerElement: '.content-footer',
		duration: '100%',
		triggerHook : .7
	})
	.setPin('.content-header', {pushFollowers: false})
	.addTo(controller)
	//.addIndicators({name: "setSpin"});

	scaleSize();
	$(window).on('load scroll resize', function(){ scaleSize(); });
	function scaleSize(){
		let ss = $(window).width() - 160;
			ss = ss/$(window).width()*100;
		$('html .zoom').css('transform', '');
		$('html.footer-active .zoom.active').css('transform', 'scale('+ss+'%)');
	}
	
	let footer = '#footer';
	let sceneFooter = new ScrollMagic.Scene({
		triggerElement : footer,
		triggerHook : .8
	})	
	.setClassToggle('html', 'footer-active')
	.addTo(controller)
	//.addIndicators();


	//action01
	/*
	var timeLine = new TimelineMax({repeat: -1});
	timeLine.to('.section03 article .action01 .img-top .img-wrap .img:nth-of-type(1)', 2, { opacity: '1' })
		.to('.section03 article .action01 .img-top .img-wrap .img:nth-of-type(2)', 2, { opacity: '1' })
		.to('.section03 article .action01 .img-top .img-wrap .img:nth-of-type(3)', 2, { opacity: '1' })
	*/
    
    //피드백루프 회전
//    var feedbackRotation = new Swiper('.img_rotation', {
//        direction: "horizontal",
//        effect : 'fade',
//        //slidesPerView: 'auto',
//        //centeredSlides: true,
//        //spaceBetween: 24,
//        speed : 1500,
//        autoplay: {     
//            delay: 2500, 
//            disableOnInteraction: true,
//        },
//        loop : true,
//    });
    
    //피드백루프 수직 롤링
    var feedbackSlide = new Swiper('.up .feedback_slide', {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 24,
        speed : 1500,
        autoplay: {     
            delay: 2000, 
            disableOnInteraction: true,
        },
        loop : true
    });
    
    var feedbackSlide2 = new Swiper('.down .feedback_slide', {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 24,  
        speed : 1500,
        autoplay: {     
            delay: 2000,
            disableOnInteraction: true,
            reverseDirection:true,
        },
        loop : true
    });
    
    $('.feedback_wrap .feedback_top .intro').addClass('show');
    $('.feedback_wrap .feedback_section.sec01 .txt').addClass('show');
    
    //footer 글씨 흘러가기
    $('.ticker-wrap .ticker').each(function(){
			$(this).clone().appendTo($(this).parent());
		});
		$('.ticker-wrap').each(function(){
			$(this).find('.ticker').eq(0).addClass('first');
			$(this).find('.ticker').eq(1).addClass('second');
		});
		$('.ticker-wrap').each(function(){
			var _this = $(this);
			var num = 0;
			var timer = setInterval(ticker, 20);
			var textWidth = _this.find('.ticker.first').width();
			function ticker(){
				num = num+1;
				_this.find('.ticker.first').css('transform', 'translateX(-'+num+'px)');
				_this.find('.ticker.second').css('transform', 'translateX(-'+num+'px)');
				if(num > textWidth){
					_this.find('.ticker.first').css('transform', 'translateX('+textWidth+'px)');
					_this.find('.ticker.second').css('transform', 'translateX('+textWidth+'px)');
					clearInterval(timer);
					num = 0;
					timer = setInterval(ticker, 20);
				}
			}
		});
    
    //메인 리뷰슬라이드
    var reviewSlide = new Swiper('.right .review_slide', {
        direction: "horizontal",
        //height: 600,
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 20,
        speed : 1500,
        autoplay: {     
            delay: 2000, 
            disableOnInteraction: true,
        },
        loop : true,
    });
    
    var reviewSlide2 = new Swiper('.left .review_slide', {
        direction: "horizontal",
        //height: 600,
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 20,
        speed : 1500,
        autoplay: {     
            delay: 2000, 
            disableOnInteraction: true,
            reverseDirection:true,
        },
        loop : true,
    });
    
    //무한대배경 스크롤 움직임
    $(".feedback_wrap .feedback_top").addClass("action");
    
    
    
	
});

$(window).scroll(function(){
    
    //진단내역 바로가기
    var wScroll = $(this).scrollTop();

    if (wScroll <= $(".feedback_wrap .sec06").offset().top){
        $(".feedback_wrap .fixed-box").addClass("fix");
        $(".feedback_wrap .fixed-box").css("display","block");
    } else {
        $(".feedback_wrap .fixed-box").removeClass("fix");
        $(".feedback_wrap .fixed-box").css("display","none");
    }
    
    //제목효과
    if(wScroll >=0){
        $('.feedback_wrap .feedback_top .intro').addClass('show');
        $('.feedback_wrap .feedback_section.sec01 .txt').addClass('show');
    }
    if(wScroll >=$('.feedback_wrap .sec02').offset().top - $(window).height()/1){
        $('.feedback_wrap .feedback_section.sec02 .txt').addClass('show');
    }
    if(wScroll >=$('.feedback_wrap .sec03').offset().top - $(window).height()/2){
        $('.feedback_wrap .feedback_section.sec03 .title').addClass('show');
    }
    if(wScroll >=$('.feedback_wrap .sec04').offset().top - $(window).height()/2){
        $('.feedback_wrap .feedback_section.sec04 .title').addClass('show');
    }
    if(wScroll >=$('.feedback_wrap .sec06').offset().top - $(window).height()/2){
        $('.feedback_wrap .feedback_section.sec06 .title').addClass('show');
        $('.feedback_wrap .feedback_section.sec06 .cont_box .cont').addClass('show');
    }
    if(wScroll >=$('.feedback_wrap .bot_banner').offset().top - $(window).height()/2){
        $('.feedback_wrap .bot_banner .inner').addClass('show');
    }
    
});