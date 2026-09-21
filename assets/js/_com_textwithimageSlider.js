function fntextWithImageSlider() {
  if ($(".Com_TextWithImageSlider").length > 0) {
    let numberOfSlides;
    const swiper_text = new Swiper(".TextWithImageSliderWrap_text", {
      direction: "horizontal",
      /* loop: numberOfSlides <= 2 ? false : true,*/
      loop: true,
      parallax: true,
      slidesPerView: 1,
      scrollbar: ".swiper-scrollbar",
      speed: 1500,
      allowTouchMove: false,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
    });

    const swiper_main = new Swiper(".TextWithImageSliderWrap", {
      direction: "horizontal",
      /* loop: numberOfSlides <= 2 ? false : true,*/
      loop: true,
      parallax: true,
      slidesPerView: 2,
      spaceBetween: 20,
      scrollbar: ".swiper-scrollbar",
      speed: 1500,
      navigation: {
        nextEl: ".TextWithImageSliderWrap .swiper-button-next",
        prevEl: ".TextWithImageSliderWrap .swiper-button-prev",
      },
      thumbs: {
        swiper: swiper_text,
      },
      breakpoints: {
        "@0.00": {
          slidesPerView: 1.5,
          spaceBetween: 20,
        },

        "@1.50": {
          slidesPerView: 2,
          spaceBetween: 40,
        },
      },
    });

    var TextSlide = document.querySelectorAll(
      ".TextWithImageSliderWrap .swiper-slide"
    );
    var TextactiveIndex = swiper_main.TextactiveIndex;
  }
}
