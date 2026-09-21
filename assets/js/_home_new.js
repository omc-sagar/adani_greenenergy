/* function fnHomeVideoSlider() {
  var $slider = $(".HomeVideoSlider");
  var slideCount = $slider.find(".swiper-slide").length;

  var swiper = new Swiper(".HomeVideoSlider", {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: slideCount > 1, 
    speed: 1000,

    navigation:
      slideCount > 1
        ? {
            nextEl: ".video-next",
            prevEl: ".video-prev",
          }
        : false,

    on: {
      slideChangeTransitionStart: function () {
        $(".HomeVideoSlider video").each(function () {
          this.pause();
          this.currentTime = 0;
        });

        var $activeSlide = $(this.slides[this.activeIndex]);
        var video = $activeSlide.find("video").get(0);
        if (video) {
          video.play().catch(function () {});
        }
      },
    },
  });

  if (slideCount <= 1) {
    $(".video-next, .video-prev").hide();
  }
} */

function fnHomeVideoSlider() {
  var $slider = $(".HomeVideoSlider");
  var slideCount = $slider.find(".swiper-slide").length;

  function updateVideoSource() {
    $(".HomeVideoSlider video").each(function () {
      var video = this;
      var $video = $(video);

      var desktopVideo = $video.attr("data-video-desktop");
      var mobileVideo = $video.attr("data-video-mobile");

      var newSrc =
        window.innerWidth <= 767 && mobileVideo ? mobileVideo : desktopVideo;

      if (video.getAttribute("src") !== newSrc) {
        video.pause();
        video.setAttribute("src", newSrc);
        video.load();
      }
    });
  }

  // Set correct video source initially
  updateVideoSource();

  var swiper = new Swiper(".HomeVideoSlider", {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: slideCount > 1,
    speed: 1000,

    navigation:
      slideCount > 1
        ? {
            nextEl: ".video-next",
            prevEl: ".video-prev",
          }
        : false,

    on: {
      init: function () {
        var video = $(this.slides[this.activeIndex]).find("video").get(0);
        if (video) {
          video.play().catch(function () {});
        }
      },

      slideChangeTransitionStart: function () {
        $(".HomeVideoSlider video").each(function () {
          this.pause();
          this.currentTime = 0;
        });

        var video = $(this.slides[this.activeIndex]).find("video").get(0);

        if (video) {
          video.play().catch(function () {});
        }
      },
    },
  });

  // Change video source on resize
  $(window)
    .off("resize.homeVideo")
    .on("resize.homeVideo", function () {
      var activeIndex = swiper.activeIndex;

      updateVideoSource();

      $(".HomeVideoSlider video").each(function () {
        this.pause();
        this.currentTime = 0;
      });

      var video = $(swiper.slides[activeIndex]).find("video").get(0);
      if (video) {
        video.play().catch(function () {});
      }
    });

  // Hide navigation if only one slide
  if (slideCount <= 1) {
    $(".video-next, .video-prev").hide();
  }
}

function fnBoxBgAni() {
  gsap.to(".bg-box", {
    scaleY: 1, // expand full height
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".gallery-top",
      start: "top 80%", // start at middle
      end: "bottom 30%", // end near bottom
      scrub: true,
    },
  });
}
function fuRevenueBoxAni() {
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(
    ".revenuebg-box",
    {
      scaleY: 0,
      borderRadius: "0px",
      transformOrigin: "top center",
    },
    {
      scaleY: 1,
      borderRadius: "20px", // radius increases with scroll
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".chart-container",
        start: "top 70%",
        end: "bottom 90%",
        scrub: true,
      },
    },
  );
}

