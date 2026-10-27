function initGSAPScroll() {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);

  ScrollTrigger.defaults({
    toggleActions: "reverse pause",
    invalidateOnRefresh: true,
    scrub: false,
  });

  // Enable ScrollSmoother only for desktop
  if (window.innerWidth > 380) {
    let smoother = ScrollSmoother.create({
      smooth: 2,
      effects: true,
      normalizeScroll: true,
      ignoreMobileResize: false,
    });
  } else {
    // Kill smoother if exists (optional safeguard)
    if (ScrollSmoother.get()) {
      ScrollSmoother.get().kill();
    }
  }
}
function fnParallaxSection() {
  document.querySelectorAll(".parallax-section").forEach((section) => {
    const img = section.querySelector(".parallax-img");
    if (!img) return;

    const moveAmount = 40;

    gsap.fromTo(
      img,
      { yPercent: -moveAmount / 2 },
      {
        yPercent: moveAmount / 2,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          // if using ScrollSmoother, use scroller: smoother.target (not needed in default)
          markers: false,
        },
      },
    );
  });
}
function homepage() {
  var winWT = window.innerWidth || document.documentElement.clientWidth;
  var winHT = window.innerHeight || document.documentElement.clientHeight;
  /*   if (winWT >= 1081) { */
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);

  ScrollTrigger.defaults({
    toggleActions: "reverse pause",
    invalidateOnRefresh: true,
    scrub: true,
  });

  // create the smooth scroller
  let smoother = ScrollSmoother.create({
    smooth: 2,
    effects: true,
    normalizeScroll: true,
    ignoreMobileResize: false,
  });

  /*   } */

  /* // toggleFullscreen()
           var fullButton = document.getElementById("fullscreen");
           var pause = document.getElementById("pause");
           var mute = document.getElementById("mute");
       
           fullButton.addEventListener("click", function () {
               toggle();
           });
       
           function toggle() {
               // Select the video element inside .elevate-img
               var elm = document.querySelector(".elevate-img video");
               if (!elm) {
                   console.error("No video found inside");
                   return;
               }
               console.log(elm);
               // Check for and invoke the appropriate fullscreen API
               if (elm.requestFullscreen) {
                   elm.requestFullscreen(); // HTML5 Fullscreen API
               } else if (elm.webkitEnterFullscreen) {
                   console.log("webkitEnterFullscreen enable");
                   elm.webkitEnterFullscreen();
               } else if (elm.webkitRequestFullscreen) {
                   elm.webkitRequestFullscreen(); // Chrome, Safari
               } else if (elm.mozRequestFullScreen) {
                   elm.mozRequestFullScreen(); // Firefox
               } else {
                   alert("Fullscreen API not supported on this device/browser.");
               }
           } */

  // Get the buttons
  var fullButton = document.getElementById("fullscreen");
  var pauseButton = document.getElementById("pause");
  var muteButton = document.getElementById("mute");

  // Event listener for fullscreen
  fullButton.addEventListener("click", function () {
    toggleFullscreen();
  });

  // Event listener for pause
  pauseButton.addEventListener("click", function () {
    togglePause();
  });

  // Event listener for mute
  muteButton.addEventListener("click", function () {
    toggleMute();
  });

  // Function to toggle fullscreen
  function toggleFullscreen() {
    var elm = document.querySelector(".elevate-img video");
    if (!elm) {
      console.error("No video found inside");
      return;
    }

    if (elm.requestFullscreen) {
      elm.requestFullscreen(); // HTML5 Fullscreen API
    } else if (elm.webkitEnterFullscreen) {
      console.log("webkitEnterFullscreen enable");
      elm.webkitEnterFullscreen();
    } else if (elm.webkitRequestFullscreen) {
      elm.webkitRequestFullscreen(); // Chrome, Safari
    } else if (elm.mozRequestFullScreen) {
      elm.mozRequestFullScreen(); // Firefox
    } else {
      alert("Fullscreen API not supported on this device/browser.");
    }
  }

  // Function to toggle pause/play
  function togglePause() {
    var elm = document.querySelector(".elevate-img video");
    if (!elm) {
      console.error("No video found inside");
      return;
    }

    if (elm.paused) {
      elm.play(); // Play the video if paused
    } else {
      elm.pause(); // Pause the video if playing
    }
  }

  // Function to toggle mute/unmute
  function toggleMute() {
    var elm = document.querySelector(".elevate-img video");
    if (!elm) {
      console.error("No video found inside");
      return;
    }

    elm.muted = !elm.muted; // Toggle the muted property
  }
}

