function fnFourImageSlider() {
    if ($(".swiper.four-imgSlideWrapper").length > 0 && $(".four-imgSlideWrapper").length > 0) {
        $(".four-imgSlideWrapper").each(function() {
            var $this = $(this);
            var numberOfSlides = $this.find('.swiper-slide').length;
            
            var fourImgswiper = new Swiper(this, {
                direction: 'horizontal',
                parallax: true,
                slidesPerView: 4,
                spaceBetween: 20,
                scrollbar: {
                    el: $this.find('.swiper-scrollbar')[0],
                    draggable: true,
                },
                speed: 1500,
                navigation: {
                    nextEl: $this.find('.swiper-button-next')[0],
                    prevEl: $this.find('.swiper-button-prev')[0],
                },
                breakpoints: {
                    991: {
                        slidesPerView: 4,
                    },
                    481: {
                        slidesPerView: 1.6,
                        spaceBetween: 30,
                        loop: true
                    },
                    320: {
                        slidesPerView: 1.5,
                        spaceBetween: 30,
                        loop: true
                    },
                },
                on: {
                    slideChange: function() {
                        checkButtonState();
                    },
                }
            });

            function checkButtonState() {
                var nextButton = $this.find('.swiper-button-next');
                var prevButton = $this.find('.swiper-button-prev');
                
                if (numberOfSlides > 4) {
                    nextButton.show();
                    prevButton.show();
                } else {
                    nextButton.hide();
                    prevButton.hide();
                }
            }

            // Initial check
            checkButtonState();

            // Ensure buttons are not locked if more than 4 slides exist
            setTimeout(function(){
                if (numberOfSlides > 4) {
                    $this.find('.swiper-button-next').removeClass('swiper-button-lock');
                    $this.find('.swiper-button-prev').removeClass('swiper-button-lock');
                }
            }, 1000);
        });
    }
}




function fnanimateCounter() {
    if ($(".counter").length > 0) {
        $('.counter').each(function () {
            var $this = $(this);
            var startValue = parseFloat($this.data('counter-start')) || 0;
            var endValue = parseFloat($this.text().replace(/,/g, '')); // Remove any existing commas
            //console.log("startValue: " + startValue);
            //console.log("endValue: " + endValue);

            $this.prop('Counter', startValue).animate({
                Counter: endValue
            }, {
                duration: 4000,
                easing: 'swing',
                step: function (now) {
                    $this.text(Math.floor(now).toLocaleString('en-IN'));
                }
            });
        });
    }
}

// function isScrolledIntoView(elem) {
//     var $elem = $(elem);
//     var $window = $(window);

//     var docViewTop = $window.scrollTop();
//     var docViewBottom = docViewTop + $window.height();

//     var elemTop = $elem.offset().top;
//     var elemBottom = elemTop + $elem.height();

//     return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
// }

// $(window).on('scroll', function () {
//     if (isScrolledIntoView('.Com_fourimageslider')) {
//         console.log("Counter section is in view. Triggering counter animation.");
//         fnanimateCounter();
       
//         $(window).off('scroll');
//     }
// });


// $(document).ready(function() {
//     if (isScrolledIntoView('.Com_fourimageslider')) {
//         console.log("Counter section is in view on page load. Triggering counter animation.");
//         fnanimateCounter();
        
//         $(window).off('scroll');
//     }
// });


