$(function() {
	if($('.layout-detail').length){
		/*
		var target = $('.detail-header .box-info .total-price');
		create(target[0]);
		function create(t) {
			var observer = new MutationObserver(function(mutations) {
				let text = $('.detail-header .box-info .total-price em').text().replace('원', '');
				$('.detail-header .box-info .total-price em').html(text+'<span>원</span>');
				observer.disconnect();
			});
			var config = { childList: true, subtree: true };
			observer.observe(t, config);
		}*/

		$('.fixed-box .box-info .box-right .result-wrap .btn-wrap.btn-wrap-dummy .btn-buy').on('click', function(){
			$('.fixed-box').addClass('active');
		});
		$('.fixed-box .btn-close').on('click', function(){
			$('.fixed-box').removeClass('active');
		});

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

		//하단고정메뉴
		fixedmenu();
		$(window).on('scroll', function(){ fixedmenu(); });
		function fixedmenu(){
			let H1 = $('.detail-header .box-img').outerHeight();
			let H2 = $('.detail-header .box-info').outerHeight();
			if(H1 != undefined){
				$('.detail-header').css('min-height', H1 + H2);
			} else {
				$('.detail-header').css('min-height', H2);
			}

//			if($(window).scrollTop() > $('.detail-header').height() + $('#header').height() + 100){
//				$('.fixed-menu').addClass('active');
//				$('.fixed-btn').addClass('active');
//			} else {
//				$('.fixed-menu').removeClass('active');
//				$('.fixed-btn').removeClass('active');
//			}
		}

		//$('.plusBox-wrap').height($('.plusBox-wrap .plus, .plusBox-wrap .item').eq(0).height() + $('.plusBox-wrap .plus, .plusBox-wrap .item').eq(0).height()*2.6);
		//$('.plusBox-wrap').height($('.plusBox-wrap .plus, .plusBox-wrap .item').eq(0).outerHeight() * 2);

		//$('.plusBox-wrap .plusBox').height();
		//$('.plusBox-wrap .plusBox').height($('.plusBox-wrap .plus, .plusBox-wrap .item').eq(0).outerHeight() * 2);

//		$('.btn-more button').on('click', function(){
//			$(this).closest('.plusBox-wrap').toggleClass('active');
//			$(this).find(".arrow").toggleClass("on");
//		});

		$('.btn-more button').on('click', function(){
			$(this).find(".arrow").toggleClass("on");
			//$(this).closest('.plusBox-wrap').find('.plusBox').css({'height':'auto'});
			//$(this).closest('.plusBox-wrap').height('auto').addClass('active');
			//$(this).remove();

			if ($(this).closest('.plusBox-wrap').hasClass('active')) {
				$(this).closest('.plusBox-wrap').removeClass('active');
			} else {
				$(this).closest('.plusBox-wrap').addClass('active');
			}
		});
	}

	//diagnosis progress
	if($('#stepArea').length){
		let percentST = $('.progress-percent').data('start');
		let percent = $('.progress-percent').data('progress');
		$('#stepArea .percent-dummy').css('left', percentST);
		setTimeout(function(){
			$('#stepArea .percent-dummy').addClass('active');
			$('#stepArea .percent-dummy').css('left', percent);
		}, 100);
	}

	//diagnosis 토스트팝업 hidden
	if($('body#diagnosis').length){
		setTimeout(function(){
			$('.popWrap').fadeOut(200);
		}, 4000);
	}

	///diagnosis/fragrance01.html
	var fragranceSlide = new Swiper('.fragranceSlide', {
        speed: 600,
        slidesPerView: 'auto',
        spaceBetween: 0,
        slideToClickedSlide : true,
        centeredSlides: true,
        mousewheel:true,
        pagination: {
            el: '.swiper-pagination-fragrance',
            clickable: true,
        },
		on: {
			slideChangeTransitionEnd: function(){
				if($('.fragranceSlide .swiper-slide-active').hasClass('slide-free')){
					$('.strength').hide();
				} else {
					$('.strength').show();
				}
			}
		}
    });

	////myshop/mypage/repurchase_set.html
	var fragranceSlide = new Swiper('.feedBackCon', {
        slidesPerView: 1,
        spaceBetween: 10,
        slideToClickedSlide : true,
        centeredSlides: false,
        mousewheel:false,
        pagination: {
            el: '.fb-pagination',
            clickable: true,
        }
    });

	////myshop/mypage/repurchase_essen.html
	var fragranceSlide = new Swiper('.rollingMock', {
		autoplay: { delay: 3000, disableOnInteraction: false },
		speed: 800,
        slidesPerView: 1,
		effect:'fade',
        centeredSlides: false,
        mousewheel:false,
    });

	//profile_slide preset
	var main_swiper = new Swiper('.profileSlide', {
        speed: 600,
        slidesPerView:'auto',
        spaceBetween: 20,
        centeredSlides: true,
        //parallax: true,
        /*loop: true,*/
        /*autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },*/
        /*pagination: {
            el: '.swiper-pagination-profile',
            clickable: true,
        },*/
        /*navigation: {
            nextEl: '.swiper-button-next-profile',
            prevEl: '.swiper-button-prev-profile',
        },*/
		on: {
			slideChangeTransitionStart: function(){
				$('.selectArea .select ul.view li').removeClass('checked');
				if($('.slideArea .profileSlide .swiper-slide').eq(main_swiper.activeIndex).data('preset') != undefined){
					var preset = $('.slideArea .profileSlide .swiper-slide').eq(main_swiper.activeIndex).data('preset').split(',');
					for(var i=0;i < preset.length; i++){
						$('.selectArea .select ul.view li').eq(preset[i]).addClass('checked');
					}
				}
			}
		}
    });
	//user select
	$('.selectArea .select ul.view li').on('click', function(){
		//if(main_swiper.activeIndex == 0){
 			// 개수 제한없음
        	$(this).toggleClass('checked');
        	// 개수 제한
			/*if($('.selectArea .select ul.view li.checked').length < 5){
				$(this).toggleClass('checked');
			} else {
				$(this).removeClass('checked');
			}*/
		//}
	});

	//user re_select
    $('.selectArea .re_select ul.view li').on('click', function(){
        // 개수 제한없음
        //$(this).toggleClass('checked');
        // 개수 제한
        if($('.selectArea .re_select ul.view li.checked').length < 5){
            $(this).toggleClass('checked');
        } else {
            $(this).removeClass('checked');
        }
    });

	//solution
	var solution_swiper = new Swiper('.solution', {
        speed: 600,
        slidesPerView: 1,
        slidesPerColumn: 2,
        spaceBetween: 24,
        centeredSlides: true,
        //parallax: true,
        /*loop: true,*/
        /*autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },*/
        pagination: {
            el: '.swiper-pagination-solution',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next-solution',
            prevEl: '.swiper-button-prev-solution',
        },
    });

	//draggable
	setH();
	$(window).on('load resize', function(){ setH() });
	function setH(){
		$('.controlArea:not(.plus) .slide-draggable').css('height', $('.controlArea:not(.plus) .slide-draggable').height());

		$('.controlArea:not(.plus) .control_bar .bar .blank-top').css('height', $('.controlArea:not(.plus) .control_bar ol li').height()/2 - 12);
		$('.controlArea:not(.plus) .control_bar .bar .blank-bt').css('height', $('.controlArea:not(.plus) .control_bar ol li').height()/2 - 12);
	}
	var draggable = new Swiper('.controlArea:not(.plus) .slide-draggable',{
		direction: 'vertical',
		loop: false,
		allowTouchMove: false,
		effect: 'fade',
		scrollbar: {
			el: '.controlArea:not(.plus) .control_bar .bar',
			hide: false,
			draggable: true,
		},
		on: {
			slideChange: function(){
				$('.controlArea:not(.plus) .control_bar ol li').removeClass('checked').eq(draggable.activeIndex).addClass('checked');
			}
		}
	});
	$('.controlArea:not(.plus) .control_bar ol li').on('click', function(){
		draggable.slideTo($(this).index());
	});

    setHPlus();
    $(window).on('load resize', function(){ setHPlus() });
    function setHPlus(){
        $('.select [class*="plus"] [class*="control_bar"] .bar .blank-top').css('width', $('.select [class*="plus"] [class*="control_bar"] ol li').width()/2 - 12);
        $('.select [class*="plus"] [class*="control_bar"] .bar .blank-bt').css('width', $('.select [class*="plus"] [class*="control_bar"] ol li').width()/2 - 12);
    }
    var draggablePlus = new Swiper('.select [class*="plus"] .slide-draggable',{
        initialSlide: 1,
        direction: 'horizontal',
        loop: false,
        allowTouchMove: false,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        scrollbar: {
            el: '.select [class*="plus"] .control_bar .bar',
            hide: false,
            draggable: true,
        },
        on: {
            slideChange: function(){
                $('.select [class*="plus"] .control_bar ol li').removeClass('checked').eq(draggablePlus.activeIndex).addClass('checked');
            }
        }
    });
    $('.select [class*="plus"] .control_bar ol li').on('click', function(){
        draggablePlus.slideTo($(this).index());
    });

// drag Add - Daover S
	var draggableHorizen = new Swiper('.select [class*="horizen"] .slide-draggable',{
        initialSlide: 1,
		direction: 'horizontal',
		loop: false,
		allowTouchMove: false,
		effect: 'fade',
		fadeEffect: {
			crossFade: true
		},
//		navigation: {
//			nextEl: ".dirMore",
//			prevEl: ".dirLess",
//		},
		scrollbar: {
			el: '.select [class*="horizen"] .control_bar .bar',
			hide: false,
			draggable: true,
		},
		on: {
			slideChange: function(){
				$('.dontKnow a').removeClass('active');
				$('.select [class*="horizen"] .control_bar p span').removeClass('checked').eq(draggableHorizen.activeIndex).addClass('checked');
				$('.select [class*="horizen"] .control_bar .swipeTitle .thumb').removeClass('checked').eq(draggableHorizen.activeIndex).addClass('checked');
				$('.select .quantity .word').removeClass('active').eq(draggableHorizen.activeIndex).addClass('active');
				$(".bar .swiper-scrollbar-drag").removeClass("dis");
			}
		}
	});
	$('.third .dirMore').on('click', function(){
        draggableHorizen.slideTo (2,500,false)
    });
	$('.third .dirMid').on('click', function(){
        draggableHorizen.slideTo (1,500,false)
    });
	$('.third .dirLess').on('click', function(){
        draggableHorizen.slideTo (0,500,false)
    });

	$('.fourth .dirMore').on('click', function(){
        draggableHorizen.slideTo (3,500,false)
    });
	$('.fourth .dirLess').on('click', function(){
        draggableHorizen.slideTo (0,500,false)
    });

	$('.fifth .dirMore').on('click', function(){
        draggableHorizen.slideTo (4,500,false)
    });
	$('.fifth .dirLess').on('click', function(){
        draggableHorizen.slideTo (0,500,false)
    });

    $('.select [class*="horizen"] .control_bar p span').on('click', function(){
        draggableHorizen.slideTo($(this).index());
    });  
	$('.select .quantity .word').on('click', function(){
        draggableHorizen.slideTo($(this).index());
    });  
        
// drag Add - Daover E


    // 인트로페이지 동의
    $('.introBox .agree label').on('click', function(){
        scrollDisable();
    });
	//바텀시트
	$('.contentBox .infoWrap .info p').on('click', function(){
		scrollDisable();
	});
	$('.infoBox .close, .infoBox-dimmed').on('click', function(){
		if($('html').hasClass('expand-box')){
			scrollAble();
		}
	});
	var posY;
	function scrollDisable(){
		posY = $(window).scrollTop();
		$('html').addClass('expand-box');
		$('#container').css('top', -posY);
	}
	function scrollAble(){
		$('html').removeClass('expand-box');
		$(window).scrollTop(posY);
	}
	$('.contentBox .infoWrap .info i').on('click', function(){
		$('.contentBox .infoWrap').remove();
	});
});