function fnParllexBar() {
  if ($(".panel").length > 0) {
    if ($(window).width() > 1025) {
      let panels = gsap.utils.toArray(".panel");
      // we'll create a ScrollTrigger for each panel just to track when each panel's top hits the top of the viewport (we only need this for snapping)
      let tops = panels.map((panel) =>
        ScrollTrigger.create({ trigger: panel, start: "top 1px" }),
      );

      panels.forEach((panel, i) => {
        ScrollTrigger.create({
          trigger: panel,
          start: () =>
            panel.offsetHeight < window.innerHeight
              ? "top top"
              : "bottom bottom", // if it's shorter than the viewport, we prefer to pin it at the top
          //end:"bottom top",
          pin: true,
          pinSpacing: false,
        });
      });

      // ScrollTrigger.create({
      //   snap: {
      //     snapTo: (progress, self) => {
      //       let panelStarts = tops.map(st => st.start), // an Array of all the starting scroll positions. We do this on each scroll to make sure it's totally responsive. Starting positions may change when the user resizes the viewport
      //           snapScroll = gsap.utils.snap(panelStarts, self.scroll()); // find the closest one
      //       return gsap.utils.normalize(0, ScrollTrigger.maxScroll(window), snapScroll); // snapping requires a progress value, so convert the scroll position into a normalized progress value between 0 and 1
      //     },
      //     duration: 1.3
      //   }
      // })

      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

      ScrollTrigger.defaults({
        toggleActions: "reverse pause",
        invalidateOnRefresh: true,
        scrub: false,
        // markers: { startColor: "red", endColor: "blue", fontSize: "18px", indent: 10 }
      });

      // create the smooth scroller
      let smoother = ScrollSmoother.create({
        smooth: 2,
        effects: true,
        normalizeScroll: true,
        ignoreMobileResize: false,
      });
    }
  }

  //gsap.registerPlugin(SplitText, ScrollTrigger);

  // Animations

  // const gsapTimeLine = gsap.timeline({
  // scrollTrigger: {
  //   trigger: "#section-growth.panel",
  //   start: "top center",
  //   end:"+=40%",
  //   scrub: 1,
  //   // toggleClass: 'active'
  // }
  // }).from("#section-growth.panel .growth-heading",  {opacity: 0, y: 100, duration: 1})
  // .from("#section-growth.panel .growth-subtext", {opacity: 0, y: 100, duration: 1.2})
  // .from("#section-growth.panel .btn-animation", {opacity: 0, y: 100,  duration: 1.4})

  // const gsapBusness = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: "#section-business.panel",
  //     start: "top center",
  //     end:"+=40%",
  //     scrub: 1,
  //     once: true,
  //   }
  // }).from("#section-business.panel .com-heading", {opacity: 0, y: 100, duration: 0.5})
  //   .from("#section-business.panel .business-list-wrap", {opacity: 0, y: 100, duration: 0.8})
  //   .from("#section-business.panel .bussiness-slider-wrap",{opacity: 0, x: 100, duration: 1.2})

  //   const gsapSustainability = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: "#section-sustainability.panel",
  //       start: "top center",
  //       end:"+=50%",
  //       scrub: 1
  //     }
  //   }).from("#section-sustainability.panel .Sustainability-wrapper .com-heading", {opacity: 0, y: 100, duration: 0.5})
  //     .from("#section-sustainability.panel .com-threeImageSlider", {opacity: 0, x: -200, duration: 0.8})
  // .from("#section-sustainability.panel .com-threeImageSlider .slide-text-box", 1, {opacity: 0, X: 100, duration: 1.8})

  //     //const gsapmenu = gsap.timeline()
  //     //gsapmenu.from("header .logo", 2, {opacity: 0, duration: 1.1})
  //     //gsapmenu.from("header .nav-wrap", 1, {opacity: 0, duration: 1.1})

  //     const gsapmenu = gsap.timeline();

  //   gsapmenu.from("header .logo img, header .nav-wrap, header .right-menu", 1.8, {
  //   y: -60,
  //   ease: "power4.out",
  //   delay: 1,
  //   skewY: 0,
  //   stagger: {
  //     amount: 0.3
  //   }
  //  })

  //     const gsapNewsroom = gsap.timeline({
  //       scrollTrigger: {
  //         trigger: "#section-newsroom.panel",
  //         start: "top center",
  //         end:"+=50%",
  //         scrub: 1
  //       }
  //     }).from("#section-newsroom.panel .newsroom-wrapper .com-heading", 1, {opacity: 0, x: -100, duration: 1.2})
  //       .from("#section-newsroom.panel .right-btn .gradient-button", 1, {opacity: 0, y: 100, duration: 1.4})
  //       .from("#section-newsroom.panel .com-twoImageSlider .image-box", 1, {opacity: 0, y: 100, duration: 1.8})
  //       .from("#section-newsroom.panel .com-twoImageSlider .slide-text-box", 1, {opacity: 0, y: 100, duration: 2.0})

  //       const gsapvideo = gsap.timeline({
  //         scrollTrigger: {
  //           trigger: "#section-videos.panel",
  //           start: "top center",
  //           end:"+=50%",
  //           scrub: 1
  //         }
  //       }).from("#section-videos.panel .video-text", 1, {opacity: 0, y: 100, duration: 1.2})
  //         .from("#section-videos.panel .btns-wrap", 1, {opacity: 0, y: 100, duration: 1.4})

  //         const gsapTimeline = gsap.timeline({
  //           scrollTrigger: {
  //             trigger: "#section-timeline.panel",
  //             start: "top center",
  //             end:"+=60%",
  //             scrub: 1
  //           }
  //         }).from("#section-timeline.panel .timeline-heading", 1, {opacity: 0, y: 100, duration: 1.4})
  //           .from("#section-timeline.panel .timeline-text", 1, {opacity: 0, x: 100, duration: 1.6})
  //           .from("#section-timeline.panel .timeline-box", 1, {opacity: 0, y: 100, duration: 1.8})

  //           const gsapCareer = gsap.timeline({
  //             scrollTrigger: {
  //               trigger: "#section-career.panel",
  //               start: "top center",
  //               end:"+=50%",
  //               scrub: 1
  //             }
  //           }).from("#section-career.panel .career-left-sec .com-heading", 1, {opacity: 0, y: 100, duration: 1.4})
  //             .from("#section-career.panel .career-btn", 1, {opacity: 0, y: 100, duration: 1.5})
  //             .from("#section-career.panel .career-right-sec", 1, {opacity: 0, x: 300, duration: 1.8})

  //             const gsapFoundation = gsap.timeline({
  //               scrollTrigger: {
  //                 trigger: "#section-foundation.panel",
  //                 start: "top center",
  //                 end:"+=55%",
  //                 scrub: 1
  //               }
  //             }).from("#section-foundation.panel .foundation-image-wrap", 1, {opacity: 0, x: -200, duration: 1.4})
  //               .from("#section-foundation.panel .foundation-text-wrap .com-heading", 1, {opacity: 0, y: 100, duration: 1.6})
  //               .from("#section-foundation.panel .foundation-about-info", 1, {opacity: 0, y: 300, duration: 1.8})

  //               const gsapfooter = gsap.timeline({
  //                 scrollTrigger: {
  //                   trigger: "footer",
  //                   start: "top center",
  //                   end:"+=40%",
  //                   scrub: 1
  //                 }
  //               }).from("footer .footer-wrapper", 1, {opacity: 0, y: 100, duration: 1.4})
  //               .from("footer .footer-policy", 1, {opacity: 0, y: 100, duration: 1.5})

  //}
  //}
  // Ensure the image starts with 0 opacity

  //  if($("#smooth-content").length > 0){
  //   if(window.innerWidth >= 1200)
  //     {

  //       /*gsap declaratio for animation*/
  //       gsap.set([".growth-right-sec .growth-heading", ".growth-right-sec .growth-subtext", ".growth-right-sec .btn-animation" ], { alpha: 0, y:"50px" });
  //       gsap.set(["#section-business .business-list-wrap > li", ], { alpha: 0, y:"50px" });

  //     gsap.set([
  //   "#section-sustainability .three-imgeSlideBox:nth-child(1) .image-box", "#section-sustainability .three-imgeSlideBox:nth-child(1) .slide-text-box",
  //   "#section-sustainability .three-imgeSlideBox:nth-child(2) .image-box", "#section-sustainability .three-imgeSlideBox:nth-child(2) .slide-text-box",
  //   "#section-sustainability .three-imgeSlideBox:nth-child(3) .image-box", "#section-sustainability .three-imgeSlideBox:nth-child(3) .slide-text-box",
  //   ], { alpha: 0, y:"90px" });

  //   gsap.set([
  //     "#section-newsroom .two-imgeSlideBox:nth-child(1) .image-box", "#section-newsroom .two-imgeSlideBox:nth-child(1) .slide-text-box",
  //     "#section-newsroom .two-imgeSlideBox:nth-child(2) .image-box", "#section-newsroom .two-imgeSlideBox:nth-child(2) .slide-text-box",
  //   ], { alpha: 0, y:"90px" });

  //   gsap.set([
  //  "#section-newsroom .right-btn", "#section-newsroom  .swiper-button-prev", "#section-newsroom  .swiper-button-next"
  //   ], {alpha:0, x:"50px"});

  //   gsap.set([
  //     "#section-videos .video-text", "#section-videos .btns-wrap",
  //   ], { alpha: 0, y:"90px" });

  //   gsap.set([ "#section-career .career-btn" ], { alpha: 0, y:"50px" });
  //   gsap.set([
  //     "#section-career .swiper-button-prev", "#section-career  .swiper-button-next"
  //      ], {alpha:0, x:"50px"});

  //   gsap.set(["#section-last .foundation-right-sec .com-heading", "#section-last .foundation-right-sec .foundation-about-info" ], { alpha: 0, y:"50px" });

  //  // Create a timeline for the animation
  //  const growthTimeline = gsap.timeline({ paused: true, delay: 0 });
  //  const businessTimeline = gsap.timeline({ paused: true, delay: 0 });
  //  const sustainabilityTimeline =  gsap.timeline({ paused: true, delay: 0 });
  //  const newsroomTimeline =  gsap.timeline({ paused: true, delay: 0 });
  //  const videoTimeline =  gsap.timeline({ paused: true, delay: 0 });
  //  const careerTimeline = gsap.timeline({ paused: true, delay: 0 });
  //  const foundationTimeline = gsap.timeline({ paused: true, delay: 0 });

  //  var scrollToTopBtn = document.getElementById("bottomToTop");
  //  //flag value for animation
  //  var flag_growth = false;
  //  var flag_business = false;
  //  var flag_sustainability = false;
  //  var flag_newsroom =false;
  //  var flag_video =false;
  //  var flag_career =false;
  //  var flag_foundation = false;

  //  // Add the animation to the timeline
  //  growthTimeline.add( [

  //   gsap.to("#section-growth .growth-right-sec .growth-heading",         0.5,      {alpha:   1.0, y:0,  delay: 0.0}),
  //   gsap.to("#section-growth .growth-right-sec .growth-subtext",         0.5,      {alpha:   1.0, y:0, delay: 0.1}),
  //   gsap.to("#section-growth .growth-right-sec .btn-animation",         0.5,      {alpha:   1.0, y:0, delay: 0.2}),

  //  ])
  //  businessTimeline.add( [
  //   gsap.to("#section-business .business-list-wrap li:nth-child(1)",         0.5,      {alpha:   1.0, y:0, delay: 0.0}),
  //   gsap.to("#section-business .business-list-wrap li:nth-child(2)",         0.5,      {alpha:   1.0, y:0, delay: 0.3}),

  //   gsap.to("#section-business .business-list-wrap li:nth-child(3)",         0.5,      {alpha:   1.0, y:0, delay: 0.9}),
  //   gsap.to("#section-business .business-list-wrap li:nth-child(4)",         0.5,      {alpha:   1.0, y:0, delay: 1.2}),

  //   gsap.to("#section-business .business-list-wrap li:nth-child(5)",         0.5,      {alpha:   1.0, y:0, delay: 1.5}),
  //   gsap.to("#section-business .business-list-wrap li:nth-child(6)",         0.5,      {alpha:   1.0, y:0, delay: 1.8}),
  //   gsap.to("#section-business .business-list-wrap li:nth-child(7)",         0.5,      {alpha:   1.0, y:0, delay: 2.1}),

  //  ])

  //  sustainabilityTimeline.add( [
  //   gsap.to("#section-sustainability .three-imgeSlideBox:nth-child(1) .image-box",         0.5,      {alpha:   1.0, y:0, delay: 0.0}),
  //   gsap.to("#section-sustainability .three-imgeSlideBox:nth-child(1) .slide-text-box",         0.5,      {alpha:   1.0, y:0, delay: 0.3}),

  //   gsap.to("#section-sustainability .three-imgeSlideBox:nth-child(2) .image-box",         0.5,      {alpha:   1.0, y:0, delay: 0.3}),
  //   gsap.to("#section-sustainability .three-imgeSlideBox:nth-child(2) .slide-text-box",         0.5,      {alpha:   1.0, y:0, delay: 0.6}),

  //   gsap.to("#section-sustainability .three-imgeSlideBox:nth-child(3) .image-box",         0.5,      {alpha:   1.0, y:0, delay: 0.6}),
  //   gsap.to("#section-sustainability .three-imgeSlideBox:nth-child(3) .slide-text-box",         0.5,      {alpha:   1.0, y:0, delay: 0.9}),

  //  ])

  //  newsroomTimeline.add( [
  //   gsap.to("#section-newsroom .two-imgeSlideBox:nth-child(1) .image-box",         0.5,      {alpha:   1.0, y:0, delay: 0.0}),
  //   gsap.to("#section-newsroom .two-imgeSlideBox:nth-child(1) .slide-text-box",         0.5,      {alpha:   1.0, y:0, delay: 0.3}),

  //   gsap.to("#section-newsroom .two-imgeSlideBox:nth-child(2) .image-box",         0.5,      {alpha:   1.0, y:0, delay: 0.3}),
  //   gsap.to("#section-newsroom .two-imgeSlideBox:nth-child(2) .slide-text-box",         0.5,      {alpha:   1.0, y:0, delay: 0.6}),

  //   gsap.to("#section-newsroom .right-btn",         0.5,      {alpha:   1.0, x:0, delay: 0.6}),
  //   gsap.to("#section-newsroom .swiper-button-prev",         0.5,      {alpha:   1.0, x:0, delay: 0.6}),
  //   gsap.to("#section-newsroom .swiper-button-next",         0.5,      {alpha:   1.0, x:0, delay: 0.6}),

  //  ])
  //  videoTimeline.add([
  //   gsap.to("#section-videos .video-text",         0.5,      {alpha:   1.0, y:0, delay: 0.0}),
  //   gsap.to("#section-videos .btns-wrap",         0.5,      {alpha:   1.0, y:0, delay: 0.2}),
  //  ])

  //  careerTimeline.add([
  //   /*
  //   gsap.to("#section-career .com-heading h2",         0.5,      {alpha:   1.0, y:0, delay: 0.0}),
  //   gsap.to("#section-career .com-heading span",         0.5,      {alpha:   1.0, y:0, delay: 0.0}),
  // */
  //   gsap.to("#section-career  .career-btn",         0.5,      {alpha:   1.0, y:0, delay: 0.5}),
  //   gsap.to("#section-career .swiper-button-prev",         0.5,      {alpha:   1.0, x:0, delay: 0.6}),
  //   gsap.to("#section-career .swiper-button-next",         0.5,      {alpha:   1.0, x:0, delay: 0.6}),

  // ])

  //  foundationTimeline.add( [
  //   gsap.to("#section-last .foundation-right-sec .com-heading",         0.5,      {alpha:   1.0, y:0, delay: 0.0}),
  //   gsap.to("#section-last .foundation-right-sec .foundation-about-info",         0.5,      {alpha:   1.0, y:0, delay: 0.2}),
  //  ])

  //       /**gsap declration end  */

  //       var myFullpage = new fullpage('#smooth-content', {
  //         licenseKey: 'gplv3-license',
  //         verticalCentered: false,
  //         scrollingSpeed: 800,
  //         easingcss3: 'cubic-bezier(.53,.62,.66,.74)',
  //         afterLoad: function(origin, destination, direction){
  //           const section = destination.item;
  //           console.log("destination index : "+ destination.item );

  //           if(destination.index === 0)
  //             {
  //               scrollToTopBtn.classList.remove("active");
  //             }
  //             else{
  //               scrollToTopBtn.classList.add("active");
  //             }
  //         // Play the animation only for section with index 1 (second section)
  //         if (destination.index === 1 && flag_growth != true)
  //           {
  //             growthTimeline.restart(true, false); // Restart the timeline smoothly
  //             flag_growth = true;
  //             $("#section-growth").addClass('noAnimation');
  //           }

  //           if (destination.index === 2 && flag_business != true)
  //             {
  //               businessTimeline.restart(true, false); // Restart the timeline smoothly
  //               $("#section-business").addClass('noAnimation');
  //               flag_business=true;

  //             }
  //             if (destination.index === 3 && flag_sustainability != true)
  //             {
  //               sustainabilityTimeline.restart(true, false);
  //               $("#section-sustainability").addClass('noAnimation');
  //               flag_sustainability=true;
  //             }
  //             if (destination.index === 4 && flag_newsroom != true)
  //               {
  //                 newsroomTimeline.restart(true, false);
  //                 $("#section-newsroom").addClass('noAnimation');
  //                 flag_newsroom=true;
  //               }

  //               if (destination.index === 5 && flag_video != true )
  //               {
  //                   videoTimeline.restart(true, false); // Restart the timeline smoothly
  //                   $('video')[0].play();
  //                   flag_video = true;
  //               }
  //               if (destination.index === 5  )
  //                 {
  //                   $('video')[0].play(); // for video playing on
  //                 }
  //               if (destination.index === 6 && flag_career != true)
  //               {
  //                 careerTimeline.restart(true, false); // Restart the timeline smoothly
  //                 $("#section-career").addClass('noAnimation');
  //                 flag_career = true;
  //               }
  //               if (destination.index === 7 && flag_foundation != true)
  //               {
  //                 foundationTimeline.restart(true, false); // Restart the timeline smoothly
  //                 $("#section-last").addClass('noAnimation');
  //                 flag_foundation = true;
  //               }

  //       },
  //       afterRender: function(){
  //         $('video')[0].play();
  //       }

  //       });
  //     }
  // }
  // $(window).on('load', function(){
  //   $('section').addClass('pin-spacer');
  // })
}

