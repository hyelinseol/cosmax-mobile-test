setP();
$(window).on('load resize', function(){ setP() });
function setP(){
    $('.profile_now').css('height', $('.profile_now').height());
}
var profile_edit = new Swiper('.profile_now',{
    direction: 'vertical',
    loop: false,
    allowTouchMove: false,
    centeredSlides: true,
    effect: 'fade',
    scrollbar: {
        el: '.profileArea .profile_list .bar',
        hide: false,
        draggable: true,
    },
});
$('.profileArea .profile_list ul li').on('click', function(){
    profile_edit.slideTo($(this).index());
});