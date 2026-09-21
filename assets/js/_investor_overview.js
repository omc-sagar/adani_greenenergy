let currentSwiper = null; // Track current Swiper instance

function initYearDataSwiper() {
  const windowWidth = window.innerWidth;

  // Destroy existing Swiper if initialized
  if (currentSwiper) {
    currentSwiper.destroy(true, true);
    currentSwiper = null;
  }

  // Only activate swiper below 991px
  if (windowWidth > 991) {
    return; // Don't initialize swiper above 991px
  }

  // Initialize new Swiper on active financial row
  const activeSlider = document.querySelector(".financialDataRow.active");
  if (!activeSlider) return;

  currentSwiper = new Swiper(activeSlider, {
    slidesPerView: 2.5,
    spaceBetween: 20,
    loop: true,
    navigation: {
      nextEl: ".custom-next",
      prevEl: ".custom-prev",
    },
    breakpoints: {
      768: { slidesPerView: 2.5 },
      320: { slidesPerView: 1.5 },
    },
  });
}

function fnCustomDropdown() {
  // Set the first option as default in the dropdown header
  const firstOption = $(".Keydropdown-options li").first();
  const firstOptionText = firstOption.text();
  $(".dropdown-header span").text(firstOptionText);

  // Ensure the first financial data row is active before triggering the click
  const firstIndex = firstOption.index();
  $(".financialDataRow")
    .removeClass("active")
    .eq(firstIndex)
    .addClass("active");

  // Initialize Swiper for the first active row
  initYearDataSwiper();

  $(".dropdown-header").click(function () {
    $(".custom-dropdown").toggleClass("open");
    $(".Keydropdown-options").toggle();
  });

  $(".Keydropdown-options li").click(function () {
    const index = $(this).index();
    $(".dropdown-header span").text($(this).text());
    $(".financialDataRow").removeClass("active").eq(index).addClass("active");
    $(".custom-dropdown").removeClass("open");
    $(".Keydropdown-options").hide();

    // Reinitialize Swiper with new active content
    initYearDataSwiper();
    fnBusinessAni();
  });
}

// Optionally, reinitialize on window resize
/* window.addEventListener("resize", function () {
  initYearDataSwiper();
}); */

function toggleAccordion($accordionHead) {
  var $row = $accordionHead.closest(".accodianRow");

  if ($accordionHead.hasClass("active")) {
    // remove active
    $accordionHead.removeClass("active");
    $row.removeClass("active");
    $accordionHead.next(".accordionContentSec").slideUp();
  } else {
    var $accordion = $accordionHead.parents(".customAccordian");

    // Close all others
    $accordion
      .find(".accordionHead")
      .removeClass("active")
      .next(".accordionContentSec")
      .slideUp();

    $accordion.find(".accodianRow").removeClass("active");

    // Open current
    $accordionHead.addClass("active");
    $row.addClass("active");
    $accordionHead.next(".accordionContentSec").slideDown();
  }
}

$(document).on("click", ".customAccordian .accordionHead", function () {
  toggleAccordion($(this));
});

function updateAccordion() {
  if ($(window).width() < 1199) {
    /* =====================
       MOBILE – CLICK
    ====================== */

    // Remove desktop hover
    $(".horizontal-accordion-item").off("mouseenter mouseleave");

    // Heading click
    $(".horizontal-accordian-heading")
      .off("click")
      .on("click", function (e) {
        e.stopPropagation();
        const $item = $(this).closest(".horizontal-accordion-item");
        $item.toggleClass("active").siblings().removeClass("active");
      });

    // Default active
    $(".horizontal-accordion-item")
      .removeClass("active")
      .first()
      .addClass("active");
  } else {
    /* =====================
       DESKTOP – HOVER
    ====================== */

    // Remove mobile click
    $(".horizontal-accordian-heading").off("click");

    $(".horizontal-accordion-item")
      .off("mouseenter mouseleave")
      .on("mouseenter", function () {
        $(this).addClass("active").siblings().removeClass("active");
      });

    // Keep first active by default
    $(".horizontal-accordion-item")
      .removeClass("active")
      .first()
      .addClass("active");
  }
}