function fnwatchVideo() {
  setTimeout(function () {
    if ($("#popupVideo").length > 0) {
      $(".open-video-btn").on("click", function () {
        var videoSrc = $(this).data("video-src");
        var videoType = $(this).data("video-type");

        // Pause the slider
        if (typeof mySwiper !== "undefined") {
          mySwiper.autoplay.stop();
        }

        if (videoType === "youtube") {
          // Convert regular YouTube URL to embed URL
          var videoId = videoSrc.split("v=")[1];
          var ampersandPosition = videoId.indexOf("&");
          if (ampersandPosition !== -1) {
            videoId = videoId.substring(0, ampersandPosition);
          }
          var embedUrl =
            "https://www.youtube.com/embed/" +
            videoId +
            "?autoplay=1&controls=0&rel=0&showinfo=0&modestbranding=1&mute=0&loop=1&fs=0&playsinline=1&disablekb=1&iv_load_policy=3&cc_load_policy=0";

          // Show iframe for YouTube video
          $("#popupIframe").attr("src", embedUrl);
          $("#popupIframe").show();
          $("#popupVideo").hide();
        } else {
          // Show video element for local video
          $("#popupVideo").attr("src", videoSrc);
          $("#popupVideo").show();
          $("#popupIframe").hide();
        }

        $("#videoPopup").show();
        $("body").css("overflow", "hidden");

        if (videoType !== "youtube") {
          $("#popupVideo").on("canplay", function () {
            $("#popupVideo")[0].play();
          });
        }
      });

      $("#closeVideoBtn").on("click", function () {
        $("#popupVideo")[0].pause();
        $("#popupVideo")[0].currentTime = 0;
        $("#popupVideo").attr("src", "");

        // Stop the YouTube video by reloading the iframe
        $("#popupIframe").attr("src", "");
        $("#popupIframe").hide();

        // Hide the video popup
        $("#videoPopup").hide();
        $("body").css("overflow", "initial");

        // Resume the slider
        if (typeof mySwiper !== "undefined") {
          mySwiper.autoplay.start();
        }
      });

      // Reset the iframe src on popup hide to ensure reload on next open
      $("#videoPopup").on("hide", function () {
        $("#popupIframe").attr("src", "");
      });
    }
  }, 1000);
}

