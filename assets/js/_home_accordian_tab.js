function initializeAccordionTabs() {
    // Handle click events on accordion headings
    $(document).on('click', '.accordionMain .accordionHeading', function () {
        const accordionIndex = $(this).index('.accordionMain .accordionHeading'); // Get the index of the clicked accordion

        if ($(this).hasClass('active')) {
            // Special condition for the first accordion
            if (accordionIndex === 0 && $('.accordionMain .accordionHeading.active').length === 1) {
                return; // Prevent the first accordion from closing if it's the only active one
            }
            // Deactivate the clicked accordion
            $(this).removeClass('active');
            $(this).next('.accordionContent').slideUp();
            $('.tabMain .tabContent').eq(accordionIndex).hide(); // Hide corresponding tabContent
        } else {
            // Deactivate all accordion headings and tabContent
            $('.accordionMain .accordionHeading').removeClass('active');
            $('.accordionMain .accordionContent').slideUp();
            $('.tabMain .tabContent').hide();

            // Activate the clicked accordion and show corresponding tabContent
            $(this).addClass('active');
            $(this).next('.accordionContent').slideDown();
            $('.tabMain .tabContent').eq(accordionIndex).show();
        }
    });

    // Initialize the first accordion and tab as active on page load
    $(function () {
        $('.accordionMain .accordionHeading').first().addClass('active');
        $('.accordionMain .accordionContent').first().slideDown();
        $('.tabMain .tabContent').hide().first().show(); // Show the first tab content
    });
}