/* 상단 고정 */
/*
$(document).ready(function(){
    var top_btn = $("#header").offset().top;
    $(window).scroll(function(){
        if($(window).scrollTop() > top_btn+1) {
            $('#header').addClass('fixed');
        }
        else {
            $('#header').removeClass('fixed');
        }
    });
});
*/

/* 상단 고정 */
/*$(document).ready(function() {
    var fixedEl = $('#header');
    var nextEl = $('#container');
    var nextEl_margin_top = nextEl.css('marginTop');

    $(window).scroll(function() {
        if ($(window).scrollTop() > $('#header').height()) {
            fixedEl.addClass('fixed');
            nextEl.css('marginTop', fixedEl.height());
            $("#top_mar").show();
        } else {
            fixedEl.removeClass('fixed');
            nextEl.css('marginTop', nextEl_margin_top);
        }
        $("#top_mar").show();
    });

});*/

/* 스크롤시 나타나는 우측 하단버튼 */
$(document).ready(function(){
    $(window).scroll(function () {
        if ($(this).scrollTop() > 10) {
            $('.fixed_btn').fadeIn();
        } else {
            $('.fixed_btn').fadeOut();
        }
    });

    $(".btn.up").click(function(){
        return $("html, body").animate({scrollTop:0},1200,"easeInOutExpo"),!1});

    $(".btn.down").click(function(){
        return $("html, body").animate({scrollTop:$(document).height()},1200,"easeInOutExpo"),!1});
});

