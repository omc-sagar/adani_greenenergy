function fnnewsroomTab() {
  if ($(".stories-right-tab").length > 0) {
    $(".stories-right-tab li > a").on("click", function () {
      var target = $(this).attr("data-rel");
      $(".stories-right-tab li > a").removeClass("active");
      $(this).addClass("active");
      $("#" + target)
        .fadeIn("slow")
        .siblings(".stories-box")
        .hide();
      return false;
    });
  }
}

function fntwoCardSlider() {
  var $window = $(window);
  var windowsize = $window.width();
  if (windowsize <= 1024) {
    //let numberOfSlides;
    if ($(".swiper").length > 0 && $(".two-imgSlideWrapper").length > 0) {
      $(".two-imgSlideWrapper").each(function () {
        var twoImgswiper = new Swiper(this, {
          direction: "horizontal",
          loop: false,
          //loop: numberOfSlides <= 2 ? false:true,
          parallax: true,
          //loopedSlides: 1,
          slidesPerView: 1,
          spaceBetween: 40,
          scrollbar: ".swiper-scrollbar",
          speed: 1500,
          navigation: {
            nextEl: ".two-imgSlideWrapper .swiper-button-next",
            prevEl: ".two-imgSlideWrapper .swiper-button-prev",
          },
          breakpoints: {
            991: {
              slidesPerView: 1.8,
              loop: true,
            },
            481: {
              slidesPerView: 1.4,
              //loop: loopSlides,
              spaceBetween: 30,
              loop: true,
            },
            320: {
              slidesPerView: 1.2,
              //loop: loopSlides,
              spaceBetween: 20,
            },
          },
        });
        var activeIndex = TwoImgswiper.activeIndex;
      });
    }
  }
}

