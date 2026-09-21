function fnInvestorSlider() {
  const swiper = new Swiper(".investorSlider", {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    allowTouchMove: false, // Disable dragging/swiping
    navigation: {
      nextEl: ".invest-next",
      prevEl: ".invest-prev",
    },
  });
}

function fnSustainSlider() {
  const swiper = new Swiper(".sustainSlider", {
    slidesPerView: 3,
    spaceBetween: 60,
    loop: false,
    navigation: {
      nextEl: ".sustain-next",
      prevEl: ".sustain-prev",
    },
    breakpoints: {
      1080: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      680: {
        slidesPerView: 1,
      },
      320: {
        slidesPerView: 1,
      },
    },
    on: {
      slideChange: function () {
        console.log("Slide changed");
        // Reinitialize the countUp when the slide changes
        $(".js-num").each(countUp);
      },
      init: function () {
        // Call fnCounter when Swiper initializes
        //fnCounter();
      },
    },
  });
}

function fnAchieveSlider() {
  const swiper = new Swiper(".achievment-slider", {
    slidesPerView: 3,
    spaceBetween: 0,
    loop: false,
    navigation: {
      nextEl: ".achieve-next",
      prevEl: ".achieve-prev",
    },
    breakpoints: {
      991: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 2,
      },
      680: {
        slidesPerView: 1,
      },
      320: {
        slidesPerView: 1,
      },
    },
  });
}

/* function fnHomeSustainSlider() {
  const sliderEl = document.querySelector(".homesustainSlider");
  if (!sliderEl) return;

  const animatedSlides = new Set();

  const swiper = new Swiper(sliderEl, {
    slidesPerView: 3,
    slidesPerGroup:3,
    spaceBetween: 30,
    loop: false,
    speed: 1000,
    watchSlidesProgress: true,

    navigation: {
      nextEl: ".sustain-next",
      prevEl: ".sustain-prev",
    },

    breakpoints: {
      1200: { slidesPerView: 3, slidesPerGroup:3 },
      1080: { slidesPerView: 2, slidesPerGroup:2 },
      768: { slidesPerView: 2, slidesPerGroup:2 },
      680: { slidesPerView: 1, slidesPerGroup:1 },
      320: { slidesPerView: 1, slidesPerGroup:1 },
    },
  });

  // -----------------------------
  // IntersectionObserver for counter
  // -----------------------------
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const slide = entry.target;
        const index = Array.from(swiper.slides).indexOf(slide);
        if (animatedSlides.has(index)) return;

        const numEl = slide.querySelector(".counter-value");
        if (!numEl) return;

        const originalText = numEl.textContent.trim();

        // Remove commas for calculation
        const numericValue = parseFloat(originalText.replace(/,/g, ""));
        if (isNaN(numericValue)) return;

        animatedSlides.add(index);
        animateNumber(numEl, numericValue, originalText, 1500);

        obs.unobserve(slide);
      });
    },
    { threshold: 0.5 },
  );

  swiper.slides.forEach((slide) => observer.observe(slide));

  // -----------------------------
  // Animate number function
  // -----------------------------
  function animateNumber(el, endValue, originalText, duration) {
    const startTime = performance.now();

    // Detect decimal places from original text
    const decimalMatch = originalText.split(".")[1];
    const decimalPlaces = decimalMatch ? decimalMatch.length : 0;

    function formatNumber(num) {
      return num.toLocaleString(undefined, {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
      });
    }

    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const currentValue = progress * endValue;

      el.textContent = formatNumber(currentValue);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = formatNumber(endValue);
      }
    }

    el.textContent = formatNumber(0);
    requestAnimationFrame(step);
  }
} */


function fnHomeSustainSlider() {
  const sliderEl = document.querySelector(".homesustainSlider");
  if (!sliderEl) return;

  const swiper = new Swiper(sliderEl, {
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 30,
    loop: false,
    speed: 1000,
    watchSlidesProgress: true,

    navigation: {
      nextEl: ".sustain-next",
      prevEl: ".sustain-prev",
    },

    breakpoints: {
      1200: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      1080: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      680: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
    },
  });

  // -----------------------------
  // Store original counter values
  // -----------------------------
  const counterData = new Map();
  const animationFrames = new Map();

  swiper.slides.forEach((slide, index) => {
    const numEl = slide.querySelector(".counter-value");

    if (!numEl) return;

    const originalText = numEl.textContent.trim();
    const numericValue = parseFloat(originalText.replace(/,/g, ""));

    if (isNaN(numericValue)) return;

    const decimalMatch = originalText.split(".")[1];
    const decimalPlaces = decimalMatch ? decimalMatch.length : 0;

    counterData.set(index, {
      numEl,
      originalText,
      numericValue,
      decimalPlaces,
    });
  });

  // -----------------------------
  // Format number
  // -----------------------------
  function formatNumber(num, decimalPlaces) {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    });
  }

  // -----------------------------
  // Animate number
  // -----------------------------
  function animateNumber(
    el,
    endValue,
    decimalPlaces,
    duration,
    index
  ) {
    // Cancel previous animation
    if (animationFrames.has(index)) {
      cancelAnimationFrame(animationFrames.get(index));
    }

    const startTime = performance.now();

    function step(now) {
      const progress = Math.min(
        (now - startTime) / duration,
        1
      );

      const currentValue = progress * endValue;

      el.textContent = formatNumber(
        currentValue,
        decimalPlaces
      );

      if (progress < 1) {
        const frameId = requestAnimationFrame(step);
        animationFrames.set(index, frameId);
      } else {
        el.textContent = formatNumber(
          endValue,
          decimalPlaces
        );

        animationFrames.delete(index);
      }
    }

    el.textContent = formatNumber(0, decimalPlaces);

    const frameId = requestAnimationFrame(step);
    animationFrames.set(index, frameId);
  }

  // -----------------------------
  // Reset counter
  // -----------------------------
  function resetCounter(index) {
    const data = counterData.get(index);
    if (!data) return;

    // Cancel ongoing animation
    if (animationFrames.has(index)) {
      cancelAnimationFrame(animationFrames.get(index));
      animationFrames.delete(index);
    }

    // Reset to zero
    data.numEl.textContent = formatNumber(
      0,
      data.decimalPlaces
    );
  }

  // -----------------------------
  // IntersectionObserver
  // -----------------------------
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const slide = entry.target;

        const index = Array.from(swiper.slides).indexOf(slide);

        const data = counterData.get(index);
        if (!data) return;

        if (entry.isIntersecting) {
          // Animate every time slide enters viewport
          animateNumber(
            data.numEl,
            data.numericValue,
            data.decimalPlaces,
            1500,
            index
          );
        } else {
          // Reset when slide leaves viewport
          resetCounter(index);
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  // Observe all slides
  swiper.slides.forEach((slide) => {
    observer.observe(slide);
  });
}
