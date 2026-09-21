
function businessTab() {
    if ($(".business-menu").length > 0) {
        $('.business-menu li > a').on('click', function (e) {
            var target = $(this).attr('data-rel');
            var dataSrc = $(this).attr('data-src');
            
            if ($(this).hasClass('active')) {
                // Redirect to the URL specified in data-src if the element already has the 'active' class
                window.location.href = dataSrc;
                return;
            }

            $(this).parent().siblings().removeClass('business-listing');   
            $('.business-menu li > a').removeClass('active');
            $(this).addClass('active');
            $(this).parent().addClass('business-listing');  
            $("#" + target).fadeIn('slow').siblings(".business-gallery").hide();
        });

        // Uncomment and modify the following section if needed
        // $('.business-listing a').on('click', function() {
        //     console.log("Anchor tag clicked!");
        //     $(this).next('.business-content').toggle();
        // });
    }

    $(".business-right-tab > ul > li > a").on('click', function (){
        $(".business-right-tab > ul > li > a").removeClass('active');
        $(this).addClass('active');
        let busnessTab = $(this).attr('data-business-tab');
        $('.business-details-comp').removeClass('active');
        $("#"+busnessTab).addClass('active');
    });


    function CareerVideos(){
        $('[data-fancybox="video"]').fancybox({
            loop : false,
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
            autoStart : false,
            },
            
        }); 
    }
    CareerVideos();

    $(".business-tab-home li > a").on('click', function (err){
        let businessSubTab = $(this).attr('data-business-sub-tab');
        var businessdataSrc = $(this).attr('business-data-src');
    
        if ($(this).hasClass('active')) {
    
            let activeBusinessRightSec = $(".business-right-sec.active");
    
            if (activeBusinessRightSec.length && activeBusinessRightSec.find('.watch-cta > a')) {

                activeBusinessRightSec.find('.watch-cta > a').trigger('click');
            }

            
            // Redirect if businessdataSrc has a URL
            if (businessdataSrc) {
                window.location.href = businessdataSrc;
                //return; 
            }
        }
    
        // Remove active class from all links and add to the clicked one
        $(".business-tab-home > li > a").removeClass('active');
        $(this).addClass('active');
        
        // Show the corresponding right section
        $('.business-right-sec').removeClass('active');
        $("#" + businessSubTab).addClass('active');
    });
    
}


function businessFeature(){
if($(".show-sub-head").length > 0){
$('.show-sub-head').on('click', function(){
    $(this).prev().slideToggle();
    $(this).toggleClass('showless');
    if($(this).find('span').text() === 'Show'){
        $(this).find('span').text("Hide")
    }
     else{
         $(this).find('span').text("Show")
     }


});
}
}

function businessTabSlider(){
    if($(".tech-swiper").length > 0){
    var BusnessSwaper = new Swiper('.tech-swiper', {
        lazy: true,
        loop: true,
        slidesPerView: 1,
        spaceBetween: 0,
        autoplay: {
            delay: 5000,
          },
         effect:"fade" ,
        
    });
   
  }
    
}