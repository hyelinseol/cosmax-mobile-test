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

	//버튼고정
	fixedButton();
	$(window).on('scroll', function(){ fixedButton(); });
	$('.cmn-btn-box').clone().appendTo('#layoutMain').addClass('fixed');
	function fixedButton(){
		if($(window).scrollTop() > $('.keyvisual_main').height()){
			$('.cmn-btn-box.fixed').addClass('active');
			if($(window).scrollTop() > $('#footer').offset().top - $(window).height()){
				$('.cmn-btn-box.fixed').removeClass('active');
			}
		} else {
			$('.cmn-btn-box.fixed').removeClass('active');
		}
	}

	let prdRolling = new Swiper('.section01 .section-wrap .slide-wrap',{
		//autoplay: { delay: 600, disableOnInteraction: false },
		speed: 1000,
		loop: false,
		effect: 'slide',
		loopAdditionalSlides: 1,
		slidesPerView: 'auto',
		spaceBetween: 14
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
					$('.section03 article .action01 .list-wrap .list-line').eq(i).find('.list').eq(list[i]).addClass('active').siblings().removeClass('active');
				}
			}
		}
	});

	let review = new Swiper('.section05 .review-wrap',{
		autoplay: { delay: 2000, disableOnInteraction: false },
		speed: 800,
		loop: true,
		effect: 'slide',
		spaceBetween: 10
	});

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
		let ss = $(window).width() - 40;
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

	var tweenTxt = new TimelineMax()
	.to('.section02 .txt01', 1, {opacity: '0'} )
	.to('.section02 .txt02', 1, {opacity: '1'} )
	let txt1 = new ScrollMagic.Scene({
		triggerElement : '.section02',
		duration: 100,
		triggerHook: .4
	})	
	.setTween(tweenTxt)
	.addTo(controller)
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
	/*
	var timeLine = new TimelineMax({repeat: -1});
	timeLine.to('.section03 article .action01 .img-top .img-wrap .img:nth-of-type(1)', 2, { opacity: '1' })
		.to('.section03 article .action01 .img-top .img-wrap .img:nth-of-type(2)', 2, { opacity: '1' })
		.to('.section03 article .action01 .img-top .img-wrap .img:nth-of-type(3)', 2, { opacity: '1' })
	*/
    

    
    //피드백루프 수직 롤링
    var feedbackSlide = new Swiper('.up .feedback_slide', {
        direction: "horizontal",
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 20,
        speed : 1500,
        autoplay: {     
            delay: 2000, 
            disableOnInteraction: true,
        },
        loop : true,
        breakpoints: {
        
          320: {
            slidesPerView: 1, 
            spaceBetween: 20,
          },
          500: {
            slidesPerView: 'auto', 
            spaceBetween: 20,
          },
        }
    });
    
    var feedbackSlide2 = new Swiper('.down .feedback_slide', {
        direction: "horizontal",
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
        breakpoints: {
        
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          500: {
            slidesPerView: 'auto', 
            spaceBetween: 20,
          },
        }
    });
    
    $('.feedback_wrap .feedback_top .intro').addClass('show');
	
});

$(window).scroll(function(){
     
    //진단내역 바로가기
    var bannerTop = $(".feedback_wrap .sec06").offset();
    var wScroll = $(this).scrollTop();

    if (wScroll <= bannerTop.top){
        $(".feedback_wrap .fixed-box").addClass("fix");
        $(".feedback_wrap .fixed-box").css("display","block");
    } else {
        $(".feedback_wrap .fixed-box").removeClass("fix");
        $(".feedback_wrap .fixed-box").css("display","none");
        
    }
    
    //무한대배경 스크롤 움직임
    if (wScroll > 0){
        $(".feedback_wrap .feedback_top").addClass("action");
    } else {
        $(".feedback_wrap .feedback_top").removeClass("action");
    }
    
    //제목효과
    if(wScroll >=0){
        $('.feedback_wrap .feedback_top .intro').addClass('show');
        $('.feedback_wrap .feedback_section.sec01 .txt').addClass('show');
    }
    if(wScroll >=$('.feedback_wrap .sec02').offset().top - $(window).height()){
        $('.feedback_wrap .feedback_section.sec02 .txt').addClass('show');
    }
    if(wScroll >=$('.feedback_wrap .sec03').offset().top - $(window).height()){
        $('.feedback_wrap .feedback_section.sec03 .title').addClass('show');
    }
    if(wScroll >=$('.feedback_wrap .sec04').offset().top - $(window).height()){
        $('.feedback_wrap .feedback_section.sec04 .title').addClass('show');
    }
    if(wScroll >=$('.feedback_wrap .sec06').offset().top - $(window).height()){
        $('.feedback_wrap .feedback_section.sec06 .title').addClass('show');
        $('.feedback_wrap .feedback_section.sec06 .cont_box .cont').addClass('show');
    }
    if(wScroll >=$('.feedback_wrap .bot_banner').offset().top - $(window).height()){
        $('.feedback_wrap .bot_banner .inner').addClass('show');
    }
    
});