function fnSubscribeSelect() {
  (function ($) {
    var CheckboxDropdown = function (el) {
      var _this = this;
      this.isOpen = false;
      this.areAllChecked = false;
      this.$el = $(el);
      this.$label = this.$el.find(".dropdown-label");
      this.$checkAll = this.$el.find('[data-toggle="check-all"]').first();
      this.$inputs = this.$el.find('[type="checkbox"]');
      this.$dropdownList = this.$el.find(".dropdown-list"); // Dropdown list element

      this.onCheckBox();

      this.$label.on("click", function (e) {
        e.preventDefault();
        _this.toggleOpen();
      });

      this.$checkAll.on("click", function (e) {
        e.preventDefault();
        _this.onCheckAll();
      });

      this.$inputs.on("change", function (e) {
        _this.onCheckBox();
      });

      // Listen for keyboard events when dropdown is open
      $(document).on("keydown", function (e) {
        if (_this.isOpen) {
          _this.handleKeyboardScroll(e);
        }
      });
    };

    CheckboxDropdown.prototype.onCheckBox = function () {
      this.updateStatus();
    };

    CheckboxDropdown.prototype.updateStatus = function () {
      var checked = this.$el.find(":checked");

      this.areAllChecked = false;
      this.$checkAll.html("Check All");

      if (checked.length <= 0) {
        this.$label.html("Select Options");
      } else if (checked.length === 1) {
        this.$label.html(checked.parent("label").text());
      } else if (checked.length === this.$inputs.length) {
        this.$label.html("All Selected");
        this.areAllChecked = true;
        this.$checkAll.html("Uncheck All");
      } else {
        this.$label.html(checked.length + " Selected");
      }
    };

    CheckboxDropdown.prototype.onCheckAll = function (checkAll) {
      if (!this.areAllChecked || checkAll) {
        this.areAllChecked = true;
        this.$checkAll.html("Uncheck All");
        this.$inputs.prop("checked", true);
      } else {
        this.areAllChecked = false;
        this.$checkAll.html("Check All");
        this.$inputs.prop("checked", false);
      }

      this.updateStatus();
    };

    CheckboxDropdown.prototype.toggleOpen = function (forceOpen) {
      var _this = this;

      if (!this.isOpen || forceOpen) {
        this.isOpen = true;
        this.$el.addClass("on");
        this.adjustDropdownPosition(); // Adjust the position when opening

        // Attach the mouse wheel scroll event when the dropdown is open
        this.$dropdownList.on("wheel", function (e) {
          _this.handleMouseWheelScroll(e);
        });

        $(document).on("click", function (e) {
          if (!$(e.target).closest("[data-control]").length) {
            _this.toggleOpen();
          }
        });
        gsap.killTweensOf(this.$dropdownList); // Stop any GSAP animations
      } else {
        this.isOpen = false;
        this.$el.removeClass("on");
        // Remove the mouse wheel scroll event when the dropdown is closed
        this.$dropdownList.off("wheel");
        $(document).off("click");
      }
    };

    CheckboxDropdown.prototype.adjustDropdownPosition = function () {
      var dropdownList = this.$el.find(".dropdown-list"); // Assuming the list has class 'dropdown-list'
      var offset = this.$el.offset();
      var windowHeight = $(window).height();
      var scrollTop = $(window).scrollTop();
      var dropdownHeight = dropdownList.outerHeight();

      // Calculate space above and below the dropdown
      var spaceAbove = offset.top - scrollTop;
      var spaceBelow =
        windowHeight - (offset.top + this.$el.outerHeight() - scrollTop);

      if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
        dropdownList.css({ top: "auto", bottom: "100%" });
      } else {
        dropdownList.css({ top: "100%", bottom: "auto" });
      }
    };

    // New method to handle keyboard scrolling
    CheckboxDropdown.prototype.handleKeyboardScroll = function (e) {
      var key = e.which || e.keyCode;
      var scrollAmount = 100; // Number of pixels to scroll

      switch (key) {
        case 38: // Up arrow
          gsap.to(this.$dropdownList, {
            scrollTo: { y: "-=" + scrollAmount },
            duration: 0.5,
            ease: "power1.inOut",
          });
          e.preventDefault();
          break;
        case 40: // Down arrow
          gsap.to(this.$dropdownList, {
            scrollTo: { y: "+=" + scrollAmount },
            duration: 0.5,
            ease: "power1.inOut",
          });
          e.preventDefault();
          break;
        case 27: // Escape key to close dropdown
          this.toggleOpen();
          e.preventDefault();
          break;
      }
    };

    CheckboxDropdown.prototype.handleMouseWheelScroll = function (e) {
      var delta = e.originalEvent.deltaY; // Get scroll direction
      var scrollAmount = 100; // Number of pixels to scroll

      var dropdownList = this.$dropdownList[0]; // Get the raw DOM element

      // Check if the dropdown can scroll further in the direction of the mouse wheel
      if (
        (delta > 0 &&
          dropdownList.scrollTop + dropdownList.clientHeight >=
            dropdownList.scrollHeight) ||
        (delta < 0 && dropdownList.scrollTop <= 0)
      ) {
        return; // Let the body scroll if the dropdown has reached its limits
      }

      // Scroll the dropdown with GSAP, prevent body scrolling
      gsap.to(this.$dropdownList, {
        scrollTo: { y: "+=" + (delta > 0 ? scrollAmount : -scrollAmount) },
        duration: 0.5,
        ease: "power1.inOut",
      });

      e.preventDefault(); // Prevent default scroll behavior
      e.stopPropagation(); // Stop event from bubbling up to the body
    };

    var checkboxesDropdowns = document.querySelectorAll(
      '[data-control="checkbox-dropdown"]',
    );
    for (var i = 0, length = checkboxesDropdowns.length; i < length; i++) {
      new CheckboxDropdown(checkboxesDropdowns[i]);
    }
  })(jQuery);
}

function fnfiltermob() {
  if ($(".filter-head").length > 0) {
    $(".filter-head").on("click", function () {
      $(".press-searchBox").show();
    });
    $(".filter-close").on("click", function () {
      $(".press-searchBox").hide();
    });
  }
}

function cleanNewsroomContent() {
  var $container = $(".newsroom-media-releases-details");

  // Remove all inline styles
  $container.find("*").removeAttr("style");

  // Remove all <br> tags
  $container.find("br").remove();

  // Remove empty <p> and <p>&nbsp;</p>
  $container
    .find("p")
    .filter(function () {
      return (
        $.trim($(this).html()) === "&nbsp;" || $.trim($(this).text()) === ""
      );
    })
    .remove();
}
