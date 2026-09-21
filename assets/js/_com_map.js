/* 
function applyHoverFeatureOnMap() {
  const hasNoDisplay = $(".map-detsils-wrap").find(".nodisplay").length <= 0;

  $(".choosState option").each(function () {
    const value = $(this).val();

    if (!value) return;

    const $state = $(`#svg-${value}`);

    if (hasNoDisplay) {
      $state.addClass("StateHoverActive");
    } else {
      $state.addClass("active");
    }
  });

    setTimeout(StateHoverActiveEventBind, 100); 
} */
/* 
function StateHoverActiveEventBind() {
  $(".StateHoverActive")
    .off("click.stateMap")
    .on("click.stateMap", function () {
      const stateId = this.id;
      const stateValue = stateId.replace("svg-", "");

      const $stateSelect = $(".choosState");

      $stateSelect.val(stateValue).trigger("change");

      setTimeout(function () {
        $("#indiaMap .StateHoverActive")
          .off("mouseenter.stateHover mouseleave.stateHover")
          .on("mouseenter.stateHover", function () {
            $(this).addClass("hoverActive");
          })
          .on("mouseleave.stateHover", function () {
            $(this).removeClass("hoverActive");
          });
      }, 100);
    });
} */
function applyHoverFeatureOnMap() {
  $(".choosState option").each(function () {
    const value = $(this).val();

    if (!value) return;

    const $state = $(`#svg-${value}`);

    $state.addClass("StateHoverActive").attr("data-state", value);
  });
}
function stateChangeTabSwitch(childTab, business) {
  const parentSelector = `#${business}_container`;

  $(`${parentSelector} .city-data-box`).removeClass("active");
  $(`#${childTab}`).addClass("active");
}

function fnMapDatas() {
  $(".city-radio input[type='radio']").on("change", function () {
    const $radio = $(this);

    const groupName = $radio.attr("name");
    const selectedCity = $radio.data("city");
    const cityName = $radio.data("city-display");
    const stateName = $radio.data("state");
    const selectedBusiness = $radio.data("business");

    const $groupRadios = $(`.city-radio input[name="${groupName}"]`);

    // Show selected city data
    $groupRadios.each(function () {
      const cityDataId = `${this.id}-data`;
      const isSelected = $(this).data("city") === selectedCity;

      $(`#${cityDataId}`).toggle(isSelected);
    });

    // Update city on map
    const $business = $(`#${selectedBusiness}`);

    $business.find(".adainIsHere").removeClass("cityActive");

    $business
      .find(
        `.adainIsHere[data-state="${stateName}"][data-city-display="${cityName}"]`,
      )
      .addClass("cityActive");
  });
}

function handleStateChange() {
  const $select = $(this);

  const selectedState = $select.val();
  const selectedStateText = this.options[this.selectedIndex].text;

  const business = $select.data("business");
  const selectedTab = this.options[this.selectedIndex].getAttribute("data-id");

  const $business = $(`#${business}`);
  const $selectedState = $(`#svg-${selectedState}`);

  // Switch state tab
  stateChangeTabSwitch(selectedTab, business);

  // Update selected state text
  $select
    .closest(".select-box")
    .find(".selectCountryCodeValDisplay")
    .text(selectedStateText);

  // Update active state on map
  $("#india-state .state").removeClass("active");
  $selectedState.addClass("active");

  // Reset state and city
  $business.find(".adainIsHere").removeClass("stateActive cityActive");

  // Activate selected state
  $business
    .find(`.adainIsHere[data-state="${selectedState}"]`)
    .addClass("stateActive");

  // Activate selected city
  const selectedCity = $(
    `input[name="${business}_${selectedState}"]:checked`,
  ).val();

  if (!selectedCity) return;

  const cityName = selectedCity.replace(/\s+/g, "");

  $business
    .find(
      `.adainIsHere[data-state="${selectedState}"][data-city-display="${cityName}"]`,
    )
    .addClass("cityActive");
}

$(document).ready(function () {
  // Initialize city radio functionality
  fnMapDatas();

  // State dropdown change
  $(".choosState").on("change", handleStateChange);

  // Set first state as active
  const firstState = $(".choosState option:first").val();

  if (firstState) {
    $(`#svg-${firstState}`).addClass("active");
  }
});

function fuMapActive() {
  $(document).ready(function () {
    $(".state.StateHoverActive")
      .off("click")
      .on("click", function () {
        const $state = $(this);
        const selectedState = $state.data("state");

        if (!selectedState) return;

        // Remove active state from map
        $("#india-state .state").removeClass("active");

        // Remove active city/state markers
        $(".mapindia .adainIsHere").removeClass(
          "active stateActive cityActive",
        );

        // Add active state on map
        $state.addClass("active");

        // Find dropdown(s) for this state
        $(".choosState").each(function () {
          const $select = $(this);
          const business = $select.data("business");

          // Check whether this dropdown has the selected state
          const $option = $select.find(`option[value="${selectedState}"]`);

          if ($option.length) {
            // Set selected state in dropdown
            $select.val(selectedState);

            // Trigger existing dropdown functionality
            $select.trigger("change");
          }
        });
      });

    // HOVER
    $(".state.StateHoverActive")
      .off("mouseenter mouseleave")
      .on("mouseenter", function () {
        const hoverState = $(this).data("state");

        if (!hoverState) return;

        $(".mapindia .adainIsHere").each(function () {
          if ($(this).data("state") === hoverState) {
            $(this).addClass("hover");
          }
        });
      })
      .on("mouseleave", function () {
        $(".mapindia .adainIsHere").removeClass("hover");
      });
  });
}
