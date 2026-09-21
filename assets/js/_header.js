function fnsearchBar() {
  if ($(".search-bar-wrapper").length > 0) {
    $(".search-bar").on("click", function () {
      $(".search-bar-wrapper").addClass("active");
      $("body").css("overflow", "hidden");
      $("#GlobalSearchInput").focus();
    });
  }
}

function fnsearchBarClose() {
  if ($(".search-bar-wrapper").length > 0) {
    $(".close-search-bar").on("click", function () {
      $(".search-bar-wrapper").removeClass("active");
      $("body").css("overflow", "inherit");
    });
  }
}

function fnsearchdropDown() {
  $("#GlobalSearchInput").keyup(function () {
    var globalSearch = document.getElementById("showSearchDiv");
    if ($(this).val() == "") {
      globalSearch.style.display = "none";
    } else {
      globalSearch.style.display = "block";
    }
  });
}

// function fnDisablities(){
//   $('.wheelchair a').on('click', function(){
//     $(".disability-dropdown").slideToggle(300);
//   })
// }

function fnBiggerfont() {
  $("#bigger-font").change(function () {
    // Get the current font size of the html element
    let htmlFonts = $("html");
    let currentFontSize = parseFloat(htmlFonts.css("font-size"));

    if ($(this).is(":checked")) {
      // Calculate the new font size (increase by 10%)
      let newFontSize = currentFontSize * 6.7;

      // Set the new font size
      htmlFonts.css("font-size", newFontSize + "%");
    } else {
      // Reset the font size to the default value (16px, for example)
      htmlFonts.css("font-size", "62.5%");
    }
  });
}

//   function fnColorTheme() {
//     // Handle the click event for the color theme button
//     $(".color-theme").on('click', function() {
//         $('.color-theme-list').toggleClass('active');
//         $(this).find('span').toggleClass('active');
//         $('li.font-increase').find('span').removeClass('active');
//         $('.language-button').removeClass('active');
//     });

//     // Load the saved theme from local storage
//     let savedTheme = localStorage.getItem('themeColor');
//     if (savedTheme) {
//         $('html').addClass(savedTheme);
//         let savedImgSrc = localStorage.getItem('themeIcon');
//         $('.color-theme > span > a > img').attr('src', savedImgSrc);
//     } else {
//         // If no saved theme, set the default theme to light mode
//         $('html').addClass('light-mode');
//     }

//     // Handle the click event for the theme options
//     $(".color-theme-list > li").on('click', function() {
//         let themeColor = $(this).attr('data-theme');
//         let newImgSrc = $(this).find('img').attr('src');
//         let previousTheme = $('html').attr('class').split(' ').find(c => c.endsWith('-mode'));

//         // Remove the previous theme class
//         if (previousTheme) {
//             $('html').removeClass(previousTheme);
//         }

//         // Add the new theme class
//         $('html').addClass(themeColor);

//         // Save the new theme and icon to local storage
//         localStorage.setItem('themeColor', themeColor);
//         localStorage.setItem('themeIcon', newImgSrc);

//         // Update the theme icon
//         $('.color-theme > span > a > img').attr('src', newImgSrc);
//         $('.color-theme > span > a').attr('data-theme', themeColor);
//     });

//     // Close the theme list when clicking outside
//     $(document).on('click', function(event) {
//         if (!$(event.target).closest('.color-theme, .color-theme-list').length) {
//             $('.color-theme-list').removeClass('active');
//         }
//     });
// }

