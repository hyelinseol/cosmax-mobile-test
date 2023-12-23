$(function(){
	var swiper = new Swiper('.txtNavi .swiper-container', {
		spaceBetween: 0,
		centeredSlides: true,
		speed: 20000,
		autoplay: {
			delay: 1,
			},
		loop: true,
		slidesPerView:'auto',
		allowTouchMove: false,
		disableOnInteraction: true,
	});
    
    let controller = new ScrollMagic.Controller();
    let sceneFixed = new ScrollMagic.Scene({
		triggerElement: '.shampoo .detail_02.linear',
		duration: '100%',
		triggerHook : .7
	})
	.setPin('.shampoo  .represcription .sec03', {pushFollowers: false})
	.addTo(controller)
    
    let controller2 = new ScrollMagic.Controller();
    let sceneFixed2 = new ScrollMagic.Scene({
		triggerElement: '.treatment .detail_02.linear',
		duration: '100%',
		triggerHook : .7
	})
	.setPin('.treatment .represcription .sec03', {pushFollowers: false})
	.addTo(controller2)
    
});