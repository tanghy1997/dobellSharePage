$(function(){
    $(window).scroll(function(){
        var y = $(document).scrollTop();
        if(y > 10){
            $('.mask').fadeOut('slow')
        }else {
            $('.mask').fadeIn('slow')
        }
    });

})