/* function fnFontIncrease() {
  function updateDefaultFontText() {
    let htmlElement = $("html");
    let defaultFontLi = $('.font-list li[data-font="font-default"]');
    let baseFont = 100;

    if (htmlElement.hasClass("font-increase")) {
      baseFont += 2; // +2%
      if (htmlElement.hasClass("double-increase")) {
       
        baseFont += 2; 
      }
    } else if (htmlElement.hasClass("font-decrease")) {
      baseFont -= 2; 
      if (htmlElement.hasClass("double-decrease")) {
        baseFont -= 2; 
      }
    }
    defaultFontLi.text(baseFont + "%");
  }

  function applyFont(fontValue) {
    if (fontValue) {
      let htmlElement = $("html");
      let isDoubleIncrease = false;
      let isDoubleDecrease = false;

      htmlElement.removeClass(
        "double-increase double-decrease font-increase font-decrease font-default"
      );

      if (fontValue === "font-increase") {
        if (localStorage.getItem("selectedFont") === "font-increase") {
          isDoubleIncrease = true;
          htmlElement.addClass("double-increase"); // changed here
        }
      } else if (fontValue === "font-decrease") {
        if (localStorage.getItem("selectedFont") === "font-decrease") {
          isDoubleDecrease = true;
          htmlElement.addClass("double-decrease");
        }
      }

      htmlElement.addClass(fontValue);

      $(".font-increase > span > a")
        .text($('.font-list li[data-font="' + fontValue + '"]').text())
        .attr("data-font", fontValue);

      // Save settings
      localStorage.setItem("selectedFont", fontValue);
      localStorage.setItem(
        "isDoubleIncrease",
        isDoubleIncrease ? "true" : "false"
      );
      localStorage.setItem(
        "isDoubleDecrease",
        isDoubleDecrease ? "true" : "false"
      );

      updateDefaultFontText(); 
    }
  }


  let storedFontValue = localStorage.getItem("selectedFont");
  let activeFontTab = localStorage.getItem("activeFontTab");
  let isDoubleIncrease = localStorage.getItem("isDoubleIncrease") === "true";
  let isDoubleDecrease = localStorage.getItem("isDoubleDecrease") === "true";

  applyFont(storedFontValue);

  if (isDoubleIncrease) {
    $("html").addClass("double-increase"); 
  }
  if (isDoubleDecrease) {
    $("html").addClass("double-decrease");
  }

  if (activeFontTab) {
    $('.font-list li[data-font="' + activeFontTab + '"]').addClass("active");
  } else if (storedFontValue) {
    $('.font-list li[data-font="' + storedFontValue + '"]').addClass("active");
  }

  updateDefaultFontText(); 

  $(".font-list").on("click", "li", function (e) {
    e.stopPropagation();
    let fontValue = $(this).attr("data-font");

    applyFont(fontValue);

    $(".font-list li.active").removeClass("active");
    $(this).addClass("active");

    localStorage.setItem("selectedFont", fontValue);
    localStorage.setItem("activeFontTab", fontValue);

    $(".font-list").removeClass("active");
    $(".font-increase span").removeClass("active");
  });

  $(document).on("click", function () {
    $(".font-list").removeClass("active");
  });
} */

function fnFontIncrease() {
  function updateFontLabels() {
    let htmlElement = $("html");
    let classList = htmlElement.attr("class")?.split(/\s+/) || [];
    let fontSize = 100; // default

    if (classList.includes("font-increase")) fontSize += 2;
    if (classList.includes("double-increase")) fontSize += 2;
    if (classList.includes("font-decrease")) fontSize -= 2;
    if (classList.includes("double-decrease")) fontSize -= 2;

    // Update <li data-font="font-default"> text dynamically
    $('.font-list li[data-font="font-default"]').text(fontSize + "%");
  }

  function applyFont(fontValue) {
    let htmlElement = $("html");

    // Get current classes
    let existingClasses = htmlElement.attr("class")?.split(/\s+/) || [];
    let fontClassSet = new Set(existingClasses);
    let preservedClasses = existingClasses.filter(
      (c) =>
        ![
          "font-increase",
          "double-increase",
          "font-decrease",
          "double-decrease",
          "font-default",
        ].includes(c),
    );

    // Prevent over-adding
    if (
      fontValue === "font-increase" &&
      fontClassSet.has("font-increase") &&
      fontClassSet.has("double-increase")
    ) {
      return;
    }
    if (
      fontValue === "font-decrease" &&
      fontClassSet.has("font-decrease") &&
      fontClassSet.has("double-decrease")
    ) {
      return;
    }

    // Remove old font classes
    let cleanedClasses = preservedClasses.filter(
      (c) =>
        ![
          "font-increase",
          "double-increase",
          "font-decrease",
          "double-decrease",
          "font-default",
        ].includes(c),
    );

    if (fontValue === "font-increase") {
      if (fontClassSet.has("font-increase")) {
        cleanedClasses.push("font-increase", "double-increase");
      } else {
        cleanedClasses.push("font-increase");
      }
    } else if (fontValue === "font-decrease") {
      if (fontClassSet.has("font-decrease")) {
        cleanedClasses.push("font-decrease", "double-decrease");
      } else {
        cleanedClasses.push("font-decrease");
      }
    } else if (fontValue === "font-default") {
      cleanedClasses.push("font-default");
    }

    // Apply updated classes
    htmlElement.attr("class", cleanedClasses.join(" ").trim());

    // Store only font-related classes
    let fontOnlyClasses = cleanedClasses.filter((c) =>
      [
        "font-increase",
        "double-increase",
        "font-decrease",
        "double-decrease",
        "font-default",
      ].includes(c),
    );
    localStorage.setItem("selectedFont", fontValue);
    localStorage.setItem("bodyClasses", fontOnlyClasses.join(" "));

    // Update display label
    $(".font-increase > span > a")
      .text($('.font-list li[data-font="' + fontValue + '"]').text())
      .attr("data-font", fontValue);

    // Update font size label dynamically
    updateFontLabels();
  }

  // Apply stored font classes
  let storedClasses = localStorage.getItem("bodyClasses");
  if (storedClasses) {
    let currentClasses = $("html").attr("class")?.split(/\s+/) || [];
    let nonFontClasses = currentClasses.filter(
      (c) =>
        ![
          "font-increase",
          "double-increase",
          "font-decrease",
          "double-decrease",
          "font-default",
        ].includes(c),
    );
    $("html").attr(
      "class",
      nonFontClasses.concat(storedClasses.split(/\s+/)).join(" ").trim(),
    );
  }

  let storedFontValue = localStorage.getItem("selectedFont");
  let activeFontTab = localStorage.getItem("activeFontTab");

  if (activeFontTab) {
    $('.font-list li[data-font="' + activeFontTab + '"]').addClass("active");
  } else if (storedFontValue) {
    $('.font-list li[data-font="' + storedFontValue + '"]').addClass("active");
  }

  if (storedFontValue && storedFontValue !== "font-default") {
    $('.font-list li[data-font="font-default"]').removeClass("active");
  }

  // Click event for font change
  $(".font-list").on("click", "li", function (e) {
    e.stopPropagation();
    let fontValue = $(this).attr("data-font");

    applyFont(fontValue);

    $(".font-list li.active").removeClass("active");
    $(this).addClass("active");

    localStorage.setItem("activeFontTab", fontValue);
  });

  $(document).on("click", function () {
    $(".font-list").removeClass("active");
  });

  // Run once on page load
  updateFontLabels();
}
 
