
function fnheadingInsert() {
  if($(".foundation-text-wrap, .ourleadership-section").length > 0){
    var windowWidth = $(window).width();
    if (windowWidth <= 767) {
        $('.foundation-text-wrap .com-heading').insertAfter('.mob-foundation-heading');
      $(".foundation-left-sec .com-heading h1 br").remove();

      $('.ourleade-detail-right-sec .com-heading').insertAfter('.leader-mob-heading');
    }
  }
  }
 
   
 
  