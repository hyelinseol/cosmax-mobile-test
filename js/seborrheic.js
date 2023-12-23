$(function() {
    $('.seborrheic_button1').on('click', function() {
        let perfume_url = window.location.href
        navigator.clipboard.writeText(perfume_url)
        alert("URL이 복사되었습니다.\n친구에게 공유해보세요!");
    });
    
    let seborrheic_button2 = $('.seborrheic_button2');
    let seborrheic_bottom = $('.seborrheic_bottom');
    
    seborrheic_button2.on("click",function(){
        let seborrheic_check = $('.seborrheic_top input:checked');
        
        seborrheic_bottom.removeClass("seborrheic_bottom1 , seborrheic_bottom2 , seborrheic_bottom3 , seborrheic_bottom4");
        
        if( seborrheic_check.length >= 4 ){
        	seborrheic_bottom.addClass('seborrheic_bottom4');
        }else if( seborrheic_check.length >= 3 ){
        	seborrheic_bottom.addClass('seborrheic_bottom3');
        }else if( seborrheic_check.length >= 2 ){
        	seborrheic_bottom.addClass('seborrheic_bottom2');
        }else if( seborrheic_check.length >= 0 ){
        	seborrheic_bottom.addClass('seborrheic_bottom1');
        }
    })
    
});