jQuery.easing.jswing=jQuery.easing.swing;jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,f,a,h,g){return jQuery.easing[jQuery.easing.def](e,f,a,h,g)},easeInQuad:function(e,f,a,h,g){return h*(f/=g)*f+a},easeOutQuad:function(e,f,a,h,g){return -h*(f/=g)*(f-2)+a},easeInOutQuad:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f+a}return -h/2*((--f)*(f-2)-1)+a},easeInCubic:function(e,f,a,h,g){return h*(f/=g)*f*f+a},easeOutCubic:function(e,f,a,h,g){return h*((f=f/g-1)*f*f+1)+a},easeInOutCubic:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f+a}return h/2*((f-=2)*f*f+2)+a},easeInQuart:function(e,f,a,h,g){return h*(f/=g)*f*f*f+a},easeOutQuart:function(e,f,a,h,g){return -h*((f=f/g-1)*f*f*f-1)+a},easeInOutQuart:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f+a}return -h/2*((f-=2)*f*f*f-2)+a},easeInQuint:function(e,f,a,h,g){return h*(f/=g)*f*f*f*f+a},easeOutQuint:function(e,f,a,h,g){return h*((f=f/g-1)*f*f*f*f+1)+a},easeInOutQuint:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f*f+a}return h/2*((f-=2)*f*f*f*f+2)+a},easeInSine:function(e,f,a,h,g){return -h*Math.cos(f/g*(Math.PI/2))+h+a},easeOutSine:function(e,f,a,h,g){return h*Math.sin(f/g*(Math.PI/2))+a},easeInOutSine:function(e,f,a,h,g){return -h/2*(Math.cos(Math.PI*f/g)-1)+a},easeInExpo:function(e,f,a,h,g){return(f==0)?a:h*Math.pow(2,10*(f/g-1))+a},easeOutExpo:function(e,f,a,h,g){return(f==g)?a+h:h*(-Math.pow(2,-10*f/g)+1)+a},easeInOutExpo:function(e,f,a,h,g){if(f==0){return a}if(f==g){return a+h}if((f/=g/2)<1){return h/2*Math.pow(2,10*(f-1))+a}return h/2*(-Math.pow(2,-10*--f)+2)+a},easeInCirc:function(e,f,a,h,g){return -h*(Math.sqrt(1-(f/=g)*f)-1)+a},easeOutCirc:function(e,f,a,h,g){return h*Math.sqrt(1-(f=f/g-1)*f)+a},easeInOutCirc:function(e,f,a,h,g){if((f/=g/2)<1){return -h/2*(Math.sqrt(1-f*f)-1)+a}return h/2*(Math.sqrt(1-(f-=2)*f)+1)+a},easeInElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return -(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e},easeOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return g*Math.pow(2,-10*h)*Math.sin((h*k-i)*(2*Math.PI)/j)+l+e},easeInOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k/2)==2){return e+l}if(!j){j=k*(0.3*1.5)}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}if(h<1){return -0.5*(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e}return g*Math.pow(2,-10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j)*0.5+l+e},easeInBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*(f/=h)*f*((g+1)*f-g)+a},easeOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*((f=f/h-1)*f*((g+1)*f+g)+1)+a},easeInOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}if((f/=h/2)<1){return i/2*(f*f*(((g*=(1.525))+1)*f-g))+a}return i/2*((f-=2)*f*(((g*=(1.525))+1)*f+g)+2)+a},easeInBounce:function(e,f,a,h,g){return h-jQuery.easing.easeOutBounce(e,g-f,0,h,g)+a},easeOutBounce:function(e,f,a,h,g){if((f/=g)<(1/2.75)){return h*(7.5625*f*f)+a}else{if(f<(2/2.75)){return h*(7.5625*(f-=(1.5/2.75))*f+0.75)+a}else{if(f<(2.5/2.75)){return h*(7.5625*(f-=(2.25/2.75))*f+0.9375)+a}else{return h*(7.5625*(f-=(2.625/2.75))*f+0.984375)+a}}}},easeInOutBounce:function(e,f,a,h,g){if(f<g/2){return jQuery.easing.easeInBounce(e,f*2,0,h,g)*0.5+a}return jQuery.easing.easeOutBounce(e,f*2-g,0,h,g)*0.5+h*0.5+a}});
/*! Respond.js v1.4.2: min/max-width media query polyfill
 * Copyright 2014 Scott Jehl
 * Licensed under MIT
 * http://j.mp/respondjs */


