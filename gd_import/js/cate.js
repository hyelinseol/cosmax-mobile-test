$(document).ready(function(){
 $('.orderMenu .menu li a').click(function(){
    $('.menu li').removeClass('on');
    $(this).parent('li').addClass('on');
   });
    
    var menu_swiper = new Swiper('.menuSlide', {
        speed: 600,
        slidesPerView: 'auto',
        spaceBetween:16,
        centeredSlides: false,
        parallax: true,
        loop: false,
        slidesOffsetBefore : 20, 
    });
        
	//바텀시트
    $('#myshop_tit .help').on('click', function(){
        scrollDisable();
    }); 
	$('.infoBox .close, .infoBox-dimmed').on('click', function(){
		if($('html').hasClass('expand-box')){
			scrollAble();
		}
	});
	var posB;
	function scrollDisable(){
		posY = $(window).scrollTop();
		$('html').addClass('expand-box');
		$('#container').css('top', -posB);
	}
	function scrollAble(){
		$('html').removeClass('expand-box');
		$(window).scrollTop(posB);
	}
})