function fuVideoAni() {
  gsap.registerPlugin(ScrollTrigger);

  const images = document.querySelectorAll(".gallery-img");
  const playBtns = document.querySelectorAll(".play-btn");

  // ❌ If no gallery images → stop function (prevents error)
  if (!images.length) return;

  // =========================
  // IMAGE ANIMATION
  // =========================
  images.forEach((img) => {
    gsap.fromTo(
      img,
      { scale: 0.4, opacity: 0.5, borderRadius: "0px" },
      {
        scale: 1,
        opacity: 1,
        borderRadius: "10px",
        scrollTrigger: {
          trigger: img,
          start: "top 100%",
          end: "bottom 90%",
          scrub: true,
        },
      },
    );
  });

  // =========================
  // PLAY BUTTON ANIMATION
  // =========================
  playBtns.forEach((btn, index) => {
    const parentImg = images[index] || btn.closest(".gallery-img");

    if (!parentImg) return; // extra safety

    gsap.fromTo(
      btn,
      { opacity: 0 },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: parentImg,
          start: "bottom 99%",
          end: "bottom 99%",
          scrub: true,
        },
      },
    );
  });
}
function fnMediaSlider() {
  const swiper = new Swiper(".MediaSlider", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: false, // Disable loop
    rewind: true, // Enable rewind - this will go back to first slide
    speed: 1000,
    navigation: {
      nextEl: ".custom-next",
      prevEl: ".custom-prev",
    },
    setTransition(swiper, speed) {
      swiper.wrapperEl.style.transitionTimingFunction =
        "cubic-bezier(0.25, 0.1, 0.25, 1)";
    },
    breakpoints: {
      1024: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 2.2,
        navigation: false,
      },
      768: {
        slidesPerView: 2.2,
      },
      320: {
        slidesPerView: 1.2,
      },
    },
  });
}
function fnGridAnim() {
  if ($(window).width() < 991) {
    gsap.utils.toArray(".grid-inner-col img").forEach((img) => {
      gsap.to(img, {
        yPercent: -15, // increase movement for stronger parallax
        ease: "none",
        scrollTrigger: {
          trigger: img.closest(".verticalSliderSec"), // individual control if inside section
          start: "top bottom", // when section enters view
          end: "bottom top", // until it leaves
          scrub: 1.5, // smoother, slightly delayed movement
        },
      });
    });
  }
}
/* function fnmediaImgAnim() {
  gsap.utils.toArray(".mediaImg img").forEach((img) => {
    gsap.to(img, {
      yPercent: -15, // increase movement for stronger parallax
      ease: "none",
      scrollTrigger: {
        trigger: img.closest(".MediaSlider"), // control per image section
        start: "top bottom", // when section enters view
        end: "bottom top", // until it leaves
        scrub: 1.5, // smoother, slightly delayed movement
      },
    });
  });
} */
function fnSustainabilitySlider() {
  const swiper = new Swiper(".sustainabilitySlider", {
    slidesPerView: 3,
    spaceBetween: 28,
    loop: true,
    speed: 1000,
    navigation: {
      nextEl: ".custom-next",
      prevEl: ".custom-prev",
    },
    on: {
      setTransition(swiper, speed) {
        swiper.wrapperEl.style.transitionTimingFunction =
          "cubic-bezier(0.25, 0.1, 0.25, 1)";
      },
    },
    breakpoints: {
      1025: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 2.2,
      },
      768: {
        slidesPerView: 2.2,
      },
      320: {
        slidesPerView: 1.2,
      },
    },
  });
}

/* function ZIndexFun() {
  var section = $(".parallax-ZIndex");
  var sectionHeight = section.outerHeight();
  var sectionOffset = section.offset().top;
  var scrollPosition = $(window).scrollTop();
  var windowHeight = $(window).height();

  if (
    scrollPosition + windowHeight > sectionOffset &&
    scrollPosition < sectionOffset + sectionHeight
  ) {
    section.css("z-index", "9");
  } else if (scrollPosition > sectionOffset + sectionHeight) {
    section.css("z-index", "8");
  } else {
    section.css("z-index", "auto");
  }
} */

/* $(window).scroll(function () {
  ZIndexFun();
});
 */
// GITIKA

/* function verticalScroll() {
  console.clear();
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".vertical-slider").forEach((section) => {
    const slides = gsap.utils.toArray(
      section.querySelectorAll(".content-slide")
    );
    if (!slides.length) return;

    if (window.innerWidth > 991) {
      section.style.height = `${slides[0].offsetHeight + 100}px`;

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 150px",
          end: () =>
            `+=${
              slides.reduce((t, s) => t + s.offsetHeight, 0) -
              section.offsetHeight
            }`,
          scrub: 1,
          pin: true,
        },
      });

      gsap.set(slides, { opacity: 0.2 });
      gsap.set(slides[0], { opacity: 1 });

      slides.forEach((slide, i) => {
        tl.to(
          section.querySelector(".main-content"),
          { y: -slide.offsetTop, duration: 0.1 },
          i
        )
          .to(slide, { opacity: 1, duration: 0.1 }, i)
          .to(slides[i - 1], { opacity: 0.2, duration: 0.5 }, i);
      });
    }
  });

  gsap.utils.toArray(".aniline").forEach((line) => {
    gsap.fromTo(
      line,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 2,
        transformOrigin: "left center",
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: line,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      }
    );
  });
} */

