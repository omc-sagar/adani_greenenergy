function fnAcoordian() {
  $(".accordion_head").click(function () {
    if ($(".accordion_body").is(":visible")) {
      $(".accordion_body").slideUp(800);
      $(".plusminus").removeClass("active");
    }
    if ($(this).next(".accordion_body").is(":visible")) {
      $(this).next(".accordion_body").slideUp(800);
      $(this).children(".plusminus").removeClass("active");
    } else {
      $(this).next(".accordion_body").slideDown(500);
      $(this).children(".plusminus").addClass("active");
    }
  });

  $(".show_hide").click(function () {
    $(".aligning-center").toggleClass("active");
    $(".dots").hide();
    $(".show_hide_less").show();
    $(".show_hide").hide();
  });
  $(".show_hide_less").click(function () {
    $(".aligning-center").removeClass("active");
    $(".dots").show();
    $(".show_hide_less").hide();
    $(".show_hide").show();
  });

  $(".accordion_head").on("click", function () {
    $(this).toggleClass("active");
    $(this).siblings().removeClass("active");
    $("html, body").animate(
      {
        scrollTop: $(this).offset().top - 30,
      },
      300,
      "linear"
    );
  });
}
