function fnTimelineSlider(){
	if($(".Com_timeline_slider").length > 0){
	const Timeswiper = new Swiper('.Com_timeline_slider', {
		slidesPerView: 1,
		slidesPerView: 1,
		spaceBetween: 30,
		grabCursor: true,
		speed: 500,
		effect: "fade",
		fadeEffect: {
		  crossFade: true,
		},
		pagination: {
		  el: '.slider__pagination',
		  clickable: true,
		},
		navigation: {
		  nextEl: '.slider__button-next',
		  prevEl: '.slider__button-prev',
		},
	});
 }
}