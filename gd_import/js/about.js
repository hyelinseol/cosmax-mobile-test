$(function(){
    //스크롤시 텍스트 이동
    let didScroll = false;
    let paralaxTitles = document.querySelectorAll('.paralax-title');

    const scrollInProgress = () => {
      didScroll = true
    }

    const raf = () => {
      if(didScroll) {
        paralaxTitles.forEach((element, index) => {
          element.style.transform = "translateX( -"+ window.scrollY / 20 + "%)"
        })
        didScroll = false;
      }
      requestAnimationFrame(raf);
    }


    requestAnimationFrame(raf);
    window.addEventListener('scroll', scrollInProgress)
    
    
    //
    let didScroll2 = false;
    let paralaxImg = document.querySelectorAll('.paralax-img');

    const scrollInProgress2 = () => {
      didScroll2 = true
    }

    const raf2 = () => {
      if(didScroll2) {
        paralaxImg.forEach((element, index) => {
          element.style.transform = "translateY( -"+ window.scrollY / 30 + "%)"
        })
        didScroll2 = false;
      }
      requestAnimationFrame(raf2);
    }


    requestAnimationFrame(raf2);
    window.addEventListener('scroll', scrollInProgress2)
    
});
$(window).scroll(function(){

    var wScroll = $(this).scrollTop();
    
    //about
    if(wScroll >=$('.about_wrap .sec02').offset().top - $(window).height()/2){
        $( '.about_wrap .sec02 .tit strong').addClass('show');
        $( '.about_wrap .sec02 .tit p').addClass('show');
        $( '.about_wrap .sec02 .right .img').addClass('show');
    }
    if(wScroll >=$('.about_wrap .sec03').offset().top - $(window).height()/2){
        $( '.about_wrap .sec03 .tit').addClass('show');
        $( '.about_wrap .sec03 .about_list ul li').addClass('show');
    }
    
    if(wScroll >=$('.about_wrap .sec04').offset().top - $(window).height()/2){
        $( '.about_wrap .sec04 .tit').addClass('show');
        $( '.about_wrap .sec04 .bg_rebon').addClass('show');
    }
    if(wScroll >=$('.about_wrap .sec04 .beauty_list ul li.beauty_list01').offset().top - $(window).height()/2){
        $(".about_wrap .sec04 .beauty_list ul li.beauty_list01 .txt").addClass('show');
        $(".about_wrap .sec04 .beauty_list ul li.beauty_list01 .img").addClass('show');
    }
    if(wScroll >=$('.about_wrap .sec04 .beauty_list ul li.beauty_list02').offset().top - $(window).height()/2){
        $(".about_wrap .sec04 .beauty_list ul li.beauty_list02 .txt").addClass('show');
        $(".about_wrap .sec04 .beauty_list ul li.beauty_list02 .img").addClass('show');
    }
    if(wScroll >=$('.about_wrap .sec04 .beauty_list ul li.beauty_list03').offset().top - $(window).height()/2){
        $(".about_wrap .sec04 .beauty_list ul li.beauty_list03 .txt").addClass('show');
        $(".about_wrap .sec04 .beauty_list ul li.beauty_list03 .img").addClass('show');
    }
    
    if(wScroll >=$('.about_wrap .sec05').offset().top - $(window).height()/2){
        $(".about_wrap .sec05 .tit").addClass('show');
        $(".about_wrap .sec05 .img").addClass('show');
    }
    if(wScroll >=$('.about_wrap .sec07').offset().top - 400){
        $(".about_wrap .sec07 .line_motion").addClass('show');
    }
    if(wScroll >=$('.about_wrap .sec07').offset().top - 300){
        $(".about_wrap .sec07 .tit").addClass('show');
        $(".about_wrap .sec07 .intelligence_list ul li").addClass('show');
    }
    if(wScroll >=$('.about_wrap .sec08').offset().top - $(window).height()/2){
        $(".about_wrap .sec08 .tit").addClass('show');
        $(".about_wrap .sec08 .graph_area").addClass('show');
    }
    if(wScroll >=$('.about_wrap .sec09').offset().top - $(window).height()/2){
        $(".about_wrap .sec09 .tit").addClass('show');
        $(".about_wrap .sec09 .promise_list ul li").addClass('show');
    }
    if(wScroll >=$('.about_wrap .sec10 .txt p').offset().top - $(window).height()/2){
        $(".about_wrap .sec10 .txt p strong").css("letter-spacing","50px");
        $(".about_wrap .sec10 .txt p strong").css("opacity","0");
        $(".about_wrap .sec10 .txt p strong.change").css("opacity","1");
        $(".about_wrap .sec10 .txt p strong.change").css("letter-spacing","normal");
    }
});

$(document).ready(function(){
	var swiper = new Swiper('.swiper-container.hisMock', {
		slidesPerView : 1,
		autoplay: { 
			delay: 1000, 
			disableOnInteraction: false,
		},
		speed: 600,
		loop: true,
		loopAdditionalSlides : 1,
		effect: 'fade',
		fadeEffect: {
			crossFade: true
		},
	});
});