function fnSpotsUsTab(){
    if($('.Com_spots').length > 0 ){
      $(".spots-box-wrap > ul > li").on('click', function(){
        $(".spots-box-wrap > ul > li").removeClass('active');
        $(this).addClass('active');  

        //tab active deactive 
        var tabSel = $(this).attr('data-tab');
        console.log(tabSel);

        $('.spots-box-textWraper .spots-content').removeClass('active');
        $("#"+tabSel).addClass('active');

        
      })
    }

    //for mobile
    spotTabContentCopyToMobileDiv()
  }

  function spotTabContentCopyToMobileDiv() {
    // Select all elements with the data-tab attribute
    if($(".spots-box-wrap ul li").length > 0 && window.innerWidth < 1024)
    {
        $(".spots-box-wrap ul li[data-tab]").each(function() {
            var data = $(this).attr("data-tab");
            var content = $("#" + data).html();
            // Insert the content into the respective .spots-mobile-text div
            $(this).find(".spots-mobile-text").html(content);
          });
    }

  }

