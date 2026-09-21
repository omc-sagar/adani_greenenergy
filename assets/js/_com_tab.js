function compTab() {
  if ($(".tabWrapper").length > 0) {
    $(".tabWrapper li > a").on("click", function () {
      var target = $(this).attr("data-rel");
      $(".tabWrapper li > a").removeClass("active");
      $(this).addClass("active");
      $("#" + target).fadeIn("slow").siblings(".tabContent").hide();
      return false;
    });
  }

  if ($(window).width() <= 991) {
    if ($(".careerSectionNew").length > 0) {
      $(".tabWrapper ul li a").on("click", function (event) {
        event.preventDefault();
        var $tab = $(this);
        $tab[0].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      });
      
      // Enable horizontal scrolling on swipe
      $(".tabWrapper ul").on("touchstart", function (event) {
        //alert('touch')
        var touchStartX = event.originalEvent.touches[0].clientX;
        var $this = $(this);  // Store reference to `this`
        
        $this.on("touchmove", function (event) {
          var touchMoveX = event.originalEvent.touches[0].clientX;
          var moveX = touchStartX - touchMoveX;
          this.scrollLeft += moveX;
          touchStartX = touchMoveX;
          event.preventDefault();
        });
  
        // Unbind touchmove when touch ends or is canceled
        $this.on("touchend touchcancel", function () {
          $this.off("touchmove");
        });
  
      });
    }
  }
  
}