function replaceImageDataSrc() {
  var sources = document.querySelectorAll(".iblur source");
  sources.forEach(function (source) {
    var dataSrcset = source.getAttribute("data-srcset");
    if (dataSrcset) {
      source.setAttribute("srcset", dataSrcset);
    }
  });
}

function replaceVideosDataSrc() {
  var videos = document.querySelectorAll(".vlazy");
  videos.forEach(function (video) {
    var source = video.querySelector("source");
    if (source) {
      var dataSrc = source.getAttribute("data-src");
      //console.log(dataSrc);
      if (dataSrc) {
        source.setAttribute("src", dataSrc);
        video.load(); // Reload the video element with the new source

        // Mute the video to allow autoplay
        video.muted = true;

        video.addEventListener("loadedmetadata", function () {
          // Once the video metadata is loaded, play the video
          video.play().catch(function (error) {
            console.log("Autoplay prevented:", error);
          });
        });
      }
    }
  });
}

// Call the function on document load
window.addEventListener("load", replaceVideosDataSrc);

function fnredirectToUrl(element) {
  if (element && element.getAttribute) {
    const url = element.getAttribute("data-url");
    if (url) {
      window.location.href = url;
    } else {
      console.log("Invalid URL: data-url attribute is missing or empty");
    }
  } else {
    //console.log('Invalid element: element is undefined or does not have getAttribute method');
  }
}

