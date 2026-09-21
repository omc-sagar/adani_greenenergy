function initESGPoliciesDropdown() {
    $(document).ready(function () {
       // Initialize span with active li text
       var initialCategory = $('.esgPolicies-options li.active').text();
       $('.selected-category-name').text(initialCategory);

       // Toggle dropdown visibility with smooth effect
       $('.esgPolicies-dropdown-header').click(function () {
          // Toggle with slideDown (open) and slideUp (close)
          if ($('.esgPolicies-options').is(':visible')) {
             $('.esgPolicies-options').slideUp(400); // Slide up with slow effect
          } else {
             $('.esgPolicies-options').slideDown(400); // Slide down with slow effect
          }
       });

       // On clicking a category option
       $('.esgPolicies-options li').click(function () {
          var tabId = $(this).data('tab'); // Get the tab number
          var categoryName = $(this).text(); // Get the category name

          // Update the selected category text in the dropdown
          $('.selected-category-name').text(categoryName);

          // Close the dropdown with smooth effect
          $('.esgPolicies-options').slideUp(400);

          // Switch active class on tabs and content
          $('.esgPolicies-options li').removeClass('active');
          $(this).addClass('active');

          $('.esgPolicies-tab-content').removeClass('active');
          $('.tab-' + tabId).addClass('active');
       });

       // Optional: Hide dropdown when clicking outside
       $(document).click(function (e) {
          if (!$(e.target).closest('.esgPolicies-dropdown').length) {
             $('.esgPolicies-options').slideUp(400); // Slide up with smooth effect
          }
       });
    });
 }
