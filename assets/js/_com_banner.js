function fnbanner(){

    if($(".HeroSlider").length > 0){
      var slideCountSelcter = document.getElementById("section-bannerNew"); 
      
      var slideCount = parseFloat(slideCountSelcter.getAttribute('data-slides'));
    var _s = 1;
    const progressbar = document.querySelector("#pbar");
    var activeSlidePosition = [];
    /* GSAP */
    timeline = new TimelineMax({
      delay: 0,
      onComplete: function() {
        //console.log("Animation Complete");
        //console.log("Duration: " + this.totalDuration() + "s");
      }
    });

    timelineCopy = new TimelineMax({
      delay: 0,
      onComplete: function() {
        //console.log("Animation Complete");
        //console.log("Duration: " + this.totalDuration() + "s");
      }
    });

  // Calculate slidesPerView with partial view of the last slide
  function calculateSlidesPerView(containerWidth, cardWidth) {
    if (window.innerWidth < 1024) {
      var slidesVisible = 3;
      return slidesVisible;
  } else {
      var slidesVisible = containerWidth / cardWidth;
      return slidesVisible > 1 ? slidesVisible : 1;
  }
  }
  var container = document.getElementById("cardWraper");
  var cardWidth;
  if(window.innerWidth < 768 )
  {
    cardWidth = 100;
  }
  else{
    cardWidth =180;
  }
  container.style.width = (cardWidth * ( slideCount - 1 ))  +"px";


    var Heroswiper = new Swiper(".HeroSlider", {
      slidesPerView: calculateSlidesPerView(container.clientWidth, cardWidth), // Calculate number of slides per view,
      spaceBetween: 20,
      loop: true,
      speed: 1000,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: "#heroBannerNext",
        prevEl: "#heroBannerPrev",
      },
      autoplay: {
        delay: 11000,
        disableOnInteraction: false
      },
      pagination: {
       /* el: ".swiper-pagination",
        type: "custom", // Set pagination type to custom
        renderCustom: function (swiper, current, total) {
          // Format the slide numbers with leading zeros
        // return ('0' + current).slice(-2) + ' / ' + ('0' + total).slice(-2);
          return ('0' + current).slice(-2) ;
        },*/
  },
  breakpoints: {
    "@0.00": {
      spaceBetween: 12,
    },
    
    "@1.50": {
      spaceBetween: 20,
    },
  },
  on: {
        autoplayTimeLeft(s, time, progress) {
         // console.log(progress);
          progressbar.style.width = 100 - progress * 100 +'%';
          fnwatchVideo();
          
        if((progress * 100) >= 25 && (progress * 100 ) <= 90)
         {
            $('.HeroSlider').addClass('sThumbHide');
            
         }
         else{
            $('.HeroSlider').removeClass('sThumbHide');
          
         }
         // progressContent.textContent = `${Math.ceil(time / 1000)}s`;
         //console.log('testprogress', progress)
        },
        init: function() 
        {
          // Set initialized flag to true when Swiper is initialized
          if($(window).width() < 991){
            setTimeout(function(){
              $("#layer1 .text-wraper").hide();
              runTimelineAnimationText();
            },300)
          }else{
            runTimelineAnimationText();
            $("#layer1 .text-wraper").show();
          }
          
          console.log('Swiper initialized');
        }, 
        
      }
    });
  

   function disabledEanbleNavSliderButtons()
    {
      var _heroBannerNext = document.getElementById("heroBannerNext");
      var _heroBannerPrev = document.getElementById("heroBannerPrev");
  
      _heroBannerNext.classList.add('swiper-button-disabled');
      _heroBannerNext.setAttribute('aria-disabled', true);

      _heroBannerPrev.classList.add('swiper-button-disabled');
      _heroBannerPrev.setAttribute('aria-disabled', true);
      setTimeout(function(){
         _heroBannerNext.classList.remove('swiper-button-disabled');
         _heroBannerNext.setAttribute('aria-disabled',false);
  
         _heroBannerPrev.classList.remove('swiper-button-disabled');
         _heroBannerPrev.setAttribute('aria-disabled', false);
      }, 2000)

    }
  
    function runTimelineAnimation() {
    //  console.log("dd" +activeSlidePosition.x);
      timeline.clear(); // Clear existing timeline
      timeline.add([
        TweenMax.to('#customslider #layer2  .img-box', 0.0, {x: activeSlidePosition.x, y: activeSlidePosition.y, width: activeSlidePosition.width, height: activeSlidePosition.height, ease: Cubic.easeInOut}),
       // TweenMax.to('#customslider #layer2  .img-box', 0.6, {x: activeSlidePosition.x - activeSlidePosition.width - 20,  ease: Cubic.easeInOut}),

        TweenMax.to('#customslider #layer2 .img-box',1.1, { x:0, y:0, width: '100%',height:'100%', ease: Back.easeOut.config(1) ,onComplete: function() {
           // Select the .img-box element
           var imgBox = document.querySelector('#customslider #layer2 .img-box');
            
           // Check if a video tag exists inside the .img-box
           var video = imgBox.querySelector('video');
           if (video) {
               // Add the 'active' class to the video tag
               video.classList.add('active');
               
               // Play the video
               video.play();
           }
      }}),
      ]);
    }

    function runTimelineAnimationText() {
      timelineCopy.clear();
      timelineCopy.add([
        TweenMax.to('#customslider #layer2  .title', 0.0, { alpha:0, y:50, ease: Cubic.easeInOut }),
        TweenMax.to('#customslider #layer2 .pargraph', 0.0, { alpha:0, y:50, ease: Cubic.easeInOut }),
        TweenMax.to('#customslider #layer2 .btns-wrap', 0.0, { alpha:0, y:50, ease: Cubic.easeInOut }),

        TweenMax.to('#customslider #layer2  .title', 1.1, { alpha:1, y:0, ease: Cubic.easeInOut, delay: 0.5 }),
        TweenMax.to('#customslider #layer2 .pargraph', 1.1, { alpha:1, y:0, ease: Cubic.easeInOut, delay: 0.75 }),
        TweenMax.to('#customslider #layer2 .btns-wrap', 1.1, { alpha:1, y:0, ease: Cubic.easeInOut, delay: 1 }),
      ]);
    }


    Heroswiper.on("realIndexChange", function() {
      disabledEanbleNavSliderButtons();
      
      
      if(_s != 0)
      {
        layer2CopyToLayer1();
        setTimeout(function() {
          slideContentCopy(); // Copy HTML of active slide
          runTimelineAnimation(); // Run animation on newly copied content
          runTimelineAnimationText()
      }, 20);
      }
      else{
        _s = 1;
      }

    });

  
    function layer2CopyToLayer1() {
      var cSlide = $('#layer2').html();
      $('#layer1').html(cSlide);
    }
  
    function slideContentCopy() {
      var data = $('.swiper-slide-active').html();
      $("#customslider #layer2").html(data);
      activeSlidePosition = document.querySelector('.swiper-slide-active').getBoundingClientRect();
     //console.log(activeSlidePosition);
    }

     // Pause autoplay and timeline on mouse enter
     $(".banner").on( 'mousedown',function (e) {
      e.preventDefault();
      //swiper.autoplay.stop();
      Heroswiper.autoplay.pause();
    });

    // Resume autoplay and timeline on mouse leave
    $(".banner").on( 'mouseup',function () {
     // swiper.autoplay.start();
     Heroswiper.autoplay.resume();
    });
   
   // Adjust the slidesPerView on window resize
  window.addEventListener('resize', function() {
    Heroswiper.params.slidesPerView = calculateSlidesPerView(container.clientWidth, cardWidth);
    Heroswiper.update();
  });


}
}