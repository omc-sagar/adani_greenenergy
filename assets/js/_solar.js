/* function fnStorySLider() {
  const swiper = new Swiper(".StorieSlider", {
    slidesPerView: 1,
    spaceBetween: 40,
    centeredSlides: true,

    navigation: {
      nextEl: ".StorieSlider-next",
      prevEl: ".StorieSlider-prev",
    },

    breakpoints: {
      1220: {
        slidesPerView: 1,
        centeredSlides: true,
      },
      768: {
        slidesPerView: 1.1,
        spaceBetween: 20,
        centeredSlides: false,
      },
      320: {
        slidesPerView: 1.1,
        spaceBetween: 20,
        centeredSlides: false,
      },
    },
  });
} */

  function fnStorySLider() {
  const sliderEl = document.querySelector(".StorieSlider");

  if (!sliderEl) return;

  const swiper = new Swiper(sliderEl, {
    slidesPerView: 1,
    spaceBetween: 40,
    centeredSlides: true,

    // Hide navigation when there is not enough slides
    watchOverflow: true,

    navigation: {
      nextEl: ".StorieSlider-next",
      prevEl: ".StorieSlider-prev",
    },

    breakpoints: {
      1220: {
        slidesPerView: 1,
        centeredSlides: true,
      },

      768: {
        slidesPerView: 1.1,
        spaceBetween: 20,
        centeredSlides: false,
      },

      320: {
        slidesPerView: 1.1,
        spaceBetween: 20,
        centeredSlides: false,
      },
    },
  });
}

function fnStatSlider() {
  const swiper1 = new Swiper(".stats-slider", {
    slidesPerView: 4,
    spaceBetween: 0,
    navigation: {
      nextEl: ".custom-next",
      prevEl: ".custom-prev",
    },
    breakpoints: {
      1920: {
        slidesPerView: 4,
      },
      1366: {
        slidesPerView: 4,
      },
      991: {
        slidesPerView: 3.5,
      },
      768: {
        slidesPerView: 2.5,
        spaceBetween: 0,
      },
      320: {
        slidesPerView: 1.2,
        spaceBetween: 0,
      },
    },
  });
}
function fnStatSliderThree() {
  const swiper = new Swiper(".stats-slider-three", {
    slidesPerView: 3,
    spaceBetween: 20,
    centeredSlides: false,
    navigation: {
      nextEl: ".custom-next",
      prevEl: ".custom-prev",
    },
    breakpoints: {
      1920: {
        slidesPerView: 3,
      },
      991: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      320: {
        slidesPerView: 1.2,
        spaceBetween: 30,
      },
    },
  });
}

function fnSolutionSLider() {
  if ($(window).width() < 360) {
    const swiper = new Swiper(".solution-slider", {
      slidesPerView: 2,
      spaceBetween: 30,
      loop: true,
      navigation: {
        nextEl: ".custom-next",
        prevEl: ".custom-prev",
      },
      breakpoints: {
        991: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 2,
        },
        320: {
          slidesPerView: 1,
        },
      },
    });
  }
}

function applyTimelineClasses() {
  var $li = $(".timeline-grid ul li");
  var liCount = $li.length;
  var winWidth = $(window).width();

  if (!liCount) return;

  // Reset classes first
  $li.removeClass("countli bottomli lastli").css("flex", "");

  /* -------------------------
     DESKTOP (≥ 1024px)
  --------------------------*/
  if (winWidth >= 1024) {
    var liWidthPercent = (100 / liCount) * 2;
    var licounthalf = Math.floor(liCount / 2);
    var visibleCount = licounthalf;

    $li.css("flex", "0 0 " + liWidthPercent + "%");

    if (visibleCount < liCount) {
      $li.eq(visibleCount).addClass("countli");
      $li.slice(visibleCount).addClass("bottomli");
    }
  }

  /* -------------------------
     TABLET & BELOW (< 1024px)
  --------------------------*/
  if (winWidth < 1024) {
    $li.slice(-2).addClass("lastli"); // last 2 li
  }
}