/*function fnaccesbilityTab() {
  $(".accessibility-tab > span").on("click", function () {
    $(".disability-dropdown").slideToggle("active");
    $(this).find("span").toggleClass("active");
    $("li.font-increase").removeClass("active");
    $(".language-button").removeClass("active");
  });

  let savedTheme = localStorage.getItem("themeColor");
  let savedThemeLi = localStorage.getItem("activeThemeLi");
  let activeThemeLi = localStorage.getItem("activeThemeLi");

  if (savedTheme) {
    $("html").addClass(savedTheme);

    if (savedThemeLi) {
      $(".color-theme-tab > li").removeClass("active");
      $(`.color-theme-tab > li[data-theme='${savedThemeLi}']`).addClass(
        "active",
      );
    }
  } else {
    $("html").addClass("light-mode");
    $('.color-theme-tab > li[data-theme="light-mode"]').addClass("active");
  }

  $(".color-theme-tab > li").on("click", function () {
    let themeColor = $(this).attr("data-theme");

    $(".color-theme-tab > li").removeClass("active");

    $('.color-theme-tab > li[data-theme="' + themeColor + '"]').addClass(
      "active",
    );

    let previousTheme = $("html")
      .attr("class")
      .split(" ")
      .find((c) => c.endsWith("-mode"));

    if (previousTheme) {
      $("html").removeClass(previousTheme);
    }

    $("html").addClass(themeColor);

    updateIndiaMapForDarkMode();

    localStorage.setItem("themeColor", themeColor);
    localStorage.setItem("activeThemeLi", themeColor);

    setTimeout(function () {
      homeRunAnimation();
    }, 300);
  });
  $(document).on("click", function (event) {
    if (
      !$(event.target).closest(".accessibility-tab, .disability-dropdown")
        .length
    ) {
      $(".disability-dropdown").slideUp("active");
    }
  });

  $("#resetButton").on("click", function () {
    $(".font-list li, .color-theme-tab > li").removeClass("active");

    $('.font-list > li[data-font="font-default"]').addClass("active");
    $('.color-theme-tab > li[data-theme="light-mode"]').addClass("active");

    $("html")
      .removeClass(
        "font-increase font-decrease double-increase double-decrease dark-mode",
      )
      .addClass("font-default light-mode");
    $('.font-list li[data-font="font-default"]').text("100%");
    // 🔥 FIX: clear stored font values
    localStorage.setItem("selectedFont", "font-default");
    localStorage.setItem("bodyClasses", "font-default");
    localStorage.removeItem("activeFontTab");

    updateFontLabels();
  });
}
 */

/* =========================
   GLOBALS
========================= */
const Htmlelement = document.documentElement;
let colorCode = "#000000";

let split1, split2, split3, split4, split5;

/* =========================
   COLOR DECIDER
========================= */
function colorDecide() {
  colorCode = Htmlelement.classList.contains("dark-mode")
    ? "#ffffff"
    : "#000000";
}

