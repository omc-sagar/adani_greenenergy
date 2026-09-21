function comTwoAndHalfSliderInit() {
    if($('.comTwoAndHalfSliderInit').length > 0 )
        {
            document.addEventListener('DOMContentLoaded', function () {

                var Careerswiper = new Swiper('.comTwoAndHalfSliderInit', {
                    slidesPerView: 2.5,
                    spaceBetween: 50,
                    centeredSlides: false,
                    navigation: {
                        nextEl: ".comTwoAndHalfSlider .swiper-button-next",
                        prevEl: ".comTwoAndHalfSlider .swiper-button-prev",
                    },
                    speed: 1000,
                    // parallax: true,
                    // freeMode:true,
                    delay: 6500,
                    breakpoints: {
                        2100: {
                            slidesPerView: 2.3,
                            spaceBetween: 20
                        },
                        1440: {
                            slidesPerView: 2.12,
                            spaceBetween: 20
                        },
                        1200: {
                            slidesPerView: 2.3,
                            spaceBetween: 20
                        },
                        991: {
                            slidesPerView: 2.2,
                        },
                        767: {
                            slidesPerView: 1.5,
                            //   loop: true,
                            spaceBetween: 20,
                        },
                        320: {
                            slidesPerView: 1.1,
                            loop: true,
                            spaceBetween: 20
                        }
        
                    }
        
                });
                var Careerslides = document.querySelectorAll('.comTwoAndHalfSliderInit .swiper-slide');
                var activeIndex = Careerswiper.activeIndex;
                // Careerslides.forEach(function (slide, index) {
                //     slide.addEventListener('mouseenter', function () {
                //         Careerswiper.slideTo(index);
                //     });
        
                //     slide.addEventListener('mouseleave', function () {
                //         Careerswiper.slideTo(activeIndex); 
                //     });
                // });
        
                // Careerswiper.on('slideChange', function () {
                //     activeIndex = Careerswiper.activeIndex;
                // });
            });

    }

}

function valueSliderInit() {

    if($('.value-thumbs-slider').length > 0)
    {
        // document.addEventListener('DOMContentLoaded', function () {
        //     var galleryThumbs = new Swiper('.value-thumbs-slider', {
        //         spaceBetween: 1,
        //         slidesPerView: 6,
        //         centeredSlides: false,
        //         freeMode: true,
        //         watchSlidesVisibility: true,
        //         watchSlidesProgress: true,
        //         navigation: {
        //             nextEl: '.value-slider-wrapper .swiper-button-next',
        //             prevEl: '.value-slider-wrapper .swiper-button-prev',
        //         },
        //         pagination: {
        //             el: ".swiper-pagination",
        //             clickable: true, 
        //             renderBullet: function (index, className) {
        //               return '<span class="' + className + '">0' + (index + 1) + "</span>";
        //             },
        //         },
        //         breakpoints: {
        //             0: {
        //                 slidesPerView: 2.5,
        //                 spaceBetween: 20,
        //             },
        //             767: {
        //                 slidesPerView: 2.5,
        //                 spaceBetween: 24,
        //             },
        //             988: {
        //                 slidesPerView: 6,
        //                 spaceBetween: 48,
        //             }
        //         }
        //     });
    
        //     var galleryTop = new Swiper('.value-slider', {
        //         slidesPerView: 1,
        //         spaceBetween: 0,
        //         thumbs: {
        //             swiper: galleryThumbs
        //         }
        //     });
        // });

        var thumbsSwiper = new Swiper(".value-thumbs-slider", {
            loop: false,
            spaceBetween: 8,
            slidesPerView: 2,
            freeMode: true,
            centeredSlides: false,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            /* pagination: {
                el: ".swiper-pagination",
                clickable: true, 
                renderBullet: function (index, className) {
                    return '<span class="' + className + '">' + (index + 1) + "</span>";
                },
            }, */
            breakpoints: {
                0:{
                    slidesPerView: 2.5,
                    spaceBetween: 20,
                },
                767:{
                    slidesPerView: 2.5,
                    spaceBetween: 24,
                },
                988:{
                    slidesPerView: 5.2,
                    spaceBetween: 48,
                },
                1440:{
                    slidesPerView: 4.96,
                    spaceBetween: 48,
                },
                1600:{
                    slidesPerView: 5.2,
                    spaceBetween: 48,
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

        function updateNavigation(thumbsSwiper) {
            var $prevButton = $(thumbsSwiper.navigation.prevEl);
            var $nextButton = $(thumbsSwiper.navigation.nextEl);
            
            // Disable the prev button if we're at the beginning
            if (thumbsSwiper.isBeginning) {
              $prevButton.addClass('disabled');
            } else {
              $prevButton.removeClass('disabled');
            }
            
            // Disable the next button if we're at the end
            if (thumbsSwiper.isEnd) {
              $nextButton.addClass('disabled');
            } else {
              $nextButton.removeClass('disabled');
            }
        }

        updateNavigation(thumbsSwiper);

        var Careerswiper2 = new Swiper(".value-slider", {
            loop: false,
            spaceBetween: 10,
            navigation: {                       
                nextEl: ".value-thumbs-slider .swiper-button-next",
                prevEl: ".value-thumbs-slider .swiper-button-prev",
            },
            
            thumbs: {
                swiper: thumbsSwiper,
            }
        });

        var Valueslides = document.querySelectorAll('.value-slider .swiper-slide');
        var ValueactiveIndex = Careerswiper2.ValueactiveIndex;

    } 

}