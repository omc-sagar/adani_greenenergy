function mapCitiesSlider(containerSelector) {
  const cityBoxes = document.querySelectorAll(containerSelector);
  cityBoxes.forEach((cityBox) => {
    const cityList = cityBox.querySelector(".city-radiobuttton ul");
    if (!cityList) return;

    const cities = cityList.querySelectorAll("li");

    // Remove any existing slider
    const existingSlider = cityBox.querySelector(".city-radiobutton-slider");
    if (existingSlider) existingSlider.remove();

    if (cities.length === 0) {
      cityList.innerHTML = '<li class="no-cities">No cities available</li>';
      return;
    }

    // Display as grid if 6 or fewer cities
    if (cities.length <= 12) {
      const grid = document.createElement("ul");
      grid.className = "city-grid";
      cities.forEach((city) => grid.appendChild(city.cloneNode(true)));
      cityList.innerHTML = "";
      cityList.appendChild(grid);
      return;
    }

    // Create slider for more than 6 cities
    createCitySlider(cityBox, cities);
  });
}

function createCitySlider(cityBox, cities) {
  const sliderContainer = document.createElement("div");
  sliderContainer.className = "city-radiobutton-slider";

  const swiperWrapper = document.createElement("div");
  swiperWrapper.className = "swiper-wrapper";

  const itemsPerSlide = 12; // 3 columns x 2 rows
  const totalSlides = Math.ceil(cities.length / itemsPerSlide);

  for (let slideIndex = 0; slideIndex < totalSlides; slideIndex++) {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";

    const grid = document.createElement("ul");
    grid.className = "city-grid";

    const start = slideIndex * itemsPerSlide;
    const end = Math.min(start + itemsPerSlide, cities.length);

    for (let i = start; i < end; i++) {
      const cityItem = cities[i].cloneNode(true);
      const radio = cityItem.querySelector('input[type="radio"]');
      const label = cityItem.querySelector("label");

      if (radio && label) {
        // Keep same name for group
        const originalName = radio.getAttribute("name");
        radio.name = originalName;

        // Make unique id for cloned radio
        const uniqueId = `${radio.id}_${slideIndex}_${i}`;
        radio.id = uniqueId;
        label.setAttribute("for", uniqueId);
      }

      grid.appendChild(cityItem);
    }

    slide.appendChild(grid);
    swiperWrapper.appendChild(slide);
  }

  sliderContainer.appendChild(swiperWrapper);

  if (totalSlides > 1) {
    const prevBtn = document.createElement("div");
    prevBtn.className = "city-slider-prev";
    const nextBtn = document.createElement("div");
    nextBtn.className = "city-slider-next";
    const pagination = document.createElement("div");
    pagination.className = "city-slider-pagination";

    sliderContainer.appendChild(prevBtn);
    sliderContainer.appendChild(nextBtn);
    sliderContainer.appendChild(pagination);
  }

  cityBox.querySelector(".city-radiobuttton ul").innerHTML = "";
  cityBox.querySelector(".city-radiobuttton ul").appendChild(sliderContainer);

  // Initialize Swiper
  setTimeout(() => {
    try {
      new Swiper(sliderContainer, {
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
          prevEl: sliderContainer.querySelector(".city-slider-prev"),
          nextEl: sliderContainer.querySelector(".city-slider-next"),
        },
        pagination: {
          el: sliderContainer.querySelector(".city-slider-pagination"),
          clickable: true,
        },
        speed: 400,
      });
    } catch (e) {
      console.error("Swiper init error:", e);
    }
  }, 100);
}
