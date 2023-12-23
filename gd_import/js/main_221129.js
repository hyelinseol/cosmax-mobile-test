$(function(){
	//키비주얼(메인슬라이드)
	let keyvisualMain = new Swiper('.keyvisual_main',{
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
			el: '.keyvisual_main .pagination',
			type: 'bullets',
		}
	});

	//텍스트롤링
	let txtWidth = 0;
	$('.section02 .cmn-txt .toggle-txt .slide-wrap .slide-box .swiper-slide span').each(function(){
		let w = $(this).width();
		if(txtWidth < w){
			txtWidth = w;
		}
	});	
	$('.section02 .cmn-txt .toggle-txt .slide-wrap').css('width', txtWidth);
	let txtRolling = new Swiper('.txt-slide',{
		autoplay: { delay: 600, disableOnInteraction: false },
		speed: 1000,
		loop: true,
		effect: 'slide',
		direction: 'vertical',
		loopAdditionalSlides: 1,
		simulateTouch: false
	});

	let action01 = new Swiper('.section03 article .action01 .img-top .img-wrap',{
		autoplay: { delay: 3000, disableOnInteraction: false },
		speed: 800,
		loop: true,
		effect: 'fade',
		fadeEffect: {
			crossFade: true
		},
		simulateTouch: false,
		on: {
			slideChangeTransitionStart: function(){
				//console.log(this.realIndex);
				let list = $('.section03 article .action01 .img-top .img-wrap .swiper-slide figure').eq(this.activeIndex).data('item').split(',');
				for(var i=0;i < list.length; i++){
					let tx = 25 * list[i];
					//console.log(i);
					$('.section03 article .action01 .list-wrap .list-line').eq(i).find('.list-bg').css('left', tx+'%');
					$('.section03 article .action01 .list-wrap .list-line').eq(i).find('.list-bg').css('backgr', tx+'%');
                    
				}
			}
		}
	});

	var swiper = new Swiper('.section03 .action01 .img-top .bg-img.bg01 .swiper-container', {
		autoplay: { delay: 3000, disableOnInteraction: false },
		speed: 800,
		loop: true,
		effect: 'fade',
		fadeEffect: {
			crossFade: true
		},
		simulateTouch: false,
	});
	
	var swiper2 = new Swiper('.section03 .action01 .img-top .bg-img.bg02 .swiper-container', {
		autoplay: { delay: 3000, disableOnInteraction: false },
		speed: 800,
		loop: true,
		effect: 'fade',
		fadeEffect: {
			crossFade: true
		},
		simulateTouch: false,
	});

	$('.section05 .review-box').height($('.section05 .review-box .item').eq(0).height() + $('.section05 .review-box .item').eq(0).height()/1.5);
	$('.section05 .btn button').on('click', function(){
		$('.section05 .review-box').height('auto').addClass('active');
		$(this).remove();
	});
    
    let controller = new ScrollMagic.Controller();
    
    let sceneFixed2 = new ScrollMagic.Scene({
		triggerElement: '#layoutMain .section03',
		duration: '100%',
		triggerHook : .7
	})
	.setPin('#layoutMain .section02', {pushFollowers: false})
	.addTo(controller)
    
    let sceneFixed = new ScrollMagic.Scene({
		triggerElement: '.content-footer',
		duration: '100%',
		triggerHook : .7
	})
	.setPin('.content-header', {pushFollowers: false})
	.addTo(controller)
    
//    참고용
//    const spyEls = document.querySelectorAll("section.scroll-spy");
//    spyEls.forEach(function (spyEl) {
//      new ScrollMagic.Scene({
//        triggerElement: spyEl, // 보여짐 여부를 감시할 요소 (target)
//        triggerHook: 0.8, // 전체 화면 수직 방향의 80% 지점을 감시 (0 ~ 1)
//      })
//        .setClassToggle(spyEl, "show") // 해당 요소(splEl)가 화면에 보여지면 해당 메소들 실행
//        .addTo(new ScrollMagic.Controller()); // 내부에 컨트롤러에 실제 동작하도록 넣음
//    });

    
    /*

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

	let zoom = '.section05';
	let sceneZoom = new ScrollMagic.Scene({
		triggerElement : zoom,
		triggerHook : .5
	})	
	.setClassToggle('.zoom', 'active')
	.addTo(controller)
	//.addIndicators();
    

//	var tweenTxt = new TimelineMax()
//	.to('.section02 .txt01', 1, {opacity: '0'} )
//	.to('.section02 .txt02', 1, {opacity: '1'} )
//	let txt1 = new ScrollMagic.Scene({
//		triggerElement : '.section02',
//		duration: 200,
//		triggerHook: .3
//	})	
//	.setTween(tweenTxt)
//	.addTo(controller)
	//.addIndicators();

	var hs = new TimelineMax();
	hs.to('.section04 .scroll-wrap ul', 1, {x: '-100%'} )
	let sceneHS = new ScrollMagic.Scene({
		triggerElement : '.section04',
		duration: '40%',
		triggerHook: .2
	})	
	.setTween(hs)
	//.setPin('.section04')
	.addTo(controller)
	//.addIndicators();

	//action01
    */
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
        direction: "vertical",
        height: 600,
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 24,
        speed : 1500,
        autoplay: {     
            delay: 2000, 
            disableOnInteraction: true,
        },
        loop : true,
    });
    
    var feedbackSlide2 = new Swiper('.down .feedback_slide', {
        direction: "vertical",
        height: 600,
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 24,  
        speed : 1500,
        autoplay: {     
            delay: 2000,
            disableOnInteraction: true,
            reverseDirection:true,
        },
        loop : true,
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
        speed : 5000,
        autoplay: {     
            delay: 0, 
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
        speed : 5000,
        autoplay: {     
            delay: 0, 
            disableOnInteraction: true,
            reverseDirection:true,
        },
        loop : true,
    });
    

	
});

$(window).scroll(function(){
    
    
    var wScroll = $(this).scrollTop();
    
    if(wScroll >=$('#layoutMain .section03').offset().top - $(window).height()/2){
        $('#layoutMain .section03 .cmn-txt').addClass('show');
        $("#layoutMain .section03 .bg_rebon").addClass('show');
    }
    if(wScroll >=$('#layoutMain .section03 .article01').offset().top - $(window).height()/2){
        $('#layoutMain .section03 .article01 .txt-wrap').addClass('show');
    }
    if(wScroll >=$('#layoutMain .section03 .article02').offset().top - $(window).height()/2){
        $('#layoutMain .section03 .article02 .txt-wrap').addClass('show');
    }
    if(wScroll >=$('#layoutMain .section03 .article03').offset().top - $(window).height()/2){
        $('#layoutMain .section03 .article03 .txt-wrap').addClass('show');
    }
    if(wScroll >=$('#layoutMain .section04').offset().top - $(window).height()/2){
        $('#layoutMain .section04 .title').addClass('show');
        $('#layoutMain .section04 .desc').addClass('show');
        $('#layoutMain .section04 .scroll-wrap').addClass('show');
    }
    if(wScroll >=$('#layoutMain .section05').offset().top - $(window).height()/2){
        $('#layoutMain .section05 .title').addClass('show');
    }
    if(wScroll >=$('#layoutMain .section06').offset().top - $(window).height()/2){
        $('#layoutMain .section06 .title').addClass('show');
        $('#layoutMain .section06 .feed-list').addClass('show');
    }
    
    
});