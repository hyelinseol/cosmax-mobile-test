$(function() {
    $('.haiross_button_1').on('click', function() {
        let perfume_url = window.location.href
        navigator.clipboard.writeText(perfume_url)
        alert("URL이 복사되었습니다.\n친구에게 공유해보세요!");
    });  
});