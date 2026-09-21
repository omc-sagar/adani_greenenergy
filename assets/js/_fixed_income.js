/* function initLoadmorelist() {
  const refreshView = ($container) => {
    const wv = $(window).width();
    const sliceCount =
      wv > 767
        ? parseInt($container.attr("data-slice")) || Infinity
        : parseInt($container.attr("data-mob-slice")) || 2;

    const loadDataItems = $container.find(".loading-more-row");
    loadDataItems.hide();

    if (sliceCount === Infinity) {
      loadDataItems.show();
    } else {
      loadDataItems.slice(0, sliceCount).show();
    }

    const loadMoreButton = $container
      .next(".MoreFeaturesSee")
      .find(".loadMore");

    if (sliceCount === Infinity || loadDataItems.length <= sliceCount) {
      loadMoreButton.hide();
    } else {
      loadMoreButton.show();
    }
  };


  $(".MoreDataDiv").each(function () {
    refreshView($(this));
  });


  $(document).on("click", ".loadMore", function (e) {
    e.preventDefault();

    const $this = $(this);
    const $container = $this.parents(".MoreFeaturesSee").prev(".MoreDataDiv");

    $container.find(".loading-more-row:hidden").slideDown();


    $this.hide();
  });


  $(window).on("resize", function () {
    $(".MoreDataDiv").each(function () {
      refreshView($(this));
    });
  });
}
 */
function initLoadmorelist() {
  function setupSlice($container) {
    var desktopSlice = parseInt($container.attr("data-slice")) || Infinity;
    var mobileSlice = parseInt($container.attr("data-mob-slice")) || 2;

    var sliceCount = $(window).width() > 767 ? desktopSlice : mobileSlice;

    var $items = $container.find(".loading-more-row-award");
    var totalItems = $items.length;

    // Reset
    $items.hide();
    $container.data("currentIndex", 0);

    // Initial load
    loadItems($container, sliceCount);

    var $btn = $container.next(".MoreFeaturesaward").find(".loadMorebtn");

    if (totalItems <= sliceCount || sliceCount === Infinity) {
      $btn.hide();
    } else {
      $btn.show();
    }
  }

  function loadItems($container, sliceCount) {
    var currentIndex = $container.data("currentIndex") || 0;
    var $items = $container.find(".loading-more-row-award");
    var totalItems = $items.length;

    $items.slice(currentIndex, currentIndex + sliceCount).slideDown();

    currentIndex += sliceCount;
    $container.data("currentIndex", currentIndex);

    var $btn = $container.next(".MoreFeaturesaward").find(".loadMorebtn");

    if (currentIndex >= totalItems) {
      $btn.hide();
    }
  }

  // Initialize all
  $(".MoreDataDivAwards").each(function () {
    setupSlice($(this));
  });

  // Load More Click
  $(document).on("click", ".loadMorebtn", function (e) {
    e.preventDefault();

    var $btn = $(this);
    var $container = $btn
      .closest(".MoreFeaturesaward")
      .prev(".MoreDataDivAwards");

    var desktopSlice = parseInt($container.attr("data-slice")) || Infinity;
    var mobileSlice = parseInt($container.attr("data-mob-slice")) || 2;

    var sliceCount = $(window).width() > 767 ? desktopSlice : mobileSlice;

    loadItems($container, sliceCount);
  });

  // Recalculate on resize
  $(window).on("resize", function () {
    $(".MoreDataDivAwards").each(function () {
      setupSlice($(this));
    });
  });
}

function innerTab() {
  $(".inner-tab-headings .innerTab").click(function () {
    var $parentGroup = $(this).closest(".inner-tab-group");

    $parentGroup.find(".innerTab").removeClass("active");
    $(this).addClass("active");

    var index = $(this).index();
    $parentGroup
      .find(".innerTab-contentRow")
      .removeClass("active")
      .eq(index)
      .addClass("active");
    fnNormalTextAnim();
  });
}
