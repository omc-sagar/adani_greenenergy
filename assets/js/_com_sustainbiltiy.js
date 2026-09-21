function fnthreeImageSlider() {
  if ($(".three-imgSlideWrapper").length > 0) {
    let numberOfSlides;
    $(".three-imgSlideWrapper").each(function () {
      var $this = $(this);
      var threeImgswiper = new Swiper(this, {
        direction: "horizontal",
        loop: false,
        loop: numberOfSlides <= 2 ? false : false,
        parallax: true,
        slidesPerView: 3,
        spaceBetween: 20,
        scrollbar: {
          el: $this.find(".swiper-scrollbar")[0],
          draggable: true,
        },
        speed: 1500,
        navigation: {
          nextEl: $this.find(".swiper-button-next")[0],
          prevEl: $this.find(".swiper-button-prev")[0],
        },
        breakpoints: {
          991: {
            slidesPerView: 3,
          },
          481: {
            slidesPerView: 1.6,
            spaceBetween: 30,
            loop: true,
          },
          320: {
            slidesPerView: 1.5,
            spaceBetween: 30,
            loop: true,
          },
        },
        on: {
          slideChange: function () {
            checkButtonState();
          },
        },
      });

      function checkButtonState() {
        var nextButton = $this.find(".swiper-button-next");
        var prevButton = $this.find(".swiper-button-prev");

        var nextButtonDisabledOrNotExist =
          nextButton.length === 0 ||
          nextButton.hasClass("swiper-button-disabled") ||
          !nextButton.is(":visible");
        var prevButtonDisabledOrNotExist =
          prevButton.length === 0 ||
          prevButton.hasClass("swiper-button-disabled") ||
          !prevButton.is(":visible");

        if (nextButtonDisabledOrNotExist && prevButtonDisabledOrNotExist) {
          $this.find(".three-imgcardBox").addClass("activeClass");
        } else {
          $this.find(".three-imgcardBox").removeClass("activeClass");
        }
      }

      // Initial check
      checkButtonState();
    });
    setTimeout(function () {
      if ($(".three-imgSlideWrapper .swiper-slide").length > 3) {
        $(".swiper-button-next").removeClass("swiper-button-lock");
        $(".swiper-button-prev").removeClass("swiper-button-lock");
      }
    }, 1000);
  }
}

function fntwoCalSlider() {
  const swiper = new Swiper(".twoCalSlider", {
    slidesPerView: 2,
    spaceBetween: 20,
    loop: true,
    navigation: {
      nextEl: ".custom-arrow-next",
      prevEl: ".custom-arrow-prev",
    },
    breakpoints: {
      1025: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 2,
      },
      320: {
        slidesPerView: 1.2,
      },
    },
  });
}

/* function fnFourImgSlider() {
  if ($(".FourImgSlider").length > 0) {
    let numberOfSlides;
    $(".FourImgSlider").each(function () {
      var $this = $(this);
      var threeImgswiper = new Swiper(this, {
        direction: "horizontal",
        loop: false,
        loop: numberOfSlides <= 2 ? false : false,
        parallax: true,
        slidesPerView: 4,
        spaceBetween: 20,
        scrollbar: {
          el: $this.find(".swiper-scrollbar")[0],
          draggable: true,
        },
        speed: 1500,
        navigation: {
          nextEl: $this.find(".swiper-button-next")[0],
          prevEl: $this.find(".swiper-button-prev")[0],
        },
        breakpoints: {
          991: {
            slidesPerView: 4,
          },
          481: {
            slidesPerView: 1.6,
            spaceBetween: 30,
            loop: true,
          },
          320: {
            slidesPerView: 1.5,
            spaceBetween: 30,
            loop: true,
          },
        },
        on: {
          slideChange: function () {
            checkButtonState();
          },
        },
      });
    });
  }
} */

function fnFourImgSlider() {
  $(".FourImgSlider-arrows").each(function () {
    const $wrapper = $(this);
    const $sliderEl = $wrapper.find(".FourImgSlider");
    const $nextBtn = $wrapper.find(".FourImgSlider-next");
    const $prevBtn = $wrapper.find(".FourImgSlider-prev");

    // Count total slides
    const totalSlides = $sliderEl.find(".swiper-slide").length;

    // Show arrows only if slides > 4
    if (totalSlides > 4) {
      $nextBtn.show();
      $prevBtn.show();
    } else {
      $nextBtn.hide();
      $prevBtn.hide();
    }

    new Swiper($sliderEl[0], {
      slidesPerView: 4,
      spaceBetween: 20,
      loop: totalSlides > 4, // enable loop only if more than 4 slides
      navigation: {
        nextEl: $nextBtn[0],
        prevEl: $prevBtn[0],
      },
      breakpoints: {
        1500: { slidesPerView: 4, spaceBetween: 20 },
        1220: { slidesPerView: 4, spaceBetween: 20 },
        992: { slidesPerView: 3.3, spaceBetween: 20 },
        768: { slidesPerView: 2.3, spaceBetween: 20 },
        320: { slidesPerView: 1.2, spaceBetween: 20 },
      },
      simulateTouch: true,
      grabCursor: true,
    });
  });
}
