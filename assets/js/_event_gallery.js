
function eventgallery() {
    // Fancybox Config
        
    $('[data-fancybox="images"]').fancybox({
        loop : true,
        transitionDuration : 100,
        animationDuration : 500,
        animationEffect : "fade",
        buttons : [
            'slideShow',
            'fullScreen',
            'thumbs',
            //'share',
            'download',
            //'zoom',
            'close'
        ],
        slideShow : {
            autoStart : false,
            speed     : 300,
        },
        thumbs : {
        autoStart : true,
        },
        
    }); 
   
    
  
}