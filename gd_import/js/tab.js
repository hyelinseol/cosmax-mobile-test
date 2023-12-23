/* 탭진열 */
$('.detailTab').each(function(){
    var $this=$(this);
    var $btn=$this.find('.menu > li');
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


$('.prdTab').each(function(){
    var $this=$(this);
    var $btn=$this.find('.menu > li');
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

/*$('.listTab').each(function(){
    var $this=$(this);
    var $btn=$this.find('.menu02 > li');
    var $con=$this.find('.con02 > li');
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
*/
/* $('.reviewTab').each(function(){
    var $this=$(this);
    var $btn=$this.find('.menu03 > li');
    var $con=$this.find('.con03 > li');
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
});*/