/* =========================
   SPLITTEXT INIT (RUN ONCE)
========================= */
function InnerpageRunAnimation() {
  gsap.registerPlugin(SplitText, ScrollTrigger);

  colorDecide();
  color: (colorCode,
    (split1 = new SplitText(".growth-subtext1", { type: "words,chars" })));
  split2 = new SplitText(".growth-subtext2", { type: "words,chars" });
  split3 = new SplitText(".growth-subtext3", { type: "words,chars" });
  split4 = new SplitText(".growth-subtext4", { type: "words,chars" });
  split5 = new SplitText(".growth-subtext5", { type: "words,chars" });

  // PROFILE SECTION
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".profile-section",
        start: "10% 90%",
        end: "+=60%",
        scrub: true,
      },
    })
    .fromTo(split1.chars, { opacity: 0.2 }, { opacity: 1, stagger: 0.05 });

  // PROFILE EVEN
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".profile-even",
        start: "10% 70%",
        end: "+=60%",
        scrub: true,
      },
    })
    .fromTo(split2.chars, { opacity: 0.2 }, { opacity: 1, stagger: 0.05 });

  // GRADIENT SECTION
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".home-ani-profile",
        start: "60% 90%",
        end: "+=60%",
        scrub: true,
      },
    })
    .fromTo(split3.chars, { opacity: 0.2 }, { opacity: 1, stagger: 0.05 });
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".about-textgradient-sec",
        start: "60% 90%",
        end: "+=60%",
        scrub: true,
      },
    })
    .fromTo(split4.chars, { opacity: 0.2 }, { opacity: 1, stagger: 0.05 });
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".leaderMessageTextAnimation",
        start: "30% 80%",
        end: "+=40%",
        scrub: true,
      },
    })
    .fromTo(split5.chars, { opacity: 0.2 }, { opacity: 1, stagger: 0.05 });
  updateSplitTextColors();
}

/* =========================
   UPDATE COLORS SAFELY
========================= */
function updateSplitTextColors() {
  colorDecide();

  if (split1)
    gsap.set(split1.chars, {
      color: colorCode,
      overwrite: "auto",
      immediateRender: true,
    });

  if (split2)
    gsap.set(split2.chars, {
      color: colorCode,
      overwrite: "auto",
      immediateRender: true,
    });

  if (split3)
    gsap.set(split3.chars, {
      color: "#ffffff",
      overwrite: "auto",
      immediateRender: true,
    });
  if (split4)
    gsap.set(split4.chars, {
      color: colorCode,
      overwrite: "auto",
      immediateRender: true,
    });
  if (split5)
    gsap.set(split5.chars, {
      color: "#ffffff",
      overwrite: "auto",
      immediateRender: true,
    });
  // 🔥 THIS PREVENTS MISSING TEXT
  ScrollTrigger.refresh();
}

/* =========================
   ACCESSIBILITY + THEME
========================= */
/* function fnaccesbilityTab() {
  $(".accessibility-tab > span").on("click", function () {
    $(".disability-dropdown").slideToggle("active");
    $(this).find("span").toggleClass("active");
    $("li.font-increase").removeClass("active");
    $(".language-button").removeClass("active");
  });

  // LOAD THEME
  let savedTheme = localStorage.getItem("themeColor");
  let savedThemeLi = localStorage.getItem("activeThemeLi");

  if (savedTheme) {
    $("html").addClass(savedTheme);
    $(".color-theme-tab > li").removeClass("active");
    $(`.color-theme-tab > li[data-theme="${savedThemeLi}"]`).addClass("active");
  } else {
    $("html").addClass("light-mode");
    $('.color-theme-tab > li[data-theme="light-mode"]').addClass("active");
  }

  updateSplitTextColors();

  $(".color-theme-tab > li").on("click", function () {
    let themeColor = $(this).data("theme");

    // 1️⃣ Apply theme to HTML
    $("html").removeClass("light-mode dark-mode").addClass(themeColor);

    // 2️⃣ Sync ACTIVE state across ALL toggles
    $(".color-theme-tab > li").removeClass("active");
    $('.color-theme-tab > li[data-theme="' + themeColor + '"]').addClass(
      "active",
    );

    // 3️⃣ Update animations + maps
    updateSplitTextColors();
    updateIndiaMapForDarkMode();
    //  updateChartTheme(chart);
    // 4️⃣ Save
    localStorage.setItem("themeColor", themeColor);
    localStorage.setItem("activeThemeLi", themeColor);

    setTimeout(homeRunAnimation, 300);
  });

  // CLICK OUTSIDE
  $(document).on("click", function (event) {
    if (
      !$(event.target).closest(".accessibility-tab, .disability-dropdown")
        .length
    ) {
      $(".disability-dropdown").slideUp("active");
    }
  });

  // RESET
  $("#resetButton").on("click", function () {
    // Reset active tabs
    $(".font-list li, .color-theme-tab > li").removeClass("active");

    // Set default active tabs
    $('.font-list > li[data-font="font-default"]').addClass("active");
    $('.color-theme-tab > li[data-theme="light-mode"]').addClass("active");

    // Reset HTML classes
    $("html")
      .removeClass(
        "font-increase font-decrease double-increase double-decrease font-default dark-mode",
      )
      .addClass("font-default light-mode");

    // Reset font label
    $('.font-list li[data-font="font-default"]').text("100%");

    // Reset localStorage
    localStorage.setItem("themeColor", "light-mode");
    localStorage.setItem("activeThemeLi", "light-mode");

    localStorage.setItem("selectedFont", "font-default");
    localStorage.setItem("bodyClasses", "font-default");

    // Remove old active font
    localStorage.removeItem("activeFontTab");

    // Update UI
    updateSplitTextColors();
    updateFontLabels();
  });
} */


