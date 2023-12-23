// 썸네일 이미지 엑박일경우 기본값 설정
$(window).on('load', function() {
    $(".thumbnail img, img.thumbImage, img.bigImage").each(function($i,$item){
        var $img = new Image();
        $img.onerror = function () {
            $item.src="//img.echosting.cafe24.com/thumb/img_product_big.gif";
        }
        $img.src = this.src;
    });
});

$(function(){
    // 토글
    $('div.eToggle .title').on('click', function(){
        var toggle = $(this).parent('.eToggle');
        if(toggle.hasClass('disable') == false){
            $(this).parent('.eToggle').toggleClass('selected')
        }
    });

    $('dl.eToggle dt').on('click', function(){
        $(this).toggleClass('selected');
        $(this).next('dd').toggleClass('selected');
    });

    //장바구니 페이지 수량폼 Type 변경
    $('[id^="quantity"]').each(function() {
        $(this).get(0).type = 'tel';
    });

    // 모바일에서 공급사 테이블 th 강제조절
    $('.xans-mall-supplyinfo, .supplyInfo').find('table > colgroup').find('col').eq(0).width(98);
    $('.xans-mall-supplyinfo, .supplyInfo').find('th, td').css({padding:'13px 10px 12px'});

    /**
     *  메인카테고리 toggle
     */
    /*$('.xans-product-listmain h2').on('click', function() {
        var bClosed = !!$(this).data('is_closed');
        var sUrl;
        if (bClosed) {
            sUrl = "/web/upload/mynomy/kr_mobile/layout/bg_snb_1depth_on.gif";
        } else {
            sUrl = "/web/upload/mynomy/kr_mobile/layout/bg_snb_1depth.gif";
        }
        $(this).css('background-image', 'url("'+ sUrl +'")');
        $(this).siblings().toggle();
        $(this).parent().find('div.ec-base-paginate').toggle();
        $(this).parent().next('div.xans-product-listmore').toggle();
        $(this).data('is_closed', !bClosed);
    });*/

    /**
     *  상단탑버튼
     */
    var globalTopBtnScrollFunc = function() {
        // 탑버튼 관련변수
        var $btnTop = $('#btnTop');

        $(window).on('scroll', function() {
            try {
                var iCurScrollPos = $(this).scrollTop();

                if (iCurScrollPos > ($(this).height() / 2)) {
                    $btnTop.fadeIn('fast');
                } else {
                    $btnTop.fadeOut('fast');
                }
            } catch(e) { }
        });
    };

    /**
     *  구매버튼
     */
    var globalBuyBtnScrollFunc = function() {
        // 구매버튼 관련변수
        var sFixId = $('#orderFixItem').length > 0  ? 'orderFixItem' : 'fixedActionButton',
            $area = $('#orderFixArea'),
            $item = $('#' + sFixId + '').not($area);

        $(window).on('scroll', function(){
            try {
                 // 구매버튼 관련변수
                var iCurrentHeightPos = $(this).scrollTop() + $(this).height(),
                    iButtonHeightPos = $item.offset().top;

                if (iCurrentHeightPos > iButtonHeightPos || iButtonHeightPos < $(this).scrollTop() + $item.height()) {
                    if (iButtonHeightPos < $(this).scrollTop() - $item.height()) {
                        $area.fadeIn('fast');
                    } else {
                        $area.hide();
                    }
                } else {
                    $area.fadeIn('fast');
                }
            } catch(e) { }
        });
    };

    globalTopBtnScrollFunc();
    globalBuyBtnScrollFunc();
});

// 공통레이어팝업 오픈
var globalLayerOpenFunc = function(_this) {
    this.id = $(_this).data('id');
    this.param = $(_this).data('param');
    this.basketType = $('#basket_type').val();
    this.url = $(_this).data('url');
    this.layerId = 'ec_temp_mobile_layer';
    this.layerIframeId = 'ec_temp_mobile_iframe_layer';

    var _this = this;

    function paramSetUrl() {
        if (this.param) {
            // if isset param
        } else {
            this.url = this.basketType ?  this.url + '?basket_type=' + this.basketType : this.url;
        }
    };

    if (this.url) {
        window.ecScrollTop = $(window).scrollTop();
        $.ajax({
            url : this.url,
            success : function (data) {
                if (data.indexOf('404 페이지 없음') == -1) {
                    // 있다면 삭제
                    try { $(_this).remove(); } catch ( e ) { }

                    var $layer = $('<div>', {
                        html: $("<iframe>", { src: _this.url, id: _this.layerIframeId, scrolling: 'auto', css: { width: '100%', height: '100%', overflowY: 'auto', border: 0 } } ),
                        id: _this.layerId,
                        css : { position: 'absolute', top: 0, left:0, width: '100%', height: $(window).height(), 'z-index': 9999 }
                    });

                    $('body').append($layer);
                    $('html, body').css({'overflowY': 'hidden', height: '100%', width: '100%'});
                    $('#' + this.layerId).show();
                }
            }
        });
    }
};

