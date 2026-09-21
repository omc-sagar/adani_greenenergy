function initReportingStandardsSlider() {
  const reportingStandardsSections = document.querySelectorAll(
    ".reportingStandardsSection",
  );

  if (!reportingStandardsSections.length) {
    return;
  }

  reportingStandardsSections.forEach((section) => {
    const slider = section.querySelector(".reportingStandardsSlider");

    const prevButton = section.querySelector(".reportingStandardsPrev");

    const nextButton = section.querySelector(".reportingStandardsNext");

    if (!slider) {
      return;
    }

    new Swiper(slider, {
      slidesPerView: 5,
      spaceBetween: 30,
      loop: false,
      speed: 700,

      grabCursor: true,

      watchOverflow: true,

      navigation: {
        prevEl: prevButton,
        nextEl: nextButton,
      },

      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 15,
        },

        600: {
          slidesPerView: 2,
          spaceBetween: 15,
        },

        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1100: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        1220: {
          slidesPerView: 5,
          spaceBetween: 30,
        },
      },
    });
  });
}