// Reinitialize GSAP when window resizes
/* function handleResize() {
  ScrollTrigger.refresh();
}

window.addEventListener("resize", handleResize);
document.addEventListener("DOMContentLoaded", verticalScroll);
 */
function verticalScrollImgSlider() {
  if ($(window).width() < 991) {
    const swiper = new Swiper(".verticalScrollImgSlider", {
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,
      speed: 1000,
      autoplay: {
        delay: 5000,
      },
      navigation: {
        nextEl: ".video-next",
        prevEl: ".video-prev",
      },
      pagination: {
        el: ".swiper-pagination",
      },
      on: {
        setTransition(swiper, speed) {
          swiper.wrapperEl.style.transitionTimingFunction =
            "cubic-bezier(0.25, 0.1, 0.25, 1)";
        },
      },
    });
  }
}

function fuFullWidthAccordion(selector) {
  $(selector).click(function () {
    // Check if the clicked panel is already active
    const isActive = $(this).hasClass("active");

    // Close all panels
    $(selector).removeClass("active");

    // Open the clicked panel if it wasn't already active
    if (!isActive) {
      $(this).addClass("active");
    }
  });
}
function fnhomeabsoluteslider() {
  const swiper = new Swiper(".mySwiper", {
    slidesPerView: 3.2,
    spaceBetween: 10,
    loop: true,
    speed: 3000,

    autoplay: {
      delay: 0,
      disableOnInteraction: false,
      pauseOnMouseEnter: false, // we handle manually
    },

    breakpoints: {
      360: { slidesPerView: 1 },
      480: { slidesPerView: 1.6 },
      768: { slidesPerView: 2.4 },
      1024: { slidesPerView: 1.6 },
      1100: { slidesPerView: 2 },
      1200: { slidesPerView: 3.2 },
    },
  });

  const swiperEl = document.querySelector(".mySwiper");

  /* 🛑 Instant pause */
  swiperEl.addEventListener("mouseenter", () => {
    swiper.autoplay.stop();
    swiper.setTranslate(swiper.getTranslate()); // freeze position
  });

  /* ▶ Resume smoothly */
  swiperEl.addEventListener("mouseleave", () => {
    swiper.autoplay.start();
  });
}

/* function fnhomeabsoluteslider() {
  const swiper = new Swiper(".mySwiperMarque", {
    slidesPerView: 3.2,
    spaceBetween: 10,
    loop: true,
    speed: 3000,

    autoplay: {
      delay: 0, 
      disableOnInteraction: false,
    },

    breakpoints: {
      360: { slidesPerView: 1 },
      480: { slidesPerView: 1.6 },
      768: { slidesPerView: 2.4 },
      1024: { slidesPerView: 1.6 },
      1100: { slidesPerView: 2 },
      1200: { slidesPerView: 3.3 },
      1366: { slidesPerView: 3.2 },
      1850: { slidesPerView: 3.2 },
    },
  });

  const swiperEl = document.querySelector(".mySwiperMarque");

  swiperEl.addEventListener("mouseenter", () => {
    swiper.autoplay.stop();
  });


  swiperEl.addEventListener("mouseleave", () => {
    swiper.autoplay.start();
  });
} */

/* function fnhomesolutionTab() {

  $(".solution-tab-list").on("click", function () {
    var tabId = $(this).data("tab");

   
    $(".solution-tab-list, .accordionRow, .tabContent").removeClass("active");

   
    $(this).addClass("active");

    
    $('.accordionRow[data-tab="' + tabId + '"]').addClass("active");
    $('.tabContent[data-tab="' + tabId + '"]').addClass("active");
  });

  $(".solution-tab-list").first().trigger("click");
} */