function fnaccesbilityTab() {
  $(".accessibility-tab > span").on("click", function () {
    $(".disability-dropdown").slideToggle("active");
    $(this).find("span").toggleClass("active");
    $("li.font-increase").removeClass("active");
    $(".language-button").removeClass("active");
  });

  /* UPDATE CARBON TEXT */
  function updateCarbonText() {
    if ($("html").hasClass("light-mode")) {
      $(".carbon-text").text("Switch to Low Carbon Mode");
    } else if ($("html").hasClass("dark-mode")) {
      $(".carbon-text").text("Switch to Light Mode");
    }
  }

  /* LOAD THEME */
  let savedTheme = localStorage.getItem("themeColor");
  let savedThemeLi = localStorage.getItem("activeThemeLi");

  if (savedTheme) {
    $("html").addClass(savedTheme);

    $(".color-theme-tab > li").removeClass("active");

    $(`.color-theme-tab > li[data-theme="${savedThemeLi}"]`).addClass(
      "active",
    );
  } else {
    $("html").addClass("light-mode");

    $('.color-theme-tab > li[data-theme="light-mode"]').addClass("active");
  }

  updateSplitTextColors();
  updateCarbonText();

  /* THEME CHANGE */
  $(".color-theme-tab > li").on("click", function () {
    let themeColor = $(this).data("theme");

    // 1️⃣ Apply theme to HTML
    $("html")
      .removeClass("light-mode dark-mode")
      .addClass(themeColor);

    // 2️⃣ Sync ACTIVE state across ALL toggles
    $(".color-theme-tab > li").removeClass("active");

    $('.color-theme-tab > li[data-theme="' + themeColor + '"]').addClass(
      "active",
    );

    // 3️⃣ Update animations, maps & carbon text
    updateSplitTextColors();
    updateIndiaMapForDarkMode();
    updateCarbonText();

    /* updateChartTheme(chart); */

    // 4️⃣ Save theme
    localStorage.setItem("themeColor", themeColor);
    localStorage.setItem("activeThemeLi", themeColor);

    setTimeout(homeRunAnimation, 300);
  });

  /* CLICK OUTSIDE */
  $(document).on("click", function (event) {
    if (
      !$(event.target).closest(".accessibility-tab, .disability-dropdown")
        .length
    ) {
      $(".disability-dropdown").slideUp("active");
    }
  });

  /* RESET */
  $("#resetButton").on("click", function () {
    // Reset active tabs
    $(".font-list li, .color-theme-tab > li").removeClass("active");

    // Set default active tabs
    $('.font-list > li[data-font="font-default"]').addClass("active");

    $('.color-theme-tab > li[data-theme="light-mode"]').addClass("active");

    // Reset HTML classes
    $("html")
      .removeClass(
        "font-increase font-decrease double-increase double-decrease font-default dark-mode",
      )
      .addClass("font-default light-mode");

    // Reset font label
    $('.font-list li[data-font="font-default"]').text("100%");

    // Reset localStorage
    localStorage.setItem("themeColor", "light-mode");
    localStorage.setItem("activeThemeLi", "light-mode");

    localStorage.setItem("selectedFont", "font-default");
    localStorage.setItem("bodyClasses", "font-default");

    // Remove old active font
    localStorage.removeItem("activeFontTab");

    // Update UI
    updateSplitTextColors();
    updateFontLabels();
    updateCarbonText();
  });
}