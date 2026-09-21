/*doncument ready start */
$( document ).ready(function() {
  // Handler for .ready() called.
  $('#indiaMap .StateHoverActive').hover(
    function() {
        $(this).addClass('hoverActive');
    },
    function() {
        $(this).removeClass('hoverActive');
    }
  );

});
/*doncument ready End */