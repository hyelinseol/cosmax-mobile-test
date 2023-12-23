$(document).ready(function(){
	// main visual
	var swiper = new Swiper(".keyvisual_main", {
		effect: 'fade',
		speed: 800,
		loop: true,
		
		autoplay: {
			delay: 4000,
			disableOnInteraction: false,
		},
		loopAdditionalSlides: 1,
		slidesPerView: 1,
        spaceBetween: 0,
		pagination: {
			el: '.keyvisual_main .pagination',
			type: 'bullets',
		},
	});

	// main prdRolling
	var swiper = new Swiper(".prdRolling", {
		slidesPerView: 1.3,
		centeredSlides: true,
        spaceBetween: 12,
		loop: true,
	});
});


$(function(){

    let controller = new ScrollMagic.Controller();
    
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

  
    
    //메인 헤더
    $("#main #header .header h1 img").attr('src','/web/upload/mynomy/kr_mobile/main/relogo_w.svg');
    $("#main #header .cart_button img").attr('src','/web/upload/mynomy/kr/layout/ico_recart_w.svg');
    

});

$(window).scroll(function(){
    
    
    var wScroll = $(this).scrollTop();
    
    if(wScroll >= 0 ){
        $("#header .header h1 img").attr('src','/web/upload/mynomy/kr_mobile/main/relogo.svg');
        $("#header .cart_button img").attr('src','/web/upload/mynomy/kr_mobile/layout/ico_recart.svg');
//        $('#main #header .header').css('background','#FFF');
		$('#main #header .header').addClass('headerWhite');
        $('#main .back_button span').css('background','#0b0a0a');
        $('#main .menu_button span').css('background','#0b0a0a');
    }
    
    if(wScroll < 94 ){
        $("#header .header h1 img").attr('src','/web/upload/mynomy/kr_mobile/main/relogo_w.svg');
        $("#header .cart_button img").attr('src','/web/upload/mynomy/kr_mobile/layout/ico_recart_w.svg');
//        $('#main #header .header').css('background','none');
		$('#main #header .header').removeClass('headerWhite');
        $('#main .back_button span').css('background','#fff');
        $('#main .menu_button span').css('background','#fff');
    }
    if(wScroll < $('#layoutMain .txtNavi').offset().top){
        $('#layoutMain .fixed-box').removeClass('fix');
    }
    
    if(wScroll >=$('#layoutMain .txtNavi').offset().top - $(window).height()/2){
        $('#layoutMain .fixed-box').addClass('fix');
    }

    if(wScroll >=$('#layoutMain .mainFixSec').offset().top - $(window).height()/5.0){
        $('#layoutMain .mainFixSec .mentBox').addClass('on');
    } else {
		$('#layoutMain .mainFixSec .mentBox').removeClass('on');
	}

	if(wScroll >=$('#layoutMain .conDiff').offset().top - $(window).height()/1.5){
        $('#layoutMain .conDiff .perDiff').addClass('show');
    } else {
		$('#layoutMain .conDiff .perDiff').removeClass('show');
	}
    
});

$(function() {
	$(".bnrClose").click(function() {
		$("#contents").css({'margin-top':'0'});
	});
});

//////////////////////// 230417 추가

$(document).ready(function(){
	// main review
	var swiper = new Swiper(".mainReviewList", {
		speed: 6000,
		loop: true,
		autoplay: {
			delay: 0,
			disableOnInteraction: false,
		},
		loopAdditionalSlides: 1,
		slidesPerView: 'auto',
        spaceBetween: 12,
//		freeMode: true,
	});

	// main event
	var swiper = new Swiper(".mainEventRolling", {
		speed: 1000,
		loop: true,
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		loopAdditionalSlides: 1,
		slidesPerView: 1,
        spaceBetween: 12,
		centeredSlides: true,
		navigation: {
			nextEl: '.event-next', 
			prevEl: '.event-prev', 
		},
	});

	// main slide TXT
	var swiper = new Swiper('.txtNavi .swiper-container', {
		spaceBetween: 5,
		centeredSlides: true,
		speed: 20000,
		autoplay: {
			delay: 0,
			},
		loop: true,
		slidesPerView:'auto',
		allowTouchMove: false,
		disableOnInteraction: true,
	});
});

// 100vh 구하기
function setScreenSize() {
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setScreenSize();
window.addEventListener('resize', setScreenSize);

// 메인 상단 스크립트 231117
$(function() {
	$('a.openCustom').click(function() {
	  $(".viewCustomLine").addClass("on");
	});

	$('.backBlur').click(function() {
	  $(".viewCustomLine").removeClass("on");
	});
});

/* vimeo control
$(document).ready(function() {
	var vimeoPlayerId = 'moIntro';

	$('a.openCustom').click(function() {
	  // Vimeo 영상 멈추기
	  $('#' + vimeoPlayerId)[0].contentWindow.postMessage('{"method":"pause"}', '*');
	  $(".viewCustomLine").addClass("on");
	});

	$('.backBlur').click(function() {
	  // Vimeo 영상 재생
	  $('#' + vimeoPlayerId)[0].contentWindow.postMessage('{"method":"play"}', '*');
	  $(".viewCustomLine").removeClass("on");
	});
});
*/