function fnhomesolutionTab() {
  $(".solution-tab-list").on("click", function () {
    var tabId = $(this).data("tab");
    var $parent = $(".verticalSliderSec-inner");

    // Remove active classes
    $(".solution-tab-list, .accordionRow, .tabContent").removeClass("active");

    // Add active class
    $(this).addClass("active");

    var $accordion = $('.accordionRow[data-tab="' + tabId + '"]');
    var $tabContent = $('.tabContent[data-tab="' + tabId + '"]');

    $accordion.addClass("active");
    $tabContent.addClass("active");

    // Animate underline (.aniline)
    const $line = $accordion.find(".aniline");
    if ($line.length) {
      $line.css("transform", "scaleX(0)");
      void $line[0].offsetWidth; // trigger reflow
      $line.css("transform", "scaleX(1)");
    }

    // Remove old -bg classes
    $parent.removeClass(function (index, className) {
      return (className.match(/(^|\s)\S+-bg/g) || []).join(" ");
    });

    // Add new -bg class
    $parent.addClass(tabId + "-bg");

    // Counter Animation (supports decimals)
    const $counter = $accordion.find(".Content-p-value");

    if ($counter.length) {
      const fullText = $counter.text().trim();

      // Match number (with comma + decimal) and suffix
      const match = fullText.match(/([\d,\.]+)(.*)/);

      if (match) {
        const numberStr = match[1].replace(/,/g, "");
        const suffix = match[2].trim();
        const targetValue = parseFloat(numberStr);

        // Detect decimal places dynamically
        const decimalPart = numberStr.split(".")[1];
        const decimals = decimalPart ? decimalPart.length : 0;

        animateNumberWithSuffix($counter, targetValue, suffix, 1000, decimals);
      }
    }
  });

  // Trigger first tab by default
  $(".solution-tab-list").first().trigger("click");
}

// Counter animation function (Decimal supported)
function animateNumberWithSuffix($el, target, suffix, duration, decimals) {
  const startTime = performance.now();

  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);

    const current = progress * target;

    // Format number properly
    let formattedNumber = Number(current.toFixed(decimals)).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      },
    );

    $el.text(formattedNumber + (suffix ? " " + suffix : ""));

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}
function fnParallaxImg() {
  // Loop through each .parallax-img section
  gsap.utils.toArray(".parallaxboxani").forEach((section) => {
    // For each .image-box inside that section
    gsap.utils
      .toArray(section.querySelectorAll(".parallax-img-wrapper"))
      .forEach((box) => {
        const img = box.querySelector("img");
        if (!img) return;

        const movePercent = 10; // amount of parallax movement (higher = stronger)

        // 1️⃣ Calculate how much extra height the image needs for parallax
        const boxHeight = box.offsetHeight;
        const extraHeight = boxHeight * (movePercent / 100);

        // 2️⃣ Expand the parent .image-box slightly to hide scroll gap
        box.style.height = `${boxHeight + extraHeight}px`;

        // 3️⃣ Use GSAP to animate the image itself
        gsap.fromTo(
          img,
          { yPercent: -movePercent / 1 },
          {
            yPercent: movePercent / 2,
            ease: "none",
            scrollTrigger: {
              trigger: box,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
            },
          },
        );
      });
  });
}

function fuZoomAnim() {
  gsap.utils.toArray(".zoominAnim").forEach((item) => {
    gsap.fromTo(
      item,
      {
        scale: 0.4,
        opacity: 0.5,
        borderRadius: "0px",
      },
      {
        scale: 1,
        opacity: 1,
        borderRadius: "20px",
        overflow: "hidden",
        scrollTrigger: {
          trigger: item, // ⭐ individual trigger
          start: "top 100%", // ⭐ fires when each item enters
          end: "bottom 100%",
          scrub: true,
        },
      },
    );
  });
}

function fnColumnAnim() {
  gsap.utils.toArray(".columnAnimation").forEach((section) => {
    gsap.fromTo(
      section.querySelectorAll(".columnAnimation-single"),
      { opacity: 0, y: 250 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.05, // ⚡ very fast one-by-one animation
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 90%",
          toggleActions: "play none none reverse",
        },
      },
    );
  });
}
function fnBusinessAni() {
  // 🎬 Animate each .businessThumb
  gsap.utils.toArray(".boxAnimation").forEach((thumb) => {
    gsap.fromTo(
      thumb,
      { opacity: 0, y: 250 },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: thumb,
          start: "top 88%",
          end: "bottom 90%",
          toggleActions: "play none none reverse",
        },
      },
    );
  });

  // 🔄 Refresh ScrollTrigger after setup
  ScrollTrigger.refresh();
}