function fnReadMore() {
  $(".morecontent").each(function () {
    var $this = $(this),
      $btn = $this.next(".readmre-btn");

    // Set default line height based on viewport
    var lineHeight;
    if (window.innerWidth <= 768) {
      // Mobile view
      lineHeight = 30;
    } else if (window.innerWidth <= 1024) {
      // Tablet view
      lineHeight = 32;
    } else {
      // Desktop view
      lineHeight = 32;
    }

    // Check if URL contains '/hi-in'
    if (window.location.pathname.includes("/hi-in")) {
      //lineHeight += 4; // Increase line height for '/hi-in'
    }

    var maxHeight = lineHeight * 2; // Height equivalent to 2 lines of text

    // Calculate total height of all child elements
    var contentHeight = 0;
    $this.find("*").each(function () {
      contentHeight += $(this).outerHeight();
    });

    var isShortContent = contentHeight <= maxHeight;

    // Debugging logs
    /*console.log('Line Height:', lineHeight);
    console.log('Content Height:', contentHeight);
    console.log('Max Height:', maxHeight);
    console.log('Is Short Content:', isShortContent);*/

    // Always show the button if content exceeds 2 lines
    if (contentHeight > maxHeight) {
      $btn.removeClass("hidden");
      $this.addClass("collapsed");
    } else {
      $btn.addClass("hidden");
      $this.removeClass("collapsed");
    }
  });

  $(".readmre-btn").click(function () {
    var $this = $(this),
      $content = $this.prev(".morecontent");

    $content.toggleClass("collapsed");
  });
  if ($("#expandContent").length > 0) {
    document.addEventListener("DOMContentLoaded", function () {
      const readMoreButton = document.getElementById("expand-data");
      const contentSection = document.getElementById("content");

      let isExpanded = false;

      readMoreButton.addEventListener("click", function () {
        if (isExpanded) {
          gsap.to("#expandContent", {
            //height: "100vh",
            duration: 1,
            onComplete: () => {
              ScrollTrigger.refresh();
            },
          });
        } else {
          gsap.to(contentSection, {
            height: "auto",
            duration: 1,
            onComplete: () => {
              ScrollTrigger.refresh();
            },
          });
        }

        isExpanded = !isExpanded;
      });
    });
  }
}

