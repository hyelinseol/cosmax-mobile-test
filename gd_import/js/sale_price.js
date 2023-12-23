EC$(function ($) {
    //모바일더보기버튼
    mobInfo();
    $(".xans-product-listmore").click(function () {
        mobInfo();
    });
    function mobInfo() {
        //페이지전체상품체크
        var size = $(".prdList > li").length;
        var setInfo = setInterval(function () {
            discount();
            //console.log('play');
            if (size < $(".prdList > li").length) {
                clearInterval(setInfo);
                //console.log('end');
            }
        }, 100);
    }

    discount();
    function discount() {
        //상품목록
        $(".prdList").each(function () {
            $(this)
                .find("> li")
                .each(function () {
                    var price3 = String($(this).find(".description").attr("ec-data-price3")).replace(/\,/g, "").replace("원", ""); //소비자가;
                    var price4 = String($(this).find(".description").attr("ec-data-price4")).replace(/\,/g, "").replace("원", ""); //소비자가;
                    if (price3 > 0 && price4 > 0) {
                        var pp1 = parseInt(price3);
                        var pp2 = parseInt(price4);
                        if (!isNaN(pp1) && !isNaN(pp2)) {
                            //console.log(121212);
                            var discountRate = Math.floor(((pp1 - pp2) / pp1) * 100);
                            if (discountRate > 0 && discountRate != 100) {
                                //alert($(this).find('.description .disPrice').length);
                                $(this)
                                    .find(".description .disPrice")
                                    .text(discountRate + "%");

                                $(this).find(".spec").addClass("otDis");
                            }
                        }
                    } else {
                        var price1 = String($(this).find(".description").attr("ec-data-custom")).replace(/\,/g, "").replace("원", ""); //소비자가
                        var price2 = String($(this).find(".description .price.origin").text()).replace(/\,/g, "").replace("원", ""); //판매가
                        var price2 = price2.split(" "); //판매가참조화폐 구분
                        if (!isNaN(price1) && !isNaN(price2[0])) {
                            discountRate = Math.floor(((price1 - price2[0]) / price1) * 100);
                            if (discountRate > 0 && discountRate != 100 && $(this).find(".ec-sale-rate").length < 1) {
                                $(this)
                                    .find(".price:not(.sale)")
                                    .append('<div class="ec-sale-rate">' + discountRate + "%</div>");

                                $(this).find(".spec").addClass("otDis");
                            }
                        }
                    }
                });
        });

        $(".js-sale-price").each(function () {
            var price3 = String($(this).find(".description").attr("ec-data-price3")).replace(/\,/g, "").replace("원", ""); //소비자가;
            var price4 = String($(this).find(".description").attr("ec-data-price4")).replace(/\,/g, "").replace("원", ""); //소비자가;
            if (price3 > 0 && price4 > 0) {
                var pp1 = parseInt(price3);
                var pp2 = parseInt(price4);
                if (!isNaN(pp1) && !isNaN(pp2)) {
                    //console.log(121212);
                    var discountRate = Math.floor(((pp1 - pp2) / pp1) * 100);
                    if (discountRate > 0 && discountRate != 100) {
                        //alert($(this).find('.description .disPrice').length);
                        $(this)
                            .find(".description .disPrice")
                            .text(discountRate + "%");

							$(this)
                            .find(".price.sale:not(.displaynone)")
                            .show();

                        $(this).find(".spec").addClass("otDis");
                    }
                }
            } else {
                var price1 = String($(this).find(".description").attr("ec-data-custom")).replace(/\,/g, "").replace("원", ""); //소비자가
                var price2 = String($(this).find(".description .price.origin").text()).replace(/\,/g, "").replace("원", ""); //판매가
                var price2 = price2.split(" "); //판매가참조화폐 구분
                if (!isNaN(price1) && !isNaN(price2[0])) {
                    discountRate = Math.floor(((price1 - price2[0]) / price1) * 100);
                    if (discountRate > 0 && discountRate != 100 && $(this).find(".ec-sale-rate").length < 1) {
                        $(this)
                            .find(".price:not(.sale)")
                            .append('<div class="ec-sale-rate">' + discountRate + "%</div>");

                        $(this).find(".spec").addClass("otDis");
                    }
                }
            }
        });
    }

    if ($(".xans-product-detaildesign").length) {
        discount2();
        function discount2() {
            //상품상세
            var price1 = String($("#prdInfo #span_product_price_custom").text()).replace(/\,/g, "").replace("원", ""); //소비자가
            var price2 = String($("#prdInfo #span_product_price_text").text()).replace(/\,/g, "").replace("원", ""); //판매가
            var price2 = price2.split(" "); //판매가참조화폐 구분
            if (!isNaN(price1) && !isNaN(price2[0])) {
                discountRate = Math.floor(((price1 - price2[0]) / price1) * 100);
                if (discountRate > 0 && discountRate != 100 && $(this).find(".ec-sale-rate").length < 1) {
                    $(".prdDesc .ProductPrice").append('<span class="ec-sale-rate">' + discountRate + "%</span>");
                }
            }
        }
    }
});