// 공통레이어팝업 닫기
var globalLayerCloseFunc = function() {
    this.layerId = 'ec_temp_mobile_layer';

    if (window.parent === window)
        self.close();
    else {
        parent.$('html, body').css({'overflowY': 'auto', height: 'auto', width: '100%'});
        parent.$('html, body').scrollTop(parent.window.ecScrollTop);
        parent.$('#' + this.layerId).remove();
    }
};

/**
 * document.location.href split
 * return array Param
 */
var getQueryString = function(sKey)
{
    var sQueryString = document.location.search.substring(1);
    var aParam = {};

    if (sQueryString) {
        var aFields = sQueryString.split("&");
        var aField  = [];
        for (var i=0; i<aFields.length; i++) {
            aField = aFields[i].split('=');
            aParam[aField[0]] = aField[1];
        }
    }

    aParam.page = aParam.page ? aParam.page : 1;
    return sKey ? aParam[sKey] : aParam;
};

// PC버전 바로 가기
var isPCver = function() {
    var sUrl = window.location.hostname;
    var aTemp = sUrl.split(".");

    var pattern = /^(mobile[\-]{2}shop[0-9]+)$/;

    if (aTemp[0] == 'm' || aTemp[0] == 'skin-mobile' || aTemp[0] == 'mobile') {
        sUrl = sUrl.replace(aTemp[0]+'.', '');
    } else if (pattern.test(aTemp[0]) === true) {
        var aExplode = aTemp[0].split('--');
        aTemp[0] = aExplode[1];
        sUrl = aTemp.join('.');
    }
    window.location.href = '//'+sUrl+'/?is_pcver=T';
};

/* 도움말 */
$('body').on('click', '.ec-base-tooltip-area .eTip', function(e){
    var findArea = $($(this).parents('.ec-base-tooltip-area'));
    var findTarget = $($(this).siblings('.ec-base-tooltip'));
    var findTooltip = $('.ec-base-tooltip');
    $('.ec-base-tooltip-area').removeClass('show');
    $(this).parents('.ec-base-tooltip-area').first().addClass('show');
    findTooltip.hide();
    findTarget.show();
    e.preventDefault();
});

$('body').on('click', '.ec-base-tooltip-area .eClose', function(e){
    var findTarget = $(this).parents('.ec-base-tooltip').first();
    $('.ec-base-tooltip-area').removeClass('show');
    findTarget.hide();
    e.preventDefault();
});

$('.ec-base-tooltip-area').find('input').on('focusout', function() {
    var findTarget = $(this).parents('.ec-base-tooltip-area').find('.ec-base-tooltip');
    $('.ec-base-tooltip-area').removeClass('show');
    findTarget.hide();
});

/* 23 01 16 */
function getQueryString(sKey)
{
    var sQueryString = document.location.search.substring(1);
    var aParam       = {};

    if (sQueryString) {
        var aFields = sQueryString.split("&");
        var aField  = [];
        for (var i=0; i<aFields.length; i++) {
            aField = aFields[i].split('=');
            aParam[aField[0]] = aField[1];
        }
    }

    aParam.page = aParam.page ? aParam.page : 1;
    return sKey ? aParam[sKey] : aParam;
};