function fnLoadMore() {
  var windowWidth = $(window).width();
  if (windowWidth <= 767) {
    $(".loadMorecontent").each(function () {
      var $this = $(this),
        $btn = $this.next(".loadmore-btn"),
        lineHeight = parseFloat($this.css("line-height"));

      // Check if lineHeight is a valid number, otherwise use a default value
      if (isNaN(lineHeight)) {
        lineHeight = 60; // Default line height in pixels, adjust as needed
      }

      var maxHeight = lineHeight * 3,
        contentHeight = $this.outerHeight(),
        isShortContent = contentHeight <= maxHeight;

      if (isShortContent) {
        $btn.addClass("hidden");
        $this.removeClass("collapsed");
      } else {
        $btn.removeClass("hidden");
        $this.addClass("collapsed");
      }
    });

    $(".loadmore-btn").click(function (e) {
      //e.preventDefault();
      var $this = $(this),
        $content = $this.prev(".loadMorecontent");
      $content.toggleClass("collapsed");
      $this.text(
        $content.hasClass("collapsed")
          ? $this.attr("data-more")
          : $this.attr("data-less"),
      );
    });
  }
}

// blog slider

function fnBlogSlider() {
  if ($(".blogslider").length > 0) {
    $(".blogslider").each(function () {
      var BlogImgswiper = new Swiper(this, {
        direction: "horizontal",
        loop: true,
        parallax: true,
        slidesPerView: 1,
        scrollbar: ".swiper-scrollbar",
        speed: 1500,
        navigation: {
          nextEl: ".blogslider .swiper-button-next",
          prevEl: ".blogslider .swiper-button-prev",
        },
      });
    });
  }
}