function fnprojectFilter() {
  // =========================
  // UPDATE MW OPTIONS
  // =========================
  function updateMWOptions() {
    var selectedState = $("#filter-state").val();
    var mwSet = new Set();

    $(".solution-slide").each(function () {
      var state = $(this).data("state");
      var mw = $(this).data("mw");

      if (!selectedState || state == selectedState) {
        mwSet.add(mw);
      }
    });

    var $mw = $("#filter-mw");
    $mw.find("option:not(:first)").remove();

    Array.from(mwSet)
      .sort((a, b) => a - b)
      .forEach(function (mw) {
        $mw.append('<option value="' + mw + '">' + mw + "</option>");
      });
  }

  // =========================
  // FILTER + LOAD MORE CORE
  // =========================
  function filterAndSlice() {
    var selectedState = $("#filter-state").val();
    var selectedMW = $("#filter-mw").val();

    var $container = $(".MoreDataDiv");

    var desktopSlice = parseInt($container.attr("data-slice")) || Infinity;
    var mobileSlice = parseInt($container.attr("data-mob-slice")) || 2;

    var sliceCount = $(window).width() > 767 ? desktopSlice : mobileSlice;

    var $items = $container.find(".solution-slide");

    // ===== FILTER =====
    $items.each(function () {
      var state = $(this).data("state");
      var mw = $(this).data("mw");

      var show = true;

      if (selectedState && state != selectedState) show = false;
      if (selectedMW && mw != selectedMW) show = false;

      $(this).toggle(show).removeClass("filtered-in");

      if (show) $(this).addClass("filtered-in");
    });

    // ===== SLICE =====
    var $filteredItems = $container.find(".solution-slide.filtered-in");

    $filteredItems.hide();

    $filteredItems.slice(0, sliceCount).show();
    $container.data("currentIndex", sliceCount);

    // ===== BUTTON CONTROL =====
    var $btn = $container.next(".MoreFeaturesSee").find(".loadMore");

    if ($filteredItems.length <= sliceCount) {
      $btn.hide();
    } else {
      $btn.show();
    }

    // swiper update
    if ($(".solution-slider")[0]?.swiper) {
      $(".solution-slider")[0].swiper.update();
    }
  }

  // =========================
  // LOAD MORE CLICK
  // =========================
  $(document)
    .off("click.loadMore")
    .on("click.loadMore", ".loadMore", function (e) {
      e.preventDefault();

      var $container = $(".MoreDataDiv");

      var desktopSlice = parseInt($container.attr("data-slice")) || Infinity;
      var mobileSlice = parseInt($container.attr("data-mob-slice")) || 2;

      var sliceCount = $(window).width() > 767 ? desktopSlice : mobileSlice;

      var currentIndex = $container.data("currentIndex") || 0;

      var $filteredItems = $container.find(".solution-slide.filtered-in");

      $filteredItems.slice(currentIndex, currentIndex + sliceCount).slideDown();

      currentIndex += sliceCount;
      $container.data("currentIndex", currentIndex);

      if (currentIndex >= $filteredItems.length) {
        $(this).hide();
      }
    });

  // =========================
  // STATE CHANGE
  // =========================
  $("#filter-state").on("change", function () {
    $("#filter-mw").val(""); // reset MW

    updateMWOptions();
    filterAndSlice();

    setTimeout(function () {
      $(".select-wrapper").removeClass("active");
    }, 150);
  });

  // =========================
  // MW CHANGE
  // =========================
  $("#filter-mw").on("change", function () {
    filterAndSlice();

    setTimeout(function () {
      $(".select-wrapper").removeClass("active");
    }, 150);
  });

  // =========================
  // ARROW UI FIX
  // =========================
  $(".select-wrapper select").on("focus", function () {
    $(".select-wrapper").removeClass("active");
    $(this).parent().addClass("active");
  });

  $(document).on("click", function (e) {
    if (!$(e.target).closest(".select-wrapper").length) {
      $(".select-wrapper").removeClass("active");
    }
  });

  // =========================
  // INIT
  // =========================
  updateMWOptions();
  filterAndSlice();
}