$(document).ready(function(){
	var _category_no = getQueryString("category_no");
	var on_class = "";

	// 분류 HTML 변형
	$( "#board_category > option" ).each(function() {
		var _Val = $(this).val();

		if (_category_no == _Val) {
			on_class = 'class="on"';
		} else {
			on_class = "";
		}

		$("#board_category_custom").append('<span><a href="/myshop/mypage/center.html?board_no=3&category_no=' + _Val + '" ' + on_class + '>' + $(this).text() + '</a></span>');
 	});

	// 리스트 탭메뉴 on
	if ($('#board_menu_custom').length) {
		var _board_no = getQueryString("board_no");

		$('#board_menu_custom > li').removeClass('on');
		if (_board_no)
		{
			$('#board_menu_custom > li[data-boardno="' + _board_no + '"]').addClass('on');
		}
        else {
            _board_no = ((document.location.pathname).split('/'))[3];            
            if (_board_no)
            {
                $('#board_menu_custom > li[data-boardno="' + _board_no + '"]').addClass('on');
            }            
        }
	}

	if ($('#board_menu_custom_write').length) {
		var _board_no = getQueryString("board_no");

		$('#board_menu_custom_write > li').removeClass('on');
		if (_board_no)
		{
			$('#board_menu_custom_write > li[data-boardno="' + _board_no + '"]').addClass('on');
		}
        else {
            _board_no = ((document.location.pathname).split('/'))[3];            
            if (_board_no)
            {
                $('#board_menu_custom_write > li[data-boardno="' + _board_no + '"]').addClass('on');
            }            
        }
	}

	if ($('#board_menu_custom_modify').length) {
		var _board_no = getQueryString("board_no");

		$('#board_menu_custom_modify > li').removeClass('on');
		if (_board_no)
		{
			$('#board_menu_custom_modify > li[data-boardno="' + _board_no + '"]').addClass('on');
		}
        else {
            _board_no = ((document.location.pathname).split('/'))[3];            
            if (_board_no)
            {
                $('#board_menu_custom_modify > li[data-boardno="' + _board_no + '"]').addClass('on');
            }            
        }
	}

	// 상세 탭메뉴 on
	if ($('#board_menu_custom_read').length) {
		var _board_no = ((document.location.pathname).split('/'))[3];
		$('#board_menu_custom_read > li').removeClass('on');
		if (_board_no.length)
		{
			$('#board_menu_custom_read > li[data-boardno="' + _board_no + '"]').addClass('on');
		}
	}

	// 리스트 페이지 카테고리명 on
	if ($('#prdCateMenu').length) {
		var _cate_no = getQueryString("cate_no");
		$('#prdCateMenu > .perCate').removeClass('on');
		if (_cate_no)
		{
			$('#prdCateMenu > .perCate[data-cateno="' + _cate_no + '"]').addClass('on');			
		}
		else {
			_cate_no = ((document.location.pathname).split('/'))[3];					
			if (_cate_no.length)
			{
				$('#prdCateMenu > .perCate[data-cateno="' + _cate_no + '"]').addClass('on');
			}
		}
	}

	// 리스트 페이지 카테고리별 Visual Image
	if ($('#cateVisualSec').length) {
		var _cate_no = getQueryString("cate_no");
		$('#cateVisualSec > .cateVisual').hide();
		if (_cate_no)
		{
			$('#cateVisualSec > .cateVisual[data-cateno="' + _cate_no + '"]').show();			
		}
		else {
			_cate_no = ((document.location.pathname).split('/'))[3];					
			if (_cate_no.length)
			{
				$('#cateVisualSec > .cateVisual[data-cateno="' + _cate_no + '"]').show();
			}
		}
	}

	// 갤러리게시판 상세보기 콘텐츠 컨트롤
	if ($(".onlyReviewShow").length) {
        var pathArray = window.location.pathname.split("/");
        if (pathArray.length > 2) {
            if (pathArray[1] == "article") {				
                var board_no = pathArray[3];
                if (board_no == 12) {
                    $(".onlyReviewShow").show();
                } else {
                    $(".onlyReviewShow").hide();
                }
            }
        }
    }

	if ($(".galleryCate.event").length) {
        var board_no = getParameterByName("board_no");
        if (!board_no) {
            var pathArray = window.location.pathname.split("/");
            if (pathArray.length > 2) {
                if (pathArray[1] == "board") {
                    board_no = pathArray[3];
                }
            }
        }
        if (board_no) {
            if (board_no == "8") {
                $(".galleryCate.event").show();
				$(".reviewTab").hide();
                $("#bbsKind").removeClass("review");
				$(".xans-board-list-8").removeClass("review");
				$(".xans-board-paging-8.ec-base-paginate.typeList").removeClass("review");
            } else {
                $(".galleryCate.event").hide();
				$(".reviewTab").show();
                $("#bbsKind").addClass("review");
				$(".xans-board-list-8").addClass("review");
				$(".xans-board-paging-8.ec-base-paginate.typeList").addClass("review");
            }
        }
    }


});

/* 로그인 상태에 따른 진단 후 상세 호출 */
$(function() {
	    // 로그인 여부
    //if (sessionStorage.getItem('member_' + CAFE24.SDE_SHOP_NUM) !== null) {
	//if (CAFE24.FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.common_member_id_crypt !== null && CAFE24.FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.common_member_id_crypt !== "") {

	if ($('.xans-layout-statelogon').length) {
       // 로그인이 된 경우
	   $(".beforeLogin").hide();
	   $(".afterLogin").show();
    } else {
       // 로그인이 안 된 경우
	   $(".afterLogin").hide();
	   $(".beforeLogin").show();
    }
});


/* 카테고리별 상단 비주얼 변화 */
$(function() {
	const urlParams = new URLSearchParams(window.location.search);
	const cateNo = urlParams.get('cate_no');
	if (cateNo)
	{
		if (cateNo == '42') // 42 = skincare
		{
			$(".prdVisual").hide();
			$(".prdVisual.skin").show();
		} else {
			$(".prdVisual").hide();
			$(".prdVisual.hair").show();
		}
	}

});

/* 상품리스트 상단 txt  toggle */
$(function() {
	$(".prdVisual.hair .toggleTxt").click(function() {
		$(this).toggleClass("close");
		$(".prdVisual.hair .prdDescFull").slideToggle();
	});
	$(".prdVisual.skin .toggleTxt").click(function() {
		$(this).toggleClass("close");
		$(".prdVisual.skin .prdDescFull").slideToggle();
	});
});