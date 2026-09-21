// Home Video

$("[data-fancybox]").fancybox({
  iframe: {
    attr: {
      referrerpolicy: "strict-origin-when-cross-origin",
      allowfullscreen: true,
    },
  },
});

let smoother;

window.addEventListener("load", () => {
  smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.2,
    effects: true,
  });

  scrollToHash();
});
function scrollToHash() {
  const hash = window.location.hash;
  if (!hash) return;

  const target = document.querySelector(hash);
  if (!target) {
    console.warn("Target not found:", hash);
    return;
  }

  // Let ScrollSmoother fully settle
  gsap.delayedCall(0.3, () => {
    gsap.to(window, {
      scrollTo: {
        y: target,
        offsetY: 0,
      },
      duration: 1,
      ease: "power2.out",
    });
  });
}

var vw = window.innerWidth || document.documentElement.clientWidth;
document.querySelectorAll("video").forEach(function (video) {
  var vw = window.innerWidth || document.documentElement.clientWidth;

  if (vw > 767) {
    video.src = video.getAttribute("data-video-desktop");
    video.poster = video.getAttribute("data-poster-desktop");
  } else {
    video.src = video.getAttribute("data-video-mobile");
    video.poster = video.getAttribute("data-poster-mobile");
  }
});

//for investor NSE BSE  tab

$(".stock-tab").click(function () {
  let selectedTab = $(this).data("tab");

  $(".stock-tab").removeClass("active");
  $(this).addClass("active");

  $(".stock-tab-content").removeClass("active").hide();
  $('.stock-tab-content[data-content="' + selectedTab + '"]')
    .addClass("active")
    .show();

  $(".stock-graph").removeClass("active").hide();
  $('.stock-graph[data-graph="' + selectedTab + '"]')
    .addClass("active")
    .show();
});

$(".stock-tab.active").trigger("click");

// for investor grapth

// title Toggle  for mobile view

if ($(window).width() <= 991) {
  $(".table-title").click(function () {
    $(".table-data").slideToggle();
    $(this).toggleClass("active");
  });
}

// GItika

// about us text Animation

// Initial run

let currentURL = window.location.href;
if (currentURL.includes("hi-in")) {
  console.log("The URL contains 'hi-in'.");
} else {
  InnerpageRunAnimation();
}

// Filter Js

function setDefaultYearFilter() {
  var latestYearElement = $(".YearFilter li").first();
  applyYearFilter(latestYearElement);
}

function resetCategoryFilter() {
  $(".announcements-category-filter .announcements-dropdown-header span").text(
    "Select Category",
  );
  $(".announcements-category-filter").removeAttr("data-selected-category");
  $(".CategoryFilter li").removeClass("active");
}

function applyYearFilter(element) {
  var selectedYear = element.data("year");
  var selectedYearText = element.text();

  $(".announcements-year-filter .announcements-dropdown-header span").text(
    selectedYearText,
  );
  $(".announcements-year-filter").attr("data-selected-year", selectedYear);

  $(".YearFilter li").removeClass("active");
  element.addClass("active");

  resetCategoryFilter();
  filterAnnouncements();
}

function applyCategoryFilter(element) {
  var selectedCategory = element.data("category");
  var selectedCategoryText = element.text();

  $(".announcements-category-filter .announcements-dropdown-header span").text(
    selectedCategoryText,
  );
  $(".announcements-category-filter").attr(
    "data-selected-category",
    selectedCategory,
  );

  $(".CategoryFilter li").removeClass("active");
  element.addClass("active");

  filterAnnouncements();
}

function filterAnnouncements($parent) {
  var selectedYear = $parent
    .find(".announcements-year-filter")
    .attr("data-selected-year");
  var selectedCategory = $parent
    .find(".announcements-category-filter")
    .attr("data-selected-category");

  var isMobile = $(window).width() < 991;

  var sliceLimit = isMobile
    ? parseInt($parent.attr("data-mob-slice")) || 6
    : parseInt($parent.attr("data-slice")) || 9;

  var $items = $parent.find(".announcements-content-col");
  var $viewMore = $parent.find(".viewMoreFeatures");

  $items.hide();

  var matchedItems = $items.filter(function () {
    var yearMatch = !selectedYear || $(this).data("year") == selectedYear;
    var categoryMatch =
      !selectedCategory || $(this).data("category") == selectedCategory;

    return yearMatch && categoryMatch;
  });

  // Save matched items and current visible count
  $parent.data("matchedItems", matchedItems);
  $parent.data("visibleCount", sliceLimit);

  matchedItems.slice(0, sliceLimit).show();

  if (matchedItems.length > sliceLimit) {
    $viewMore.show();
  } else {
    $viewMore.hide();
  }
}

// Initial load
$(".loadDataDiv").each(function () {
  filterAnnouncements($(this));
});

// View More
$(document).on("click", ".viewMoreFeatures", function () {
  var $parent = $(this).closest(".loadDataDiv");

  var matchedItems = $parent.data("matchedItems");

  var isMobile = $(window).width() < 991;

  var sliceLimit = isMobile
    ? parseInt($parent.attr("data-mob-slice")) || 6
    : parseInt($parent.attr("data-slice")) || 9;

  var visibleCount = $parent.data("visibleCount") || sliceLimit;

  matchedItems.slice(visibleCount, visibleCount + sliceLimit).show();

  visibleCount += sliceLimit;

  $parent.data("visibleCount", visibleCount);

  if (visibleCount >= matchedItems.length) {
    $(this).hide();
  }
});

$(".YearFilter li").click(function () {
  applyYearFilter($(this));
  $(this).closest(".announcements-options").slideUp();
});

$(".CategoryFilter li").click(function () {
  applyCategoryFilter($(this));
  $(this).closest(".announcements-options").slideUp();
});

$(".announcements-dropdown-header").click(function () {
  var dropdown = $(this).next(".announcements-options");
  $(".announcements-options").not(dropdown).slideUp();
  dropdown.slideToggle();
});

$(document).click(function (e) {
  if (!$(e.target).closest(".announcements-dropdown").length) {
    $(".announcements-options").slideUp();
  }
});

setDefaultYearFilter();

$(".viewMoreFeatures").click(function () {
  var selectedYear = $(".announcements-year-filter").attr("data-selected-year");
  var selectedCategory = $(".announcements-category-filter").attr(
    "data-selected-category",
  );

  $(".announcements-content-col").each(function () {
    var yearMatch = !selectedYear || $(this).data("year") === selectedYear;
    var categoryMatch =
      !selectedCategory || $(this).data("category") === selectedCategory;

    if (yearMatch && categoryMatch) {
      $(this).show();
    }
  });

  $(this).hide();
});

// Filter Js End
/* let smoother = ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 2,
  effects: true, // must be true to enable data-speed / data-lag
  normalizeScroll: true,
});
 */

const wrapper = document.querySelector(".selectbox");
const select = wrapper.querySelector("select");

select.addEventListener("mousedown", () => {
  wrapper.classList.add("open");
});

select.addEventListener("change", () => {
  wrapper.classList.remove("open");
});

select.addEventListener("blur", () => {
  wrapper.classList.remove("open");
});
