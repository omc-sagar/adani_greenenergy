function VideosPop() {
  $('[data-fancybox="video"]').fancybox({
    loop: false,
    transitionDuration: 100,
    animationDuration: 500,
    animationEffect: "fade",
    buttons: [
      "slideShow",
      "fullScreen",
      "thumbs",
      //'share',
      "download",
      //'zoom',
      "close",
    ],
    slideShow: {
      autoStart: false,
      speed: 300,
    },
    thumbs: {
      autoStart: false,
    },
  });
}

/*
function FnSimpleTabs() {
    $(document).ready(function() {
      $('.simpleTab').click(function() {
       
        $('.simpleTab').removeClass('active');
  
       
        $(this).addClass('active');
  
       
        var index = $(this).index();
  
      
        $('.simpleTab-contentRow').removeClass('active').attr('style', 'display: none;');
  
        
        $('.simpleTab-contentRow').eq(index).addClass('active').attr('style', 'display: block;');
      });
  
     
      $('.simpleTab-contentRow').not('.active').attr('style', 'display: none;');
      $('.simpleTab-contentRow.active').attr('style', 'display: block;');
    });
  }
  
*/

function FnSimpleTabs(containerSelector) {
  $(document).ready(function () {
    $(containerSelector).each(function () {
      var $container = $(this);
      var $tabList = $container.find(".simpleTab-list");
      var $tabs = $tabList.find(".simpleTab");
      var $contentRows = $container.find(".simpleTab-contentRow");
      var $dropdownLabel = $container.find(".Mobile_dropdown-label");
      var $mobileDropdown = $container.find(".mobile-dropdown-list");

      // --------------------------------
      // ADD DATA-TAB-ATTR DYNAMICALLY
      // --------------------------------

      $tabs.each(function () {
        var tabValue = $(this).text().trim();

        $(this).attr("data-tab-attr", tabValue);
      });

      // --------------------------------
      // ACTIVATE TAB
      // --------------------------------

      function activateTab(index) {
        if (index < 0 || index >= $tabs.length) {
          index = 0;
        }

        // Remove active class from tabs
        $tabs.removeClass("active");

        // Add active class to selected tab
        $tabs.eq(index).addClass("active");

        // Hide all content
        $contentRows.removeClass("active").hide();

        // Show selected content
        $contentRows.eq(index).addClass("active").show();

        // Update mobile dropdown
        $dropdownLabel.text($tabs.eq(index).text().trim());

        // --------------------------------
        // VIDEOS TAB
        // --------------------------------

        var $activeTab = $tabs.eq(index);
        var $activeContentRow = $contentRows.eq(index);

        if (
          $activeTab.hasClass("active") &&
          $activeTab.attr("data-tab-attr") === "Videos"
        ) {
          $activeContentRow
            .find(".announcements-content-row.load-profile-data")
            .removeClass("load-profile-data");
        }
      }

      // --------------------------------
      // TAB CLICK
      // --------------------------------

      $tabs.click(function () {
        var index = $(this).index();

        activateTab(index);

        if ($(window).width() <= 767) {
          $tabList.removeClass("show-dropdown").addClass("hide-dropdown");

          setTimeout(function () {
            $tabList.hide().removeClass("hide-dropdown");
          }, 300);
        }

        fnBusinessAni();
        setTimeout(function () {
          initReadMoreAwards(".awards-grid-col", 2);
        }, 50);
      });

      // --------------------------------
      // MOBILE DROPDOWN
      // --------------------------------

      $dropdownLabel.click(function () {
        if ($(window).width() <= 767) {
          if ($tabList.is(":visible")) {
            $tabList.removeClass("show-dropdown").addClass("hide-dropdown");

            setTimeout(function () {
              $tabList.hide().removeClass("hide-dropdown");
            }, 300);
          } else {
            $tabList
              .show()
              .removeClass("hide-dropdown")
              .addClass("show-dropdown");
          }
        }
      });

      // --------------------------------
      // INITIALIZE TABS
      // --------------------------------

      function initializeTabs() {
        if ($(window).width() <= 767) {
          var activeIndex = $tabs.index($tabs.filter(".active"));

          if (activeIndex === -1) {
            activeIndex = 0;
          }

          activateTab(activeIndex);

          $tabList.hide().removeClass("show-dropdown hide-dropdown");

          $dropdownLabel.show();

          if ($mobileDropdown.length) {
            $tabList.removeClass("tab-heading-list");
          }
        } else {
          $contentRows.not(".active").hide();
          $contentRows.filter(".active").show();

          $tabList.show().removeClass("show-dropdown hide-dropdown");

          $dropdownLabel.hide();

          if ($mobileDropdown.length) {
            $tabList.addClass("tab-heading-list");
          }
        }
      }

      // --------------------------------
      // INITIALIZE
      // --------------------------------

      initializeTabs();

      // --------------------------------
      // OPEN TAB FROM URL
      // --------------------------------

      var urlParams = new URLSearchParams(window.location.search);
      var tabParam = urlParams.get("tab");

      if (tabParam !== null) {
        var tabIndex = parseInt(tabParam, 10) - 1;

        if (!isNaN(tabIndex) && tabIndex >= 0 && tabIndex < $tabs.length) {
          activateTab(tabIndex);
        }
      }

      // --------------------------------
      // WINDOW RESIZE
      // --------------------------------

      $(window).resize(function () {
        initializeTabs();
      });
    });
  });
}
/* function FnSimpleTabs(containerSelector) {
  $(document).ready(function () {
    $(containerSelector).each(function (containerIndex) {
      var $container = $(this);
      var $tabList = $container.find(".simpleTab-list");
      var $tabs = $tabList.find(".simpleTab");
      var $contentRows = $container.find(".simpleTab-contentRow");
      var $dropdownLabel = $container.find(".Mobile_dropdown-label");
      var $mobileDropdown = $container.find(".mobile-dropdown-list");

      
      $tabs.each(function (i) {
        $(this).attr("id", "FY24-ActiveTab-" + containerIndex + "-" + i);
      });
      $contentRows.each(function (i) {
        $(this).attr(
          "id",
          "FY24-ActiveTab-Content-" + containerIndex + "-" + i
        );
      });

      function activateTab(index) {
    
        $tabs.removeClass("active");
        $tabs.eq(index).addClass("active");

        $contentRows.removeClass("active").hide();
        $contentRows.eq(index).addClass("active").show();

   
        $dropdownLabel.text($tabs.eq(index).text());
      }

      $tabs.click(function () {
        var index = $(this).index();
        if ($(window).width() > 767) {
          activateTab(index);
        } else {
          activateTab(index);

       
          $tabList.removeClass("show-dropdown").addClass("hide-dropdown");
          setTimeout(function () {
            $tabList.hide().removeClass("hide-dropdown");
          }, 300);
        }
      });

      $dropdownLabel.click(function () {
        if ($(window).width() <= 767) {
          if ($tabList.is(":visible")) {
       
            $tabList.removeClass("show-dropdown").addClass("hide-dropdown");
            setTimeout(function () {
              $tabList.hide().removeClass("hide-dropdown");
            }, 300);
          } else {
          
            $tabList
              .show()
              .removeClass("hide-dropdown")
              .addClass("show-dropdown");
          }
        }
      });

      function initializeTabs() {
        var activeIndex = $tabs.index($tabs.filter(".active"));

      
        if (activeIndex === -1) activeIndex = 0;

      
        activateTab(activeIndex);

        if ($(window).width() <= 767) {
          $tabList.hide().removeClass("show-dropdown hide-dropdown");
          $dropdownLabel.show();

          if ($mobileDropdown.length) {
            $tabList.removeClass("tab-heading-list");
          }
        } else {
          $contentRows.not(".active").hide();
          $contentRows.filter(".active").show();
          $tabList.show().removeClass("show-dropdown hide-dropdown");
          $dropdownLabel.hide();

          if ($mobileDropdown.length) {
            $tabList.addClass("tab-heading-list");
          }
        }
      }


      initializeTabs();

   
      $(window).resize(function () {
        initializeTabs();
      });
    });
  });
}
 */
