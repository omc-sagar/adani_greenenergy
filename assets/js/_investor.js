function downloadReports() {
  if ($(".reportsTab").length > 0) {
    $(".reportsTab li > a").on("click", function () {
      var target = $(this).attr("data-rel");
      $(".reportsTab li > a").removeClass("active");
      $(this).addClass("active");
      $("#" + target)
        .fadeIn("slow")
        .siblings(".reportDetail")
        .hide();
      return false;
    });
  }

  if ($(window).width() <= 991) {
    if ($(".careerSectionNew, #reports").length > 0) {
      $(".reportsTab ul li a").on("click", function (event) {
        event.preventDefault();
        var $tab = $(this);
        $tab[0].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      });
      // Enable horizontal scrolling on swipe
    $(".reportsTab ul").on("touchstart", function (event) {
        var touchStartX = event.originalEvent.touches[0].clientX;
        $(this).on("touchmove", function (event) {
            var touchMoveX = event.originalEvent.touches[0].clientX;
            var moveX = touchStartX - touchMoveX;
            this.scrollLeft += moveX;
            touchStartX = touchMoveX;
            event.preventDefault();
        });
    }).on("touchend touchcancel", function () {
        $(this).off("touchmove");
    });
    }
  }
}

function initializeMediaKitTabs() {
  if($(".media-kit").length > 0) {
    $(".tab-button").on("click", function () {
      $(".tab-button").removeClass("active");
      $(this).addClass("active");

      $(".tab-content").removeClass("active");
      $("#" + $(this).data("tab")).addClass("active");
    });
 }
}



    function fntestPresentation() {
        if ($('.presentation-thumbnail').length > 0) {
    setTimeout(function(){
        let pdfDoc = null,
            pageNum = 1,
            pageRendering = false,
            pageNumPending = null,
            scale = 0.8,
            canvas = document.getElementById("the-canvas"),
            ctx = canvas.getContext("2d"),
            currentPdfUrl = "";

        // The workerSrc property shall be specified.
        pdfjsLib.GlobalWorkerOptions.workerSrc = "/assets/adaniv1/dist/plugin/js/ppt-viewer/pdf.worker.js";

        function renderPage(num) {
            pageRendering = true;
            pdfDoc.getPage(num).then(function (page) {
                var viewport = page.getViewport({ scale: scale });
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                var renderContext = {
                    canvasContext: ctx,
                    viewport: viewport,
                };
                var renderTask = page.render(renderContext);

                renderTask.promise.then(function () {
                    pageRendering = false;
                    if (pageNumPending !== null) {
                        renderPage(pageNumPending);
                        pageNumPending = null;
                    }
                });
            });

            document.getElementById("page_num").textContent = num;
        }

        function queueRenderPage(num) {
            if (pageRendering) {
                pageNumPending = num;
            } else {
                renderPage(num);
            }
        }

        function onPrevPage() {
            if (pageNum <= 1) {
                return;
            }
            pageNum--;
            queueRenderPage(pageNum);
        }
        document.getElementById("prev").addEventListener("click", onPrevPage);

        function onNextPage() {
            if (pageNum >= pdfDoc.numPages) {
                return;
            }
            pageNum++;
            queueRenderPage(pageNum);
        }
        document.getElementById("next").addEventListener("click", onNextPage);

        function loadPdf(url) {
            pdfjsLib.getDocument(url).promise.then(function (pdfDoc_) {
                pdfDoc = pdfDoc_;
                document.getElementById("page_count").textContent = pdfDoc.numPages;
                pageNum = 1;
                renderPage(pageNum);
            });
        }

        //Function to highlight the selected button
        function highlightButton(buttonId) {
            document.querySelectorAll("#quarter-buttons-wrapper button").forEach((button) => {
                //button.classList.remove("selected-presentation");
            });
            //document.getElementById(buttonId).classList.add("selected-presentation");
        }

        $("#quarter-buttons-wrapper button").on('click', function(){
            $("#quarter-buttons-wrapper button").removeClass('selected-presentation');
            $(this).addClass('selected-presentation');
        })
        

       // Event listeners for quarter buttons
        document.querySelectorAll("#quarter-buttons-wrapper button").forEach((button) => {
            button.addEventListener("click", () => {
                // Get the URL of the PDF from the data-file attribute
                currentPdfUrl = button.getAttribute("data-file");
                 
                // Load the selected PDF
                loadPdf(currentPdfUrl);

                // Highlight the selected button
                highlightButton(button.id);

                // Update the download button URL
                document.getElementById("download").setAttribute("href", currentPdfUrl);
            });
        });

        // Initial load (you can set a default button to load its PDF initially)
        const defaultButton = document.getElementById("quarter-one");
        currentPdfUrl = defaultButton.getAttribute("data-file");
        loadPdf(currentPdfUrl);
        highlightButton(defaultButton.id);
        document.getElementById("download").setAttribute("href", currentPdfUrl);

    }, 1000)
    }
}