!function(a){"use strict";a.matchMedia=a.matchMedia||function(a){var b,c=a.documentElement,d=c.firstElementChild||c.firstChild,e=a.createElement("body"),f=a.createElement("div");return f.id="mq-test-1",f.style.cssText="position:absolute;top:-100em",e.style.background="none",e.appendChild(f),function(a){return f.innerHTML='&shy;<style media="'+a+'"> #mq-test-1 { width: 42px; }</style>',c.insertBefore(e,d),b=42===f.offsetWidth,c.removeChild(e),{matches:b,media:a}}}(a.document)}(this),function(a){"use strict";function b(){v(!0)}var c={};a.respond=c,c.update=function(){};var d=[],e=function(){var b=!1;try{b=new a.XMLHttpRequest}catch(c){b=new a.ActiveXObject("Microsoft.XMLHTTP")}return function(){return b}}(),f=function(a,b){var c=e();c&&(c.open("GET",a,!0),c.onreadystatechange=function(){4!==c.readyState||200!==c.status&&304!==c.status||b(c.responseText)},4!==c.readyState&&c.send(null))},g=function(a){return a.replace(c.regex.minmaxwh,"").match(c.regex.other)};if(c.ajax=f,c.queue=d,c.unsupportedmq=g,c.regex={media:/@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi,keyframes:/@(?:\-(?:o|moz|webkit)\-)?keyframes[^\{]+\{(?:[^\{\}]*\{[^\}\{]*\})+[^\}]*\}/gi,comments:/\/\*[^*]*\*+([^/][^*]*\*+)*\//gi,urls:/(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,findStyles:/@media *([^\{]+)\{([\S\s]+?)$/,only:/(only\s+)?([a-zA-Z]+)\s?/,minw:/\(\s*min\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/,maxw:/\(\s*max\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/,minmaxwh:/\(\s*m(in|ax)\-(height|width)\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/gi,other:/\([^\)]*\)/g},c.mediaQueriesSupported=a.matchMedia&&null!==a.matchMedia("only all")&&a.matchMedia("only all").matches,!c.mediaQueriesSupported){var h,i,j,k=a.document,l=k.documentElement,m=[],n=[],o=[],p={},q=30,r=k.getElementsByTagName("head")[0]||l,s=k.getElementsByTagName("base")[0],t=r.getElementsByTagName("link"),u=function(){var a,b=k.createElement("div"),c=k.body,d=l.style.fontSize,e=c&&c.style.fontSize,f=!1;return b.style.cssText="position:absolute;font-size:1em;width:1em",c||(c=f=k.createElement("body"),c.style.background="none"),l.style.fontSize="100%",c.style.fontSize="100%",c.appendChild(b),f&&l.insertBefore(c,l.firstChild),a=b.offsetWidth,f?l.removeChild(c):c.removeChild(b),l.style.fontSize=d,e&&(c.style.fontSize=e),a=j=parseFloat(a)},v=function(b){var c="clientWidth",d=l[c],e="CSS1Compat"===k.compatMode&&d||k.body[c]||d,f={},g=t[t.length-1],p=(new Date).getTime();if(b&&h&&q>p-h)return a.clearTimeout(i),i=a.setTimeout(v,q),void 0;h=p;for(var s in m)if(m.hasOwnProperty(s)){var w=m[s],x=w.minw,y=w.maxw,z=null===x,A=null===y,B="em";x&&(x=parseFloat(x)*(x.indexOf(B)>-1?j||u():1)),y&&(y=parseFloat(y)*(y.indexOf(B)>-1?j||u():1)),w.hasquery&&(z&&A||!(z||e>=x)||!(A||y>=e))||(f[w.media]||(f[w.media]=[]),f[w.media].push(n[w.rules]))}for(var C in o)o.hasOwnProperty(C)&&o[C]&&o[C].parentNode===r&&r.removeChild(o[C]);o.length=0;for(var D in f)if(f.hasOwnProperty(D)){var E=k.createElement("style"),F=f[D].join("\n");E.type="text/css",E.media=D,r.insertBefore(E,g.nextSibling),E.styleSheet?E.styleSheet.cssText=F:E.appendChild(k.createTextNode(F)),o.push(E)}},w=function(a,b,d){var e=a.replace(c.regex.comments,"").replace(c.regex.keyframes,"").match(c.regex.media),f=e&&e.length||0;b=b.substring(0,b.lastIndexOf("/"));var h=function(a){return a.replace(c.regex.urls,"$1"+b+"$2$3")},i=!f&&d;b.length&&(b+="/"),i&&(f=1);for(var j=0;f>j;j++){var k,l,o,p;i?(k=d,n.push(h(a))):(k=e[j].match(c.regex.findStyles)&&RegExp.$1,n.push(RegExp.$2&&h(RegExp.$2))),o=k.split(","),p=o.length;for(var q=0;p>q;q++)l=o[q],g(l)||m.push({media:l.split("(")[0].match(c.regex.only)&&RegExp.$2||"all",rules:n.length-1,hasquery:l.indexOf("(")>-1,minw:l.match(c.regex.minw)&&parseFloat(RegExp.$1)+(RegExp.$2||""),maxw:l.match(c.regex.maxw)&&parseFloat(RegExp.$1)+(RegExp.$2||"")})}v()},x=function(){if(d.length){var b=d.shift();f(b.href,function(c){w(c,b.href,b.media),p[b.href]=!0,a.setTimeout(function(){x()},0)})}},y=function(){for(var b=0;b<t.length;b++){var c=t[b],e=c.href,f=c.media,g=c.rel&&"stylesheet"===c.rel.toLowerCase();e&&g&&!p[e]&&(c.styleSheet&&c.styleSheet.rawCssText?(w(c.styleSheet.rawCssText,e,f),p[e]=!0):(!/^([a-zA-Z:]*\/\/)/.test(e)&&!s||e.replace(RegExp.$1,"").split("/")[0]===a.location.host)&&("//"===e.substring(0,2)&&(e=a.location.protocol+e),d.push({href:e,media:f})))}x()};y(),c.update=y,c.getEmValue=u,a.addEventListener?a.addEventListener("resize",b,!1):a.attachEvent&&a.attachEvent("onresize",b)}}(this);

!(function($){
	$.fn.DB_cate=function(options){
		var opt={
			fadeSpeed:200,
			mouseEvent:'over',                    //click, over
			motionType:'fade'                     //none, fade
		};
		$.extend(opt,options);
		return this.each(function(){
			var $this=$(this);
			var $li=$this.find('li');
			var $ul=$this.find('ul');
			var $d2=$this.find('.d2');
			var fadeSpeed=opt.fadeSpeed;
			var motionType=opt.motionType;
			var mouseEvent=opt.mouseEvent;
			var $body=$('body');

			$d2.each(function(){
				//화살표
				if($(this).find('>ul').length>0){
					$(this).addClass('arrow');
				}
			});

			if(mouseEvent=='over'){
				$li.bind('mouseenter',function(){
					$(this).addClass('on');
					if(motionType=='none'){
						$(this).find('>ul').show();
					}else{
						$(this).find('>ul').fadeIn(fadeSpeed);
					}
				}).bind('mouseleave',function(){
					$(this).removeClass('on');
					$(this).find('>ul').hide();
				});
			}else{
				$li.bind('click',function(e){
					e.stopPropagation();
					if($(this).hasClass('fix')){
						$(this).removeClass('fix');
						if(motionType=='none'){
							$(this).find('>ul').hide();
						}else{
							$(this).find('>ul').fadeOut(fadeSpeed);
						}
					}else{
						$(this).nextAll().removeClass('fix').find('ul').hide();
						$(this).prevAll().removeClass('fix').find('ul').hide();

						$(this).addClass('fix');
						if(motionType=='none'){
							$(this).find('>ul').show();
						}else{
							$(this).find('>ul').fadeIn(fadeSpeed);
						}
					}

				}).bind('mouseenter',function(){
					$(this).addClass('on');
				}).bind('mouseleave',function(){
					$(this).removeClass('on');
				});
			}

			$body.bind('click',function(e){
				if(motionType=='none'){
					$ul.hide();
				}else{
					$ul.fadeOut(fadeSpeed);
				}
				$li.removeClass('fix');
			})

		});
	};
})(jQuery);

//피드백루프 브릿지 에니메이션
(function($){

	var _t = 1500;
	var aaa;
	$('.fbCon ul').attr('data-num', 0);
	var falsjfasf = function(){
		$('.fbCon ul').each(function(){
			var _n = parseInt($(this).attr('data-num')) + 1;
			var _m = $(this).children('li').length;

			if (_n == _m) {

				_n = 0;

				$(this).children('li:eq(' + _n + ')').addClass('on');
				$(this).children('li:not(:eq(' + _n + '))').removeClass('on');

				$(this).attr('data-num', _n);

			} else {

				$(this).children('li:eq(' + _n + ')').addClass('on');
				$(this).children('li:not(:eq(' + _n + '))').removeClass('on');

				$(this).attr('data-num', _n);
			}
		});
		//console.log('121212');
		aaa = setTimeout(falsjfasf, _t);
	};
	aaa = setTimeout(falsjfasf, _t);
	// 자동애니메이션 끝

	/*
	// 마우스오버/아웃시 애니메이션 멈춤/다시재개
	$('.fbCon ul li').hover(function(){
		clearTimeout(aaa);

		var _idx = $(this).closest('ul').children('li').index(this);
		//console.log(_idx);

		$(this).closest('ul').attr('data-num', _idx);
		$(this).closest('ul').children('li:not(:eq(' + _idx + '))').removeClass('on');

	}, function(){
		falsjfasf();
	});
	*/

})(jQuery);

$(function() {
	$("a.viewodrStats").click(function() {
		$(".infoBox.exp").addClass("on");
		$(".infoBox-dimmed").show();
	});

	$(".xi-close").click(function() {
		$(".infoBox.exp").removeClass("on");
		$(".infoBox-dimmed").hide();
	});
});

$(function() {
	$(".choiceOpt").click(function() {
		$(this).find(".current").toggleClass("on");
		$(this).find(".current .ar").toggleClass("on");
		$(this).find("ul").slideToggle();
	});
});

$(document).ready(function(){
	/* 상단 TxtBnr 제어 */
	$(function() {
		$(".txtBnr .bnrClose").click(function() {
			$(".txtBnr").addClass("hide");
			$('#contents').removeClass('bnr');
		});
	});

//	$(function() {
//		if ($('.txtBnr').hasClass('show')) {
//			$('#stepArea').addClass('bnr');
//		} else {
//			$('#stepArea').removeClass('bnr');
//		}
//	});

	$(function() {
		if ($('.txtBnr').is(':visible')) {
		$('#contents').addClass('bnr');
		$('#header .header').removeClass("noBnr");
		} else {
			$('#contents').removeClass('bnr');
		}
	});

	if ($('.txtBnr').css('display') === 'none') {
		$('#header .header').addClass("noBnr");
	}

});


// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 200;
var navbarHeight = $('header').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 300);

function hasScrolled() {
    var st = $(this).scrollTop();

    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('#header .header').removeClass('slideDown').addClass('slideUp');
		$('#stepArea .step').addClass('up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('#header .header').removeClass('slideUp').addClass('slideDown');
			$('#stepArea .step').removeClass('up');
        }
    }

    lastScrollTop = st;
}

/* 공통 상단 띠베너 */
$(document).ready(function(){
	var swiper = new Swiper('.swiper-container.comnTopBnr', {
		spaceBetween: 0,
		speed: 1000,
		autoplay: {
			delay: 3000,
			},
		loop: true,
		slidesPerView:1,
//		navigation: {
//			nextEl: '.bnr-next',
//			prevEl: '.bnr-prev'
//		},
		observer: true,	// 추가
		observeParents: true,	// 추가
	});

	$(function() {
		if ($('.txtBnr').is(':visible')) {
		$('#contents').addClass('bnr');
		} else {
			$('#contents').removeClass('bnr');
		}
	});
});

/* 공통 상단 띠베너 */
//쿠키설정
function setCookie( name, value, expiredays ) {
var todayDate = new Date();
todayDate.setDate( todayDate.getDate() + expiredays );
document.cookie = name + '=' + escape( value ) + '; path=/; expires=' + todayDate.toGMTString() + ';'
}

//쿠키 불러오기
function getCookie(name)
{
	var obj = name + "=";
	var x = 0;
	while ( x <= document.cookie.length )
	{
		var y = (x+obj.length);
		if ( document.cookie.substring( x, y ) == obj )
		{
			if ((endOfCookie=document.cookie.indexOf( ";", y )) == -1 )
				endOfCookie = document.cookie.length;
			return unescape( document.cookie.substring( y, endOfCookie ) );
		}
		x = document.cookie.indexOf( " ", x ) + 1;

		if ( x == 0 ) break;
	}
	return "";
}

//닫기 버튼 클릭시
function closeWin(key)
{
	setCookie('txtBnr'+key, 'Y' , 1 );
	$("#divpop"+key+"").slideUp();
	$(".bnrClose.eventTopBnr").hide();
	$('#contents').removeClass('bnr');
	$('#header .header').addClass("noBnr");
}

$(function(){
	if(getCookie("txtBnr1") !="Y"){
		$("#divpop1").show();
	} else {
		$("#divpop1").hide();
	}
});

/* iframe 높이 자동 */
//<![CDATA[
function calcHeight(){
 //find the height of the internal page

 var the_height=
 document.getElementById('event_frame').contentWindow.
 document.body.scrollHeight;

 //change the height of the iframe
 document.getElementById('event_frame').height=
 the_height;

 //document.getElementById('event_frame').scrolling = "no";
 document.getElementById('event_frame').style.overflow = "hidden";
}
//

/* 230412 마이페이지 베너 노출 */
$(function() {
	$(".ordBnr .currentTitle").click(function() {
		$(this) .find(".ar").toggleClass("on");
		$(".ordBnr .ordBnrBox").slideToggle();
	});
});

/* 230418 사이드메뉴 서브노출 */
$(function() {
	$("a.dp2").click(function() {
		$(this) .find(".ar").toggleClass("on");
		$(this) .parent().find("dl").slideToggle();
	});
});

/* 230418 메인 survey 노출 */
$(function() {
	$("a.viewSurveyPart").click(function() {
		$("body").addClass("noScroll");
		$(".fixDim").show();
		$("#layoutMain .fixed-box").addClass("active");
		$("#layoutMain .fixed-box.fix").css({"bottom":"0"});
		$("#layoutMain .fixed-box .btn_diagnosis").hide();
	});
	$("#layoutMain .btn-close").click(function() {
		$("body").removeClass("noScroll");
		$(".fixDim").hide();
		$("#layoutMain .fixed-box").removeClass("active");
		$("#layoutMain .fixed-box.fix").css({"bottom":"15px"});
		$("#layoutMain .fixed-box .btn_diagnosis").show();
	});
});

$(function() {
	$(".fixDim").click(function(e){
		e.stopPropagation();
		$("body").removeClass("noScroll");
		$(".fixDim").hide();
		$("#layoutMain .fixed-box").removeClass("active");
		$("#layoutMain .fixed-box.fix").css({"bottom":"15px"});
		$("#layoutMain .fixed-box .btn_diagnosis").show();
	});
});

$(document).ready(function(){
	// gift prdRolling
	var swiper = new Swiper(".prdRollingGift", {
		slidesPerView: 1.78,
        spaceBetween: 12,
	});
});