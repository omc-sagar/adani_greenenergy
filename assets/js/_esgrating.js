function initEsgRatingSlider() {
  const esgRatingSliders = document.querySelectorAll(".esgRatingSlider");

  if (!esgRatingSliders.length) {
    return;
  }

  esgRatingSliders.forEach((slider) => {
    const nextBtn = slider.querySelector(".esgRatingSliderNext");
    const prevBtn = slider.querySelector(".esgRatingSliderPrev");

    new Swiper(slider, {
      slidesPerView: 5.7,
      spaceBetween: 10,
      speed: 700,
      grabCursor: true,
      watchOverflow: true,

      navigation: {
        nextEl: nextBtn,
        prevEl: prevBtn,
      },

      breakpoints: {
        0: {
          slidesPerView: 1.4,
          spaceBetween: 10,
        },
        510: {
          slidesPerView: 2.3,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 3.1,
          spaceBetween: 10,
        },
        991: {
          slidesPerView: 3.5,
          spaceBetween: 10,
        },
        1200: {
          slidesPerView: 4.5,
          spaceBetween: 10,
        },
        1366: {
          slidesPerView: 5,
          spaceBetween: 10,
        },
      },
    });
  });
}
