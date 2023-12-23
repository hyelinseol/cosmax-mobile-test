$(function(){
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

		if (_productId == '11' || _productId == '12' || _productId == '13' || _productId == '23' || _productId == '26' || _productId == '29')
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
			else if (_productId == '23' || _productId == '26')
			{
				var _Html = '<div class="swiper-slide"><img src="/web/upload/mynomy/kr_mobile/prd/essence/prd_essence03.png" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr_mobile/prd/essence/prd_essence01.png" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr_mobile/prd/essence/prd_essence02.png" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr_mobile/prd/essence/prd_essence04.png" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr_mobile/prd/essence/prd_essence05.png" /></div>';
			}
			else if (_productId == '29')
			{
				var _Html = '<div class="swiper-slide"><img src="/web/upload/mynomy/kr_mobile/prd/prd_kit01.jpg" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr_mobile/prd/prd_kit02.jpg" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr_mobile/prd/prd_kit03.jpg" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr_mobile/prd/prd_kit04.jpg" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr_mobile/prd/prd_kit05.jpg" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr_mobile/prd/prd_kit06.jpg" /></div>';
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
		if (_productId == '29') {
		  // _productId가 29일 때 처리할 내용
		  $('#perPrdEvent').css('display', 'block');
		} else {
		  // _productId가 29이 아닐 때 처리할 내용
		  $('#perPrdEvent').css('display', 'none');
		}

		// 231020 부스팅 에센스 분기
		if (_productId == '16') {
			$('.forCustom').hide();
		} 
		if (_productId == '15') {
			$('.forSku').hide();
		} 

		// 231023 샘플키트 분기
		if (_productId == '24') {
			$('#hairCont').hide();
			$('#sampleKitEvent').show();
		} else {
			$('#sampleKitEvent').hide();
		}
	}

	if ($(".prdCate").hasClass("gift"))
	{
		$(this).addClass("posEnd");
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

	//슬라이드
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

/* 진단 전 상세 Anchor */
function fnMove(seq)
{
	var offset = $("#" + seq).offset();
	$('html, body').animate({scrollTop : offset.top}, 400);
}



$(document).ready(function() {
	// .prdCate 클래스를 가진 요소의 jQuery 선택자
	var prdCateSelector = '.prdCate';

	if ($(prdCateSelector).hasClass('giftMode')) {
		var prdCate = $(prdCateSelector);
		var scrollWidth = prdCate[0].scrollWidth;
		prdCate.animate({ scrollLeft: scrollWidth }, 1000); // 1초 동안 스크롤 이동
	}
});