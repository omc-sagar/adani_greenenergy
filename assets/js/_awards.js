function awardsSlider() {
  const swiper = new Swiper(".awardsSlider", {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: false,

    navigation: {
      nextEl: ".award-next",
      prevEl: ".award-prev",
    },
    pagination: {
      el: ".swiper-pagination",
    },
  });
  fnBoxFadeAnim();
}

function fnAwardSlider() {
  const swiper = new Swiper(".award-slider", {
    slidesPerView: 4,
    spaceBetween: 70,
    loop: true,
    navigation: {
      nextEl: ".custom-next",
      prevEl: ".custom-prev",
    },
    breakpoints: {
      1500: {
        slidesPerView: 3,
        spaceBetween: 70,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 2.3,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2.3,
        spaceBetween: 20,
      },
      320: {
        slidesPerView: 1.2,
        spaceBetween: 20,
      },
    },
  });
}

function initReadMoreAwards(container = ".awards-grid-col", lines = 2) {
  const $container = $(container);

  function setupReadMore() {
    $container.find(".read-more-btn").remove();

    $container.find(".awards-bottom-content p").each(function () {
      const $desc = $(this);

      let lineHeight = parseFloat($desc.css("line-height"));

      if (isNaN(lineHeight)) {
        lineHeight = parseFloat($desc.css("font-size")) * 1.5;
      }

      const collapsedHeight = lineHeight * lines;

      // Reset before measuring
      $desc.removeClass("expanded").css("max-height", "none");

      // Get full content height
      const fullHeight = this.scrollHeight;

      // Apply collapsed height
      $desc.css("max-height", collapsedHeight - 5 + "px");

      // Add button only if content is more than 3 lines
      if (fullHeight > collapsedHeight + 5) {
        $desc.after('<span class="read-more-btn">Read More</span>');
      }
    });
  }

  setupReadMore();

  // Recalculate after images/fonts/layout are rendered
  setTimeout(setupReadMore, 100);
  setTimeout(setupReadMore, 500);

  $(document)
    .off("click.readMoreAwards", ".awards-grid-col .read-more-btn")
    .on(
      "click.readMoreAwards",
      ".awards-grid-col .read-more-btn",
      function (e) {
        e.preventDefault();

        const $btn = $(this);
        const $desc = $btn.prev(".awards-bottom-content p");

        if (!$desc.length) return;

        let lineHeight = parseFloat($desc.css("line-height"));

        if (isNaN(lineHeight)) {
          lineHeight = parseFloat($desc.css("font-size")) * 1.5;
        }

        const collapsedHeight = lineHeight * lines;

        if ($desc.hasClass("expanded")) {
          // READ LESS
          $desc
            .removeClass("expanded")
            .css("max-height", collapsedHeight - 5 + "px");

          $btn.text("Read More");
        } else {
          // READ MORE
          const fullHeight = $desc[0].scrollHeight;

          $desc.addClass("expanded").css("max-height", fullHeight + "px");

          $btn.text("Read Less");
        }
      },
    );
}
