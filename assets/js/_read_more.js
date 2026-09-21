function initReadMore(container = ".twocolumnimgSec .singlecol", lines = 3) {
  $(container).find(".read-more-btn").remove();

  $(container)
    .find(".description")
    .each(function () {
      const $desc = $(this);

      let lineHeight = parseFloat($desc.css("line-height"));

      if (isNaN(lineHeight)) {
        lineHeight = parseFloat($desc.css("font-size")) * 1.5;
      }

      const collapsedHeight = lineHeight * lines;
      const fullHeight = this.scrollHeight;

      $desc.removeClass("expanded").css("max-height", collapsedHeight + "px");

      if (fullHeight > collapsedHeight + 5) {
        $desc.after('<span class="read-more-btn">Read More</span>');
      }
    });

  $(document)
    .off("click.readMore")
    .on(
      "click.readMore",
      ".twocolumnimgSec .singlecol .read-more-btn",
      function () {
        const $btn = $(this);
        const $desc = $btn.prev(".description");

        if ($desc.hasClass("expanded")) {
          let lineHeight = parseFloat($desc.css("line-height"));
          let collapsedHeight = lineHeight * lines;

          $desc
            .removeClass("expanded")
            .css("max-height", collapsedHeight + "px");

          $btn.text("Read More");
        } else {
          $desc
            .addClass("expanded")
            .css("max-height", $desc[0].scrollHeight + "px");

          $btn.text("Read Less");
        }
      },
    );
}

/* function initReadMorenew(
  container = ".foundationOperationRow .foundationOperationCard",
  lines = 3,
) {
  const $container = $(container);

  function setupReadMore() {
    $container.find(".read-more-btn").remove();

    $container.find("p").each(function () {
      const $desc = $(this);

      let lineHeight = parseFloat($desc.css("line-height"));

      if (isNaN(lineHeight)) {
        lineHeight = parseFloat($desc.css("font-size")) * 1.5;
      }

      const collapsedHeight = lineHeight * lines;

      // Reset before measuring
      $desc.removeClass("expanded").css("max-height", "none");

      // Get actual content height
      const fullHeight = this.scrollHeight;

      // Apply collapsed height
      $desc.css("max-height", collapsedHeight - 5 + "px");

      // Add button if content exceeds 3 lines
      if (fullHeight > collapsedHeight + 5) {
        $desc.after('<span class="read-more-btn">Read More</span>');
      }
    });
  }

  setupReadMore();

  // Recalculate after images/fonts/layout are rendered
  setTimeout(setupReadMore, 100);
  setTimeout(setupReadMore, 500);

  $(document)
    .off(
      "click.readMore",
      ".foundationOperationRow .foundationOperationCard .read-more-btn",
    )
    .on(
      "click.readMore",
      ".foundationOperationRow .foundationOperationCard .read-more-btn",
      function (e) {
        e.preventDefault();

        const $btn = $(this);
        const $desc = $btn.prev("p");

        if (!$desc.length) return;

        let lineHeight = parseFloat($desc.css("line-height"));

        if (isNaN(lineHeight)) {
          lineHeight = parseFloat($desc.css("font-size")) * 1.5;
        }

        const collapsedHeight = lineHeight * lines;

        if ($desc.hasClass("expanded")) {
          // Read Less
          $desc
            .removeClass("expanded")
            .css("max-height", collapsedHeight - 5 + "px");

          $btn.text("Read More");
        } else {
          // Read More
          const fullHeight = $desc[0].scrollHeight;

          $desc.addClass("expanded").css("max-height", fullHeight + "px");

          $btn.text("Read Less");
        }
      },
    );
} */

function setSustainableFuturePointHeight() {
  const $points = $(".sustainableFuturePoint");

  // Reset height before calculation
  $points.css("height", "auto");

  let maxHeight = 0;

  // Find tallest box
  $points.each(function () {
    const height = $(this).outerHeight();
    maxHeight = Math.max(maxHeight, height);
  });

  // Apply tallest height to all boxes
  $points.css("height", maxHeight + "px");
}

// Page load
$(window).on("load", function () {
  setSustainableFuturePointHeight();
});

// Resize
let sustainableResizeTimer;

$(window).on("resize", function () {
  clearTimeout(sustainableResizeTimer);

  sustainableResizeTimer = setTimeout(function () {
    setSustainableFuturePointHeight();
  }, 200);
});

function setStrategicPillarListHeight() {
  const $columns = $(".strategicPillarColumn");

  $columns.find(".strategicPillarList li").css("height", "auto");

  let maxItems = 0;

  $columns.each(function () {
    maxItems = Math.max(
      maxItems,
      $(this).find(".strategicPillarList li").length,
    );
  });

  for (let i = 0; i < maxItems; i++) {
    let maxHeight = 0;

    $columns.each(function () {
      const $li = $(this).find(".strategicPillarList li").eq(i);

      if ($li.length) {
        maxHeight = Math.max(maxHeight, $li.outerHeight());
      }
    });

    $columns.each(function () {
      const $li = $(this).find(".strategicPillarList li").eq(i);

      if ($li.length) {
        $li.css("height", maxHeight + "px");
      }
    });
  }
}

function resizeStrategicPillarList() {
  if ($(window).width() > 991) {
    setStrategicPillarListHeight();
  } else {
    $(".strategicPillarList li").css("height", "auto");
  }
}

$(window).on("load", function () {
  resizeStrategicPillarList();
});

let strategicResizeTimer;

$(window).on("resize", function () {
  clearTimeout(strategicResizeTimer);

  strategicResizeTimer = setTimeout(function () {
    resizeStrategicPillarList();
  }, 200);
});
