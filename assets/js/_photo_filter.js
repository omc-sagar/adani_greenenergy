function mediaKitPhotoFilter() {
  $(".media-kit-photo-filter").each(function () {
    var $section = $(this);
    var $wrapper = $section.find(".load-photo-data");
    var $items = $wrapper.find(".announcements-content-col");
    var $filter = $section.find("#categorySelect");
    var $loadMore = $section.find(".media-kit-photo-filter-load-more");

    // -----------------------------------
    // Profile category slice
    // -----------------------------------
    var profileDesktopSlice = 8;
    var profileMobileSlice = 4;

    // -----------------------------------
    // Get current slice
    // -----------------------------------
    function getSlice() {
      var selectedCategory = $filter.val();
      var isProfileCategory =
        selectedCategory === "Board of Directors" ||
        selectedCategory === "Management";

      if (isProfileCategory) {
        return $(window).width() <= 991
          ? profileMobileSlice
          : profileDesktopSlice;
      }

      return $(window).width() <= 991
        ? parseInt($wrapper.attr("data-mob-slice"))
        : parseInt($wrapper.attr("data-slice"));
    }

    var slice = getSlice();
    var visibleCount = slice;

    // -----------------------------------
    // Render
    // -----------------------------------
    function renderItems() {
      var selectedCategory = $filter.val();

      var $filteredItems =
        selectedCategory === ""
          ? $items
          : $items.filter(function () {
              return $(this).attr("data-category-show") === selectedCategory;
            });

      // Profile category
      if (
        selectedCategory === "Board of Directors" ||
        selectedCategory === "Management"
      ) {
        $(".announcements-content-row").addClass("load-profile-data");
      } else {
        $(".announcements-content-row").removeClass("load-profile-data");
      }

      $items.hide();

      $filteredItems.slice(0, visibleCount).show();

      if ($filteredItems.length > visibleCount) {
        $loadMore.show();
        $loadMore.find("a").text("Load More");
      } else {
        $loadMore.hide();
      }
    }

    renderItems();

    // -----------------------------------
    // Filter
    // -----------------------------------
    $filter.on("change", function () {
      slice = getSlice();

      // Reset visible count according to new category
      visibleCount = slice;

      renderItems();
    });

    // -----------------------------------
    // Load More
    // -----------------------------------
    $loadMore.on("click", "a", function (e) {
      e.preventDefault();

      slice = getSlice();

      visibleCount += slice;

      renderItems();
    });

    // -----------------------------------
    // Responsive
    // -----------------------------------
    $(window).on("resize", function () {
      slice = getSlice();

      visibleCount = slice;

      renderItems();
    });
  });
}
