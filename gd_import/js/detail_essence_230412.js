$(document).ready(function(){

    //솔루션 매칭 슬라이드
    if( $('.re_wrap .solution_list').length ){
        let sysImgslide = new Swiper('.re_wrap .solution_list .swiper-container',{
            slidesPerView : "auto",
            spaceBetween: 10,
    //		autoplay: { 
    //            delay: 2500, 
    //            disableOnInteraction: false 
    //        },
            speed: 1000,
            loop: false,
            loopAdditionalSlides : 1,
            navigation: {
                nextEl: '.re_wrap .solution_list .swiper-next',
                prevEl: '.re_wrap .solution_list .swiper-prev',
            }
        });
    }

    //21개 솔루션 슬라이드
    if( $('.re_wrap .re_sec10').length ){
        $('.re_wrap .re_sec10 .prescribe_list').each(function(index) {
            let t = $(this);
            t.addClass('swiepr-' + index);

            let prescribeSwiper = new Swiper( t, {
                autoplay: {
                  delay: 0, //add
                  disableOnInteraction: false,
                },
                speed: 5000,
                loop: true,
                loopAdditionalSlides: 1,
                slidesPerView: 2,
                spaceBetween: 10,
            });
        });
    }

    //숫자카운팅
//    gsap.registerPlugin(ScrollTrigger);
//
//    var startCount = {var: 0};
//
//    gsap.to(startCount, {
//      var: 1000, duration: 3, ease:"none",
//      onUpdate: changeNumber,
//      scrollTrigger: {
//        trigger: "#number",
//        toggleActions: "restart none reverse none",
//      },
//    })
//
//    function changeNumber() {
//      number.innerHTML = (startCount.var).toFixed();
//    }



});

$(window).scroll(function(){

    //제목효과
    //console.log('aa');
    var wScroll = $(this).scrollTop();

    if( $('.re_wrap .re_sec01').length ){
       if(wScroll >=$('.re_wrap .re_sec01').offset().top - $(window).height()/2){
            $('.re_wrap .re_sec01 .img').addClass('show');
            $('.re_wrap .re_sec01 .txt_area').addClass('show');
        }
    }
    
    if( $('.re_wrap .re_sec02').length ){
       if(wScroll >=$('.re_wrap .re_sec02').offset().top - $(window).height()/2){
            $('.re_wrap .re_sec02 .point_list ul li').addClass('show');
        }
    }
    
    
    

    //숫자 카운팅
//    if(wScroll >=$('.re_wrap .re_sec03').offset().top - $(window).height()/2){
//         $(".re_wrap .re_sec03 .txt_area").addClass('show');
//    }
//    
    
    
    if( $('.re_wrap .re_sec03').length ){
        if(wScroll >=$('.re_wrap .re_sec03').offset().top && wScroll < $('.re_wrap .re_sec03').offset().top + 100 ){
            console.log(wScroll, $('.re_wrap .re_sec03').offset().top);
            var numberCount= 116144;
            //console.log($('.re_wrap .re_sec03').offset().top)
            $(".re_wrap .re_sec03 .tit strong").addClass('number');
            if( $(".re_wrap .re_sec03 .tit strong").hasClass('number') ){
               //숫자 카운팅

                $({ val : 0 }).animate({ val : numberCount }, {
                    duration: 1500,
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
        
        //텍스트 위치 고정
        if(wScroll >= 2640  && wScroll < 3400){
            $('.re_wrap .re_sec03').addClass("fixed");
        } else if( wScroll >= 3400 && wScroll < 4400 ){
            $('.re_wrap .re_sec03').removeClass("fixed").addClass("end");
        } else if( wScroll >= 4400 ){
            $('.re_wrap .re_sec03').removeClass("fixed").removeClass("end");
        } else{
            $('.re_wrap .re_sec03').removeClass("fixed").removeClass("end");
        }
    }
    

    //POINT 3
    if(wScroll >=$('.re_wrap .re_sec12').offset().top - $(window).height()/2){
        $('.re_wrap .re_sec12 .ingredient_list').addClass('show');
    }

    //POINT 4
    if(wScroll >=$('.re_wrap .re_sec13').offset().top - $(window).height()/2){
        $('.re_wrap .re_sec13 .prepare_list ul li').addClass('show');
    }

    //피부 기초체력
    if(wScroll >=$('.re_wrap .re_sec15').offset().top - $(window).height()/2){
        $('.re_wrap .re_sec15 .img').addClass('show');
        $('.re_wrap .re_sec15 .txt_area').addClass('show');
    }

    //고함량 에센스 효과
    if(wScroll >=$('.re_wrap .re_sec18').offset().top - $(window).height()/2){
        $('.re_wrap .re_sec18 .img_area .top').addClass('show');
        $('.re_wrap .re_sec18 .img_area .middle ul li').addClass('show');
        $('.re_wrap .re_sec18 .img_area .bot').addClass('show');
    }

    //안전한 성분만 담았어요!
    if(wScroll >=$('.re_wrap .re_sec22').offset().top - $(window).height()/2){
        $('.re_wrap .re_sec22 .img_area').addClass('show');
    }

    //전성분 EWG 그린등급
    if(wScroll >=$('.re_wrap .re_sec23').offset().top - $(window).height()/2){
        $('.re_wrap .re_sec23 .img_area').addClass('show');
    }

});