// Run on load
updateAccordion();

// Run on resize
$(window).on("resize", function () {
  updateAccordion();
});

/* function overAccordion() {
  $(".banner-accordion-content").hide(); 

  $(".banner-accordion-row").hover(
    function () {
    
      $(".banner-accordion-row").removeClass("active");
      $(".banner-accordion-content").slideUp();

      $(this).addClass("active");
      $(this).find(".banner-accordion-content").stop(true, true).slideDown();
    },
    function () {
    
      $(this).removeClass("active");
      $(this).find(".banner-accordion-content").stop(true, true).slideUp();
    }
  );
} */
function initCustomTabs($wrapper) {
  const $tabs = $wrapper.find(".customTab");
  const $contents = $wrapper.find(".customTab-content .content");
  const $moreBtn = $wrapper.find(".more-customTab");
  const $dropdown = $wrapper.find(".dropdown-options");

  function setDefaultTab() {
    const $firstTab = $tabs.first();
    const year = $firstTab.data("year");

    $tabs.removeClass("active");
    $contents.hide();

    $firstTab.addClass("active");
    $contents.filter(`[data-year="${year}"]`).show();

    if (window.innerWidth <= 767) {
      $moreBtn.text($firstTab.text());
    } else {
      $moreBtn.text("More");
    }
  }

  function handleResponsiveTabs() {
    if (window.innerWidth > 767) {
      $dropdown.find(".customTab:lt(5)").hide();
    } else {
      $dropdown.find(".customTab:lt(5)").show();
    }
  }

  // INIT
  handleResponsiveTabs();
  setDefaultTab();

  // RESIZE
  $(window).on("resize", function () {
    handleResponsiveTabs();
    setDefaultTab();
  });

  // MAIN TAB CLICK
  $tabs.on("click", function () {
    const year = $(this).data("year");

    $tabs.removeClass("active");
    $(this).addClass("active");

    $contents.hide();
    $contents.filter(`[data-year="${year}"]`).show();

    $dropdown.hide();
    $moreBtn.removeClass("open");

    if (window.innerWidth > 767) {
      $moreBtn.text("More");
    }
  });

  // MORE BUTTON CLICK (starts animation)
  $moreBtn.on("click", function (e) {
    e.stopPropagation();
    $(this).toggleClass("open");
    $dropdown.toggle();
  });

  // AFTER ARROW ANIMATION ENDS
  $moreBtn.on("transitionend", function (e) {
    if (e.target !== this) return;

    // runs AFTER animation
    fnBusinessAni?.();
  });

  // DROPDOWN TAB CLICK
  $dropdown.on("click", ".customTab", function () {
    const year = $(this).data("year");

    $tabs.removeClass("active");
    $(this).addClass("active");

    $contents.hide();
    $contents.filter(`[data-year="${year}"]`).show();

    $moreBtn.text($(this).text()).removeClass("open");
    $dropdown.hide();
  });

  // OUTSIDE CLICK
  $(document).on("click", function (e) {
    if (!$(e.target).closest($wrapper).length) {
      $dropdown.hide();
      $moreBtn.removeClass("open");
    }
  });
}

