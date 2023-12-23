$(function(){
    //상단슬라이드
    let bigImgslide = new Swiper('.big_img',{
		loop: true,
		effect: 'fade',
		pagination: {
			el: '.big_img .pagination',
			type: 'bullets',
		},
        navigation: {
            nextEl: '.big_img .swiper-button-next-big',
            prevEl: '.big_img .swiper-button-prev-big',
        }
	});

	//베너 슬라이드
    var slide_wrap = new Swiper('.prdBnr', {
        speed: 600,
		autoplay: {
			delay: 4000,
		},
        slidesPerView: 1.15,
        slidesOffsetBefore : 20,
        slidesOffsetAfter : 20,
        spaceBetween: 10,
        centeredSlides: false,
        observer: true,
        observeParents: true,
        loop: false,
        watchOverflow : true,
    });
});

$(window).scroll(function() {
    var wScroll = $(this).scrollTop();

	if( $('.esSec.part01').length ){
		if (wScroll >= $('.esSec.part01').offset().top - $(window).height() / 2) {
			$('.esSec.part01 .txtSecEs').addClass('show');
		}
	}

	if( $('.esSec.part02').length ){
		if (wScroll >= $('.esSec.part02').offset().top - $(window).height() / 2) {
			$('.esSec.part02 .txtSecEs').addClass('show');
		}
	}

	if( $('.esSec.part03').length ){
		if (wScroll >= $('.esSec.part03').offset().top - $(window).height() / 2) {
			$('.esSec.part03 .imgSecEs .imgLine .mask').addClass('show');
		}
	}

	if( $('.esSec.part07').length ){
		if (wScroll >= $('.esSec.part07').offset().top - $(window).height() / 2) {
			$('.esSec.part07 .roundTxt').addClass('show');
			$('.esSec.part07 .imgSecEs').addClass('show');
		}
	}
});