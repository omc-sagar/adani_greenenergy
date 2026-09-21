// function fnreadmore() {
// $('.moreless-button').click(function() {
//     $(this).prev().find('.moretext').slideToggle("slow");
//     if($(this).text() === 'Read More')(
//         $(this).text("Read Less"))
//      else(
//          $(this).text("Read More")
//      )
//   });
// }

function initNewOpeningsSwiper() {
  // Wait for DOM to be ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => createSwiper());
  } else {
    createSwiper();
  }
}

function createSwiper() {
  const swiperElement = document.querySelector(".NewOpenSwiper");
  if (!swiperElement) return null;

  const slides = swiperElement.querySelectorAll(".swiper-slide");
  console.log(`Found ${slides.length} slides`);

  // If less than 6 slides, disable loop or duplicate slides
  if (slides.length < 6) {
    console.warn("Need at least 6 slides for loop. Duplicating slides...");
    // Option 1: Disable loop
    // return createSwiperWithLoop(false);

    // Option 2: Duplicate slides (better UX)
    duplicateSlides(swiperElement, slides, 6);
  }

  const swiper = new Swiper(".NewOpenSwiper", {
    loop: true,
    spaceBetween: 30,
    slidesPerView: 3,
    centeredSlides: false,
    watchSlidesProgress: true,
    navigation: {
      nextEl: ".custom-next",
      prevEl: ".custom-prev",
    },
    breakpoints: {
      360: {
        slidesPerView: 1,
        spaceBetween: 15,
      },
      768: {
        slidesPerView: 1.5,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });

  return swiper;
}

function duplicateSlides(container, slides, minRequired) {
  const wrapper = container.querySelector(".swiper-wrapper");
  const originalCount = slides.length;
  const needed = minRequired - originalCount;
  const duplicatesNeeded = Math.ceil(needed / originalCount);

  for (let i = 0; i < duplicatesNeeded; i++) {
    slides.forEach((slide) => {
      const clone = slide.cloneNode(true);
      wrapper.appendChild(clone);
    });
  }

  console.log(
    `Total slides after duplication: ${container.querySelectorAll(".swiper-slide").length}`,
  );
}

function meetpeopleSlider() {
  const swiper1 = new Swiper(".meetpeople", {
    slidesPerView: 2.9,
    spaceBetween: 30,
    navigation: {
      nextEl: ".custom-next",
      prevEl: ".custom-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1.15,
        spaceBetween: 20,
      },

      768: {
        slidesPerView: 2.1,
        spaceBetween: 20,
      },
      991: {
        slidesPerView: 2.2,
        spaceBetween: 20,
      },
      1220: {
        slidesPerView: 2.55,
        spaceBetween: 30,
      },
    },
  });
}
