function fnCareerSlider() {

	document.addEventListener('DOMContentLoaded', function () {

		var Careerswiper = new Swiper('.career-slider-container', {
			parallax: false,
			slidesPerView: 2,
			spaceBetween: 40,
			scrollbar: '.swiper-scrollbar',
			speed: 1000,
			loop: true,
			navigation: {
				nextEl: ".career-slider-container .swiper-button-next",
				prevEl: ".career-slider-container .swiper-button-prev",
			},
			breakpoints: {
				"@0.00": {
					slidesPerView: 1.5,
					spaceBetween: 20,
				},

				"@1.50": {
					slidesPerView: 2,
					spaceBetween: 40,
				},
			},

		});
		var Careerslides = document.querySelectorAll('.career-slider-container .swiper-slide');
		var activeIndex = Careerswiper.activeIndex;
		// Careerslides.forEach(function (slide, index) {
		//     slide.addEventListener('mouseenter', function () {
		//         Careerswiper.slideTo(index);
		//     });

		//     slide.addEventListener('mouseleave', function () {
		//         Careerswiper.slideTo(activeIndex); 
		//     });
		// });

		// Careerswiper.on('slideChange', function () {
		//     activeIndex = Careerswiper.activeIndex;
		// });
	});
}

function initializeBenefitRows() {
	$(".reportDetail").each(function() {
		var $benefitRows = $(this).find(".benefitLeft .benefitRow");
		if ($benefitRows.length <= 6) {
			$benefitRows.show();
			$(this).find(".loadbtn").hide();
		} else {
			$benefitRows.slice(0, 6).show();
			$benefitRows.slice(6).hide();
		}
	});
}

function loadMore() {
	$(".reportDetail .loadbtn").on("click", function (e) {
		e.preventDefault();
		var $benefitRows = $(this).siblings(".benefitLeft").find(".benefitRow:hidden");
		$benefitRows.slice(0, 6).slideDown();

		if ($benefitRows.length <= 6) {
			$(this).hide();
		}
	});
}

/* function loadMore() {
	$(".benefitLeft .benefitRow").slice(0, 6).show();
	$(".loadbtn").on("click", function (e) {
		e.preventDefault();
		$(".benefitLeft .benefitRow:hidden").slice(0, 6).slideDown();
		if ($(".benefitLeft .benefitRow:hidden").length == 0) {
			//$("#loadMore").text("No Content").addClass("noContent");
		}
	});
} */