function fnCustomCategoryFilter() {
  const $dropdown = $(".custom-catagory-filter-dropdown");
  const $header = $(".custom-catagory-filter-dropdown-header span");
  const $options = $(".custom-catagory-filter-options li");
  const $items = $(".disclosure-listWrap ul li");

  // Toggle dropdown
  $(".custom-catagory-filter-dropdown-header").on("click", function (e) {
    e.stopPropagation();
    $dropdown.toggleClass("open");
  });

  // Filter on click
  $options.on("click", function (e) {
    e.stopPropagation();
    const selectedCategory = $(this).data("category");

    $header.text(selectedCategory);
    $dropdown.removeClass("open");

    $items.hide();
    $items.filter(`[data-category="${selectedCategory}"]`).fadeIn(200);
  });

  // Close dropdown when clicking outside
  $(document).on("click", function () {
    $dropdown.removeClass("open");
  });
}
