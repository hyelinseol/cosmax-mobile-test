/* 상세페이지 탭 */
$('.detailTab').each(function(){
    var $this=$(this);
    var $btn=$this.find('.btn > li');
    var $con=$this.find('.con > li');
    var current=0;
    $btn.eq(current).addClass('on');
    $con.eq(current).addClass('on');
    $btn.bind('click',function(){
        current=$btn.index($(this));
        $btn.removeClass('on');
        $btn.eq(current).addClass('on');
        //
        $con.removeClass('on');
        $con.eq(current).addClass('on');
    })
});

$('.tab01').on('click', function() {
    $('.treatment').hide()
    $('.shampoo').show()
})

$('.tab02').on('click', function() {
    $('.shampoo').hide()
    $('.treatment').show()
})