/* function fucustomTab() {
  function setDefaultActiveTab() {
    const $originalTabs = $(".customTab");
    const $latestTab = $originalTabs.first();
    const latestYear = $latestTab.data("year");

    $(".customTab, .content").removeClass("active");
    $latestTab.addClass("active");
    $(`.content[data-year="${latestYear}"]`).addClass("active");

    if (window.innerWidth <= 767) {
      $(".more-customTab").text($latestTab.text());
    } else {
      $(".more-customTab").text("More");
    }
  }

  function toggleDropdownOptions() {
    if ($(window).width() > 767) {
      $(".dropdown-options .customTab:lt(5)").hide();
    } else {
      $(".dropdown-options .customTab:lt(5)").show();
    }
  }

  toggleDropdownOptions();
  setDefaultActiveTab();

  $(window).resize(function () {
    toggleDropdownOptions();
    setDefaultActiveTab();
  });

  $(".customTab").click(function () {
    var selectedYear = $(this).data("year");

    $(".customTab").removeClass("active");
    $(this).addClass("active");

    $(".customTab-content .content").hide();
    $('.customTab-content .content[data-year="' + selectedYear + '"]').show();

    $(".dropdown-options").hide();

    if ($(window).width() > 767) {
      $(".more-customTab").text("More");
    }
  });

  const firstYear = $(".customTab").first().data("year");
  $(".customTab[data-year='" + firstYear + "']").addClass("active");
  $(".customTab-content .content").hide();
  $('.customTab-content .content[data-year="' + firstYear + '"]').show();

 
  $(".more-customTab").click(function (e) {
    e.stopPropagation(); 
    $(".dropdown-options").toggle();
  });

  $(".dropdown-options").on("click", ".customTab", function () {
    const selectedText = $(this).text();
    $(".more-customTab").text(selectedText);
    $(".dropdown-options").removeClass("open");
    fnBusinessAni();
  });

  $(document).click(function (e) {
    if (!$(e.target).closest(".more-dropdown").length) {
      $(".dropdown-options").hide();
    }
  });
}
 */
/* function fnTblOrientation() {
  const orientationBtn = document.querySelector(".table-orentation");
  const tableWrapper = document.querySelector(".table-mobile-view");
  const tableFormatWrapper = document.querySelector(".orentation-wrapper");
  const tableElement = document.querySelector(".table-responsive table");

  if (
    !orientationBtn ||
    !tableWrapper ||
    !tableFormatWrapper ||
    !tableElement
  ) {
    console.error("One or more required elements are missing.");
    return;
  }

  orientationBtn.addEventListener("click", function () {
    tableWrapper.classList.toggle("rotated-table");

    if (tableWrapper.classList.contains("rotated-table")) {
      const tableWidth = tableElement.offsetWidth;
      const extraHeight = 50;

      tableFormatWrapper.style.height = `${tableWidth + extraHeight}px`;
      tableWrapper.style.width = `${tableWidth}px`;
    } else {
      tableWrapper.style.width = "auto";
      tableFormatWrapper.style.height = "auto";
    }
  });
} */
function fnTblOrientation() {
  const orientationBtns = document.querySelectorAll(".table-orentation");

  if (!orientationBtns.length) return;

  orientationBtns.forEach((orientationBtn) => {
    const wrapper = orientationBtn.closest(".orentation-wrapper");
    if (!wrapper) return;

    const tableWrapper = wrapper.querySelector(".table-mobile-view");
    const tableElement = wrapper.querySelector(".table-responsive table");

    if (!tableWrapper || !tableElement) return;

    orientationBtn.addEventListener("click", function () {
      tableWrapper.classList.toggle("rotated-table");

      if (tableWrapper.classList.contains("rotated-table")) {
        const tableWidth = tableElement.offsetWidth;
        const extraHeight = 50;

        // Device/container width - 100px
        const deviceWidth = tableWrapper.parentElement.clientWidth - 40;

        // Existing functionality - DON'T CHANGE
        wrapper.style.height = `${tableWidth + extraHeight}px`;
        tableWrapper.style.width = `${tableWidth}px`;

        // Rotated table height
        tableWrapper.style.height = `${deviceWidth}px`;
      } else {
        tableWrapper.style.width = "";
        wrapper.style.height = "";
        tableWrapper.style.height = "";
      }
    });
  });
}

function mobToggleAccordion() {
  if ($(window).width() < 991) {
    $(".mobile-accordian-content").hide();
    $(".mobile-accordian-title").removeClass("active");

    $(".mobile-accordian-title")
      .off("click")
      .on("click", function () {
        const content = $(this).next(".mobile-accordian-content");

        $(this).toggleClass("active");
        content.stop(true, true).slideToggle(300);

        // Optional: Close other open
        $(".mobile-accordian-title").not(this).removeClass("active");
        $(".mobile-accordian-content").not(content).slideUp(300);
      });
  } else {
    $(".mobile-accordian-content").show();
    $(".mobile-accordian-title").removeClass("active").off("click");
  }
}
