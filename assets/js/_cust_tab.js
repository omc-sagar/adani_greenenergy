function funcusttab() {
  $(".cust-tab-list").each(function () {
    const $tabList = $(this);
    const $panelWrap = $tabList
      .parent() // .cust-tab-sec
      .next("div"); // panel container

    $tabList.find(".cust-tab-item").on("click", function () {
      const panelId = $(this).data("tab");

      // active tab
      $tabList.find(".cust-tab-item").removeClass("cust-tab-active");

      $(this).addClass("cust-tab-active");

      // active panel (scoped)
      $panelWrap.find(".cust-tab-panel").removeClass("cust-tab-show");
      initNewOpeningsSwiper();
      $panelWrap.find("#" + panelId).addClass("cust-tab-show");
    });
  });
}
