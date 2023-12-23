window.addEventListener(
  "load",
  async function (event) {

		EC$(function($) {
			//할인율표기
			function discount(){
				//상품목록
				$('.perPrdInfo').each(function(){
					var pp1 = String($(this).attr('data-price1')).replace(/\,/g, '').replace('원', '');
					var pp2 = String($(this).attr('data-price2')).replace(/\,/g, '').replace('원', '');
					//alert(pp1 + ' , ' + pp2);
					var product_sale_price = false;
					if (!isNaN(pp1) && !isNaN(pp2)) {
						var discountRate = Math.round((pp1 - pp2) / pp1 * 100);
						if(discountRate > 0 && discountRate != 100) {
							$(this).find('.prdPerPrice.ct-type1 .disPrice').text(discountRate + '%');
							$(this).find('.prdPerPrice.ct-type1').show();
							$(this).find('.prdPerPrice.ct-type2').hide();
		
							product_sale_price = true;
						}
					}
		
					if (product_sale_price == false) {
						$(this).find('.prdPerPrice.ct-type1').hide();
						$(this).find('.prdPerPrice.ct-type2').show();
					}
				});
		
				$('.prd-list > li').each(function(){
					var pp1 = String($(this).attr('data-price1')).replace(/\,/g, '').replace('원', '');
					var pp2 = String($(this).attr('data-price2')).replace(/\,/g, '').replace('원', '');
					//alert(pp1 + ' , ' + pp2);
					var product_sale_price = false;
					if (!isNaN(pp1) && !isNaN(pp2)) {
						var discountRate = Math.round((pp1 - pp2) / pp1 * 100);
						if(discountRate > 0 && discountRate != 100) {
							$(this).find('.disPrice').text(discountRate + '%');
							product_sale_price = true;
						}
					}
		
					if (product_sale_price == false) {
						//$(this).find('.prdPerPrice.ct-type1').hide();
						//$(this).find('.prdPerPrice.ct-type2').show();
					}
				});
		
				$('.total-price-wrap').each(function(){
					var pp1 = String($(this).attr('data-price1')).replace(/\,/g, '').replace('원', '');
					var pp2 = String($(this).attr('data-price2')).replace(/\,/g, '').replace('원', '');
					if (!pp2 && typeof product_sale_price !== 'undefined')
					{
						pp2 = product_sale_price;
					}
					var product_sale_price_bool = false;
					if (!isNaN(pp1) && !isNaN(pp2)) {
						var discountRate = Math.round((pp1 - pp2) / pp1 * 100);
						if(discountRate > 0 && discountRate != 100) {
							$(this).find('.discount').text(discountRate + '%');
							product_sale_price_bool = true;
						}
					}
		
					if (product_sale_price_bool == false) {
						$(this).find('.discount').remove();
					}
				});
		
			}
		
			discount();
		});

  },
  false
);