function fnthreeHalfImageSlider() {
 if($(".threeHalfSlider-Wrapper").length > 0){
  let numberOfSlides;
  $(".threeHalfSlider-Wrapper").each(function(){
    var threeImgswiper = new Swiper(this, {
       direction : 'horizontal',
       loop: true, 
       loop: numberOfSlides <= 3 ? false:true,
       parallax: true,
       //loopedSlides: 1, 
       slidesPerView: 3.2,
       spaceBetween: 20,
       scrollbar: '.swiper-scrollbar',
       speed: 1500,                                              
       navigation: {                       
           nextEl: $(this).find('.swiper-button-next')[0],
           prevEl: $(this).find('.swiper-button-prev')[0],
       },
       breakpoints: {
        991: {
            slidesPerView: 3.2,
            spaceBetween: 30,
        },
        481: {
            slidesPerView: 1.8,
            //loop: loopSlides, 
            spaceBetween: 30,
        },
        320: {
            slidesPerView: 1.2,
            //loop: loopSlides, 
            spaceBetween: 20
        },
    }
   });
   
 })
}

}



// function fnanimateCounter() {
//     if ($(".counter").length > 0) {
//         $('.counter').each(function () {
//             var $this = $(this);
//             var startValue = parseFloat($this.data('counter-start')) || 0; 
//             var endValue = parseFloat($this.text()); 
            
//             $this.prop('Counter', startValue).animate({
//                 Counter: endValue
//             }, {
//                 duration: 4000,
//                 easing: 'swing',
//                 step: function (now) {
//                     $this.text(now.toFixed(1)); 
//                 }
//             });
//         });
//     }
// }

