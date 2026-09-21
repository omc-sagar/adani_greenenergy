let mySwiper;
function fnSliderBanner() {
    if ($(".bannerSlidermain").length > 0) {
        const progressbar = document.querySelector("#pbar");
        let players = []; // Array to hold YouTube players

        /* GSAP */
        var timeline = new TimelineMax({
            delay: 0,
            onComplete: function() {}
        });

        var timelineCopy = new TimelineMax({
            delay: 0,
            onComplete: function() {}
        });

        function loadYouTubeAPI() {
            return new Promise((resolve) => {
                var tag = document.createElement('script');
                tag.src = "https://www.youtube.com/iframe_api";
                var firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

                window.onYouTubeIframeAPIReady = resolve;
            });
        }

        function initializePlayersAndSwiper() {
            var swiper = document.getElementById('video-swiper');
            var slides = swiper.getElementsByClassName('swiper-slide');

            for (var i = 0; i < slides.length; i++) {
                var element = slides[i].getElementsByClassName('yt-player')[0];
                if (element) { // Check if the slide contains a YouTube player
                    var id = element.getAttribute('data-id');
                    var player = new YT.Player(element, {
                        height: '315',
                        width: '560',
                        videoId: id,
                        playerVars: {
                            autoplay: false, // We'll handle autoplay manually
                            controls: 0, // Hide controls
                            color: '#7fbc03',
                            modestbranding: true,
                            rel: 0
                        },
                        events: {
                            'onReady': onPlayerReady
                        }
                    });
                    players.push(player);
                }
            }

            function onPlayerReady(event) {
                // Play the first video when the player is ready
                if (players[0] && typeof players[0].playVideo === 'function') {
                    players[0].playVideo();
                }
            }

             mySwiper = new Swiper('.bannerSlidermain', {
                effect: 'slide',
                slidesPerView: 1,
                loop: true,
                parallax: true,
                loopedSlides: 1,
                scrollbar: '.swiper-scrollbar',
                //mousewheel: true,
                speed: 1500, // Adjusted for smoothness
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                autoplay: {
                    delay: 9000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: ".swiper-pagination",
                    type: "custom",
                    renderCustom: function(mySwiper, current, total) {
                        return ('0' + current).slice(-2);
                    },
                },
                on: {
                    autoplayTimeLeft(s, time, progress) {
                        fnwatchVideo();
                        progressbar.style.width = 100 - progress * 100 + '%';
                        if ((progress * 100) >= 18 && (progress * 100) <= 90) {
                            $('.bannerSlidermain').addClass('sThumbHide');
                        } else {
                            $('.bannerSlidermain').removeClass('sThumbHide');
                        }

                        // Check if progress bar is complete
                        if (progress === 0) {
                            var previousIndex = s.previousIndex;
                            var activeIndex = (s.activeIndex + 1) % s.slides.length; // Ensure it loops

                            if (players[previousIndex] && typeof players[previousIndex].pauseVideo === 'function') {
                                players[previousIndex].pauseVideo();
                            }
                            if (players[activeIndex] && typeof players[activeIndex].playVideo === 'function') {
                                players[activeIndex].playVideo();
                            }

                            s.slideNext(); // Move to the next slide
                        }
                    },
                    init: function() {
                        
                        runTimelineAnimationText();
                        // Autoplay the first video when the slider is initialized
                        if (players[0] && typeof players[0].playVideo === 'function') {
                            players[0].playVideo();
                        }
                    },
                    slideChange: function(swiper) {
                        var previousIndex = swiper.previousIndex;
                        var activeIndex = swiper.activeIndex;

                        // Pause the video of the previous slide
                        if (players[previousIndex] && typeof players[previousIndex].pauseVideo === 'function') {
                            players[previousIndex].pauseVideo();
                        }
                        // Play the video of the current slide
                        if (players[activeIndex] && typeof players[activeIndex].playVideo === 'function') {
                            players[activeIndex].playVideo();
                        }
                        if (slides.length > 1) {
                            runTimelineAnimationText();
                        }
                        
                    }
                }
            });

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
                beforeShow: function() {
                    mySwiper.autoplay.stop();
                  },
                  afterClose: function() {
                    mySwiper.autoplay.start();
                  }
            }); 

            // Hide progress bar if there's only one slide
            if (slides.length <= 1) {
                progressbar.style.display = 'none';
                $('.autoplay-progress').hide();
            }

            
            // Add event listeners to next and previous buttons to reset the progress bar and handle autoplay
            $(".swiper-button-next, .swiper-button-prev").on('click', function() {
                progressbar.style.width = '0%'; // Reset progress bar
                mySwiper.autoplay.stop(); // Stop autoplay
                setTimeout(() => {
                    mySwiper.autoplay.start(); // Restart autoplay
                }, 50); // Small delay to ensure proper reset
            });

            

            function onPlayerReady(event) {
                event.target.mute();
                event.target.playVideo();
            }
        }

        
        function runTimelineAnimationText() {
            timelineCopy.clear();
            timelineCopy.add([
                TweenMax.fromTo('.bannerSlidermain .title', 1.1, { alpha: 0, y: 50 }, { alpha: 1, y: 0, ease: Power2.easeInOut, delay: 0.75 }),
                TweenMax.fromTo('.bannerSlidermain .pargraph', 1.1, { alpha: 0, y: 50 }, { alpha: 1, y: 0, ease: Power2.easeInOut, delay: 1.0 }),
                TweenMax.fromTo('.bannerSlidermain .btns-wrap', 1.1, { alpha: 0, y: 50 }, { alpha: 1, y: 0, ease: Power2.easeInOut, delay: 1.25 })
            ]);
        }

        document.addEventListener('DOMContentLoaded', function() {
            loadYouTubeAPI().then(initializePlayersAndSwiper);
        });
        
        // Pause autoplay and timeline on mouse down
        $(".banner-main").on('mousedown', function(e) {
            console.log('mousedown event triggered', e.button);
            // Pause autoplay for any mouse button press
            console.log('Autoplay stopped');
            mySwiper.autoplay.pause();
        });

        // Resume autoplay and timeline on mouse up
        $(".banner-main").on('mouseup', function(e) {
            console.log('mouseup event triggered', e.button);
            // Resume autoplay for any mouse button release
            console.log('Autoplay started');
            mySwiper.autoplay.resume();
        }); 

    }
}
