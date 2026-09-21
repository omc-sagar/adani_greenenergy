function fntwoImageSlider(){
  if ($(".swiper").length > 0 && $(".two-imgSlideWrapper").length > 0) {
    $(".two-imgSlideWrapper").each(function(){
      var TwoImgswiper = new Swiper(this, {
        direction: 'horizontal',
        parallax: true,
        slidesPerView: 2, 
        spaceBetween: 20,
        scrollbar: {
          el: '.swiper-scrollbar',
        },
        speed: 1500,                                              
        navigation: {                       
          nextEl: ".two-imgSlideWrapper .swiper-button-next",
          prevEl: ".two-imgSlideWrapper .swiper-button-prev",
        },
        breakpoints: {
          991: {
            slidesPerView: 2,
            spaceBetween: 40,
            
          },
          481: {
            slidesPerView: 1.5,
            spaceBetween: 30,
            loop:true
          },
          320: {
            slidesPerView: 1.2,
            spaceBetween: 20,
            loop:true
          },
        },
        on: {
          init: function () {
            updateNavigation(this);
          },
          slideChange: function () {
            updateNavigation(this);
          },
          reachBeginning: function () {
            updateNavigation(this);
          },
          reachEnd: function () {
            updateNavigation(this);
          },
        },
      });

      function updateNavigation(swiper) {
        var $prevButton = $(swiper.navigation.prevEl);
        var $nextButton = $(swiper.navigation.nextEl);
        
        // Disable the prev button if we're at the beginning
        if (swiper.isBeginning) {
          $prevButton.addClass('disabled');
        } else {
          $prevButton.removeClass('disabled');
        }
        
        // Disable the next button if we're at the end
        if (swiper.isEnd) {
          $nextButton.addClass('disabled');
        } else {
          $nextButton.removeClass('disabled');
        }
      }

      // Initial check
      
      function checkButtonState() {
        if ($(".two-imgSlideWrapper .swiper-button-next").hasClass("swiper-button-disabled") && 
            $(".two-imgSlideWrapper .swiper-button-prev").hasClass("swiper-button-disabled")) {
          $(".two-imgeSlideBox").addClass('activeClass');
        } else {
          $(".two-imgeSlideBox").removeClass('activeClass');
        }
      }
      checkButtonState();

      updateNavigation(TwoImgswiper);

    });
  }
}