$.fn.isInViewport = function () {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();

  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();

  return elementBottom > viewportTop && elementTop < viewportBottom;
};

$(window).on("resize scroll", function () {
  $("#section-growth").each(function () {
    if ($(this).isInViewport()) {
      $(".growth-left-sec").addClass("active");
    } else {
      $(".growth-left-sec").removeClass("active");
    }
  });
});

function fnActivetab() {
  document.addEventListener("DOMContentLoaded", function () {
    // Get the current URL path
    var path = window.location.pathname;
    var menuItems = document.querySelectorAll(".nav-wrap > li");
    menuItems.forEach(function (menuItem) {
      var link = menuItem.querySelector("a");
      if (link) {
        var href = link.getAttribute("href");
        if (path.startsWith(href)) {
          menuItem.classList.add("active");
        }
      }
    });
  });
}

function detectPlatform() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Variables to store detected platform
  var isMac = false;
  var isWindows = false;
  var isMobile = false;

  // Detect macOS
  if (/Mac/i.test(userAgent) && !/iPhone|iPad|iPod/i.test(userAgent)) {
    isMac = true;
  }

  // Detect Windows
  if (/Windows/i.test(userAgent)) {
    isWindows = true;
  }

  // Detect mobile devices (iOS, Android)
  if (/iPhone|iPad|iPod|Android/i.test(userAgent)) {
    isMobile = true;
  }

  // Add classes to the body
  if (isMac) {
    document.body.classList.add("mac");
  }
  if (isWindows) {
    document.body.classList.add("windows");
  }
  /*   if (isMobile) {
    document.body.classList.add("mobile");
  } */
}

function bottomToTop() {
  if ($("#bottomToTop").length > 0) {
    var scrollToTopBtn = document.querySelector("#bottomToTop");
    var rootElement = document.documentElement;
    function handleScroll() {
      var scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
      if (rootElement.scrollTop / scrollTotal > 0.2) {
        // Show button
        scrollToTopBtn.classList.add("active");
      } else {
        // Hide button
        scrollToTopBtn.classList.remove("active");
      }
    }

    function scrollToTop() {
      // Scroll to top logic
      var webpageUrl = window.location.pathname;
      //console.log(webpageUrl);
      // if(webpageUrl == "/" || webpageUrl == "/index.html")
      //   {
      //     fullpage_api.moveTo(1);
      //     //console.log('test');
      //   }
      //   else{

      //     rootElement.scrollTo({
      //       top: 0,
      //       behavior: "smooth"
      //     })

      //   }

      rootElement.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    scrollToTopBtn.addEventListener("click", scrollToTop);
    document.addEventListener("scroll", handleScroll);
  }
}

//js for increasing addition z-index in sibling section

$(".careerPage section").each(function (index) {
  $(this).css("z-index", index + 1);
});

if ($(".sustainabilityCompWrap").length > 0) {
  // Get all thumbnails
  const thumbnails = document.querySelectorAll(".subcard");
  let currentIndex = 0;
  let interval;

  // Function to remove active class from all thumbnails
  function removeActiveClass() {
    thumbnails.forEach((thumbnail) => {
      thumbnail.classList.remove("active");
    });
  }

  // Function to add active class to the current thumbnail
  function addActiveClass(index) {
    thumbnails[index].classList.add("active");
  }

  // Function to start the interval
  // function startInterval() {
  //     interval = setInterval(() => {
  //         removeActiveClass();
  //         currentIndex = (currentIndex + 1) % thumbnails.length;
  //         addActiveClass(currentIndex);
  //     }, 5000);
  // }

  // Function to reset the interval
  // function resetInterval() {
  //     clearInterval(interval);
  //     startInterval();
  // }

  // Add event listeners to thumbnails
  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => {
      removeActiveClass();
      addActiveClass(index);
      currentIndex = index; // Update the current index
      resetInterval(); // Reset the interval timer
    });
  });

  // Initialize first thumbnail as active and start the interval
  addActiveClass(currentIndex);
  //startInterval();
}