/* function fnHeadingAnim() {
  gsap.utils
    .toArray(
      "   .sec-heading, .blueStripRow p, .announcements-header-sec a"
    )
    .forEach((heading) => {
      gsap.fromTo(
        heading,
        {
          opacity: 0,
          y: 10, // smoother movement
        },
        {
          opacity: 1,
          y: 0,

          duration: 0.2, // smoother timing
          ease: "power3.out", // softer easing
          scrollTrigger: {
            trigger: heading,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

  ScrollTrigger.refresh();
}
 */

function fnHeadingAnim() {
  gsap.utils.toArray(".headingAnimation").forEach((heading) => {
    gsap.fromTo(
      heading,
      {
        opacity: 0,
        y: 30, // smoother movement
      },
      {
        opacity: 1,
        y: 0,

        duration: 0.2, // smoother timing
        ease: "power3.out", // softer easing
        scrollTrigger: {
          trigger: heading,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    );
  });

  ScrollTrigger.refresh();
}

/* function fnNormalTextAnim() {
  gsap.utils
    .toArray(".normal-p, .subtitle, .leadershipHeading p ")
    .forEach((heading) => {
      gsap.fromTo(
        heading,
        {
          opacity: 0,
          y: 50, // smoother movement
        },
        {
          opacity: 1,
          y: 0,

          duration: 1, // smoother timing
          ease: "power3.out", // softer easing
          scrollTrigger: {
            trigger: heading,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

  ScrollTrigger.refresh();
} */
function fnNormalTextAnim() {
  gsap.utils.toArray(".textAnimation").forEach((heading) => {
    gsap.fromTo(
      heading,
      {
        opacity: 0,
        y: 50, // smoother movement
      },
      {
        opacity: 1,
        y: 0,

        duration: 1, // smoother timing
        ease: "power3.out", // softer easing
        scrollTrigger: {
          trigger: heading,
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
      },
    );
  });

  ScrollTrigger.refresh();
}

function fnBoxFadeAnim() {
  gsap.registerPlugin(ScrollTrigger);

  const boxes = gsap.utils.toArray(".threeBoxWithArrowCol");
  if (!boxes.length) return;

  boxes.forEach((box) => {
    gsap.fromTo(
      box,
      {
        opacity: 0,
        filter: "blur(0.5px)",
      },
      {
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.5,
        ease: "power3.out",

        scrollTrigger: {
          trigger: box, // 🔥 each box triggers itself
          start: "top 92%",
          toggleActions: "play none none reverse",
        },
      },
    );
  });
}
function fnScrollPadding() {
  gsap.registerPlugin(ScrollTrigger);

  const isMobile = window.innerWidth < 767;

  gsap.utils.toArray(".scrollPadding").forEach((section) => {
    // ⭐ Padding animation
    gsap.fromTo(
      section,
      {
        paddingLeft: isMobile ? "0px" : "10px",
        paddingRight: isMobile ? "0px" : "10px",
        paddingTop: "10px",
        paddingBottom: isMobile ? "10px" : "20px",
      },
      {
        paddingLeft: isMobile ? "20px" : "40px",
        paddingRight: isMobile ? "20px" : "40px",
        paddingTop: "40px",
        paddingBottom: isMobile ? "20px" : "40px",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 90%",
          end: "top 10%",
          scrub: true,
        },
      },
    );

    // ⭐ Border radius animation
    const borderEl = section.querySelector(".scrollBorder");
    if (borderEl) {
      gsap.fromTo(
        borderEl,
        {
          borderRadius: "0px",
        },
        {
          borderRadius: "20px",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            end: "top 10%",
            scrub: true,
          },
        },
      );
    }
  });
}

function setEqualAccordionHeight() {
  if ($(window).width() > 990) {
    var maxHeight = 0;

    $(".accordionRow").css("height", "auto");

    $(".accordionRow").each(function () {
      var thisHeight = $(this).outerHeight();
      if (thisHeight > maxHeight) {
        maxHeight = thisHeight;
      }
    });

    // Add additional 45px
    maxHeight = maxHeight + 45;

    $(".accordionRow").css("height", maxHeight + "px");
  } else {
    // Reset height for mobile
    $(".accordionRow").css("height", "auto");
  }
}

function fnSolutionTabsScroll() {
  $(".solution-tab .solution-tab-list").on("click", function () {
    var $container = $(this).closest(".home-solution-tab");

    var left =
      this.offsetLeft - $container.width() / 2 + $(this).outerWidth() / 2;

    $container.animate(
      {
        scrollLeft: left,
      },
      300,
    );
  });
}
