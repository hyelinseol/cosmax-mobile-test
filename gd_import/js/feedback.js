$(function(){

    $('.feedback_wrap .feedback_top').addClass('action');

    $('.feedback_wrap .feedback_top .intro').addClass('show');
    $('.feedback_wrap .feedback_section.sec01 .txt').addClass('show');
    
	//피드백루프 슬라이드
    var feedbackImgslide = new Swiper('.feedback_wrap .sec02 .feedback_slider_area .swiper-container',{
        slidesPerView : 1,
        autoplay: { 
            delay: 3000, 
            disableOnInteraction: false,
        },
        speed: 0,
        loop: true,
        loopAdditionalSlides : 1,
        effect: 'fade',
    });
    
    //텍스쳐 슬라이드
    var textureImgslide = new Swiper('.feedback_wrap .sec03 .swiper-container',{
        slidesPerView : 1,
        autoplay: { 
            delay: 3000, 
            disableOnInteraction: false,
        },
        speed: 0,
        loop: true,
        loopAdditionalSlides : 1,
        effect: 'fade',
    });
    
    //피드백루프 이용 슬라이드
    var proswiper = new Swiper(".processSwiper", {
        slidesPerView : 1,
        autoplay: { 
            delay: 3000, 
            disableOnInteraction: false,
        },
        speed: 0,
        loop: true,
        loopAdditionalSlides : 1,
        effect: 'fade',
        pagination: {
            el: ".feedback_process .swiper-pagination",
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (index + 1) + "</span>";
            },
        },
    });
    
    
    
	
});

$(window).scroll(function(){
    
    //진단내역 바로가기
    var wScroll = $(this).scrollTop();

//    if (wScroll <= $(".feedback_wrap .sec06").offset().top){
//        $(".feedback_wrap .fixed-box").addClass("fix");
//        $(".feedback_wrap .fixed-box").css("display","block");
//    } else {
//        $(".feedback_wrap .fixed-box").removeClass("fix");
//        $(".feedback_wrap .fixed-box").css("display","none");
//    }
    
    //제목효과
    if(wScroll >=0){
        $('.feedback_wrap .feedback_top .intro').addClass('show');
        $('.feedback_wrap .feedback_section.sec01 .txt').addClass('show');
    }
    if(wScroll >=$('.feedback_wrap .sec02').offset().top - $(window).height()/2){
        $('.feedback_wrap .feedback_section.sec02 .txt').addClass('show');
    }
    if(wScroll >=$('.feedback_wrap .sec03').offset().top - $(window).height()/2){
        $('.feedback_wrap .feedback_section.sec03 .title').addClass('show');
    }
    if(wScroll >=$('.feedback_wrap .sec05').offset().top - $(window).height()/2){
        $('.feedback_wrap .feedback_section.sec05 .title').addClass('show');
    }
    if(wScroll >=$('.feedback_wrap .sec06').offset().top - $(window).height()/2){
        $('.feedback_wrap .feedback_section.sec06 .title').addClass('show');
    }
    if(wScroll >=$('.feedback_wrap .sec07').offset().top - $(window).height()/2){
        $('.feedback_wrap .feedback_section.sec07 .title').addClass('show');
    }
    
});