if ($(".sustainabilityCompWrap").length > 0) {
  function fnDatabg() {
    document.addEventListener("DOMContentLoaded", function () {
      var cards = document.querySelectorAll(".subcard");
      cards.forEach(function (card) {
        var imageUrl = card.getAttribute("data-bg");
        card.style.backgroundImage = "url(" + imageUrl + ")";
      });
    });
  }
}
/* function fnTextPopup() {
  const $popup = $("#text-poup-overlay");
  if (!$popup.length) return;

  let popupOpen = false; // popup open / close state
  let popupTriggered = false; // 👈 ONE TIME PER REFRESH
  let freezeScrollTop = 0;

  $(window).on("scroll", function () {
    // 🔒 popup open असताना background freeze
    if (popupOpen) {
      $(window).scrollTop(freezeScrollTop);
      return;
    }

    // ❌ already shown once → never open again
    if (popupTriggered) return;

    const scrollTop = $(window).scrollTop();
    const docHeight = $(document).height();
    const winHeight = $(window).height();

    const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;

    if (scrollPercent >= 30) {
      freezeScrollTop = scrollTop;

      $popup.fadeIn(200);

      popupOpen = true;
      popupTriggered = true; // ✅ lock forever (till refresh)
    }
  });

  $(".close-btn").on("click", function () {
    $popup.fadeOut(200);

    // 🔓 scroll allow
    popupOpen = false;
  });
} */

function fnquoteSlider() {
  if ($(".quotes-slider").length > 0) {
    const quoteswiper = new Swiper(".quotes-slider", {
      slidesPerView: 1,
      slidesPerView: 1,
      spaceBetween: 30,
      grabCursor: true,
      autoplay: true,
      speed: 500,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      autoplay: {
        delay: 7000,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }
}

function fnCompanyVisionSlider() {
  if ($(".company_vision_img_slider").length > 0) {
    const quoteswiper = new Swiper(".company_vision_img_slider", {
      slidesPerView: 1,
      slidesPerView: 1,
      spaceBetween: 30,
      grabCursor: true,
      autoplay: true,
      speed: 500,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }
}

function updateIndiaMapForDarkMode() {
  if ($("html").hasClass("dark-mode")) {
    $(".solar-map #indiaMap")
      .find("rect[fill='#FFF4F4'], path[fill='#FFF4F4']")
      .attr("fill", "#2a090a");
  } else {
    $(".solar-map #indiaMap")
      .find("rect[fill='#2a090a'], path[fill='#2a090a']")
      .attr("fill", "#FFF4F4");
  }
  if ($("html").hasClass("dark-mode")) {
    $(".wind-map #indiaMap")
      .find("rect[fill='#E5F7F0'], path[fill='#E5F7F0']")
      .attr("fill", "#002315");
  } else {
    $(".wind-map #indiaMap")
      .find("rect[fill='#002315'], path[fill='#002315']")
      .attr("fill", "#E5F7F0");
  }
  if ($("html").hasClass("dark-mode")) {
    $(".hybrid-map #indiaMap")
      .find("rect[fill='#E5F8F6'], path[fill='#E5F8F6']")
      .attr("fill", "#1c081d");
  } else {
    $(".hybrid-map #indiaMap")
      .find("rect[fill='#1c081d'], path[fill='#1c081d']")
      .attr("fill", "#E5F8F6");
  }
  if ($("html").hasClass("dark-mode")) {
    $(".storage-map #indiaMap")
      .find("rect[fill='#E5F0F8'], path[fill='#E5F0F8']")
      .attr("fill", "#001624");
  } else {
    $(".storage-map #indiaMap")
      .find("rect[fill='#001624'], path[fill='#001624']")
      .attr("fill", "#E5F0F8");
  }
}

const observer = new MutationObserver(() => {
  if ($("#indiaMap").length) {
    updateIndiaMapForDarkMode();
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

function scrollToHash() {
  const hash = window.location.hash;
  if (!hash) return;

  const target = document.querySelector(hash);
  if (!target) {
    console.warn("Target not found:", hash);
    return;
  }

  // Let ScrollSmoother fully settle
  gsap.delayedCall(0.3, () => {
    gsap.to(window, {
      scrollTo: {
        y: target,
        offsetY: 0,
      },
      duration: 1,
      ease: "power2.out",
    });
  });
}

function setBannerHeight() {
  if ($(window).width() < 1220) {
    var overlayHeight = $(
      ".short-banner-spotlight .video-overlay-text",
    ).outerHeight();

    // Add 300px
    var finalHeight = overlayHeight + 200;

    $(".short-banner-spotlight").css("height", finalHeight + "px");
  } else {
    $(".short-banner-spotlight").css("height", "");
  }
}
$(window).on("resize", function () {
  setBannerHeight();
});

function fnInnerScroll() {
  $(".home-solution-tab, .left-menu, .table-responsive").each(function () {
    const el = this;

    // stop ScrollSmoother capturing scroll
    $(el).on("wheel", function (e) {
      e.stopPropagation();
    });

    // mobile touch support
    $(el).on("touchstart touchmove", function (e) {
      e.stopPropagation();
    });

    // pointer events (for some browsers)
    $(el).on("pointerdown pointermove", function (e) {
      e.stopPropagation();
    });
  });
}
