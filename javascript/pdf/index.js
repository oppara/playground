$(function(){

  const PDF_PATH = './encoding.pdf';

  const PDF_CANVAS = document.getElementById('the-canvas');

  const PDF_SCALE_MAX = 2;
  const PEF_SCALE_MIN = 0.5;
  const PDF_SCALE_RATIO = 0.25;

  // Loaded via <script> tag, create shortcut to access PDF.js exports.
  const PDF_JS_LIB = window['pdfjs-dist/build/pdf'];

  // The workerSrc property shall be specified.
  PDF_JS_LIB.GlobalWorkerOptions.workerSrc =
    '//mozilla.github.io/pdf.js/build/pdf.worker.js';

  let PDF_DOC = null;
  let PDF_PAGE_NUMBER = 1;
  let PDF_SCALE = 1;
  let PDF_RENDERING = false;
  let PDF_NUM_PENDING = null;

  const setPageCount = (cnt) => {
    $('#page_count').text(cnt);
  };

  const loadPdf = async (url) => {
    const loadingTask = PDF_JS_LIB.getDocument(url);
    return loadingTask.promise;
  };

  const renderPage = async (isScaling = false) => {
    PDF_RENDERING = true;

    const page = await PDF_DOC.getPage(PDF_PAGE_NUMBER);

    const viewport = page.getViewport({ scale: PDF_SCALE });
    PDF_CANVAS.height = viewport.height;
    PDF_CANVAS.width = viewport.width;

    // Render PDF page into canvas context
    const renderTask = page.render({
      canvasContext: PDF_CANVAS.getContext('2d'),
      viewport: viewport,
    });
    await renderTask.promise;
    PDF_RENDERING = false;

    if (PDF_NUM_PENDING !== null) {
      PDF_PAGE_NUMBER = PDF_NUM_PENDING;
      await renderPage();
      PDF_NUM_PENDING = null;
    }

    if (isScaling) {
      return;
    }

    $('#first, #prev, #next, #last').css('text-decoration', '').parent().addClass('disabled');

    if (1 < PDF_PAGE_NUMBER) {
      $('#first, #prev').parent().removeClass('disabled');
    }

    if (PDF_PAGE_NUMBER < PDF_DOC.numPages) {
      $('#next, #last').parent().removeClass('disabled');
    }

    $('.pager .disabled a').css('text-decoration', 'none');
    $('#page_num').text(PDF_PAGE_NUMBER);

  };


  const initScalingButtons = async () => {
    const $plus = $('#plus');
    const $minus = $('#minus');

    $plus.on('click', async () => {
      if (PDF_SCALE > PDF_SCALE_MAX) {
        return;
      }

      $plus.prop('disabled', true);
      $minus.prop('disabled', true);
      PDF_SCALE = PDF_SCALE + PDF_SCALE_RATIO;

      await renderPage(true);

      if (PDF_SCALE <= PDF_SCALE_MAX) {
        $plus.prop('disabled', false);
      }
      $minus.prop('disabled', false);
    });

    $minus.on('click', async () => {
      if (PDF_SCALE <= PEF_SCALE_MIN) {
        return;
      }

      $plus.prop('disabled', true);
      $minus.prop('disabled', true);
      PDF_SCALE = PDF_SCALE - PDF_SCALE_RATIO;

      await renderPage(true);

      $plus.prop('disabled', false);
      if (PDF_SCALE > PEF_SCALE_MIN) {
        $minus.prop('disabled', false);
      }
    });
  };

  const queueRenderPage = (num) => {
    if (PDF_PAGE_NUMBER < 1 || PDF_PAGE_NUMBER > PDF_DOC.numPages) {
      return;
    }

    if (PDF_RENDERING) {
      PDF_NUM_PENDING = num;
    } else {
      PDF_PAGE_NUMBER = num;
      renderPage();
    }
  };

  const initPagerButtons = () => {
    $('#first').on('click', function() {
      if (1 < PDF_PAGE_NUMBER) {
        PDF_PAGE_NUMBER = 1;
        queueRenderPage(PDF_PAGE_NUMBER);
      }
      return false;
    });

    $('#prev').on('click', function() {
      if (1 < PDF_PAGE_NUMBER) {
        PDF_PAGE_NUMBER--;
        queueRenderPage(PDF_PAGE_NUMBER);
      }
      return false;
    });

    $('#next').on('click', function() {
      if (PDF_DOC && PDF_PAGE_NUMBER < PDF_DOC.numPages) {
        PDF_PAGE_NUMBER++;
        queueRenderPage(PDF_PAGE_NUMBER);
      }
      return false;
    });

    $('#last').on('click', function() {
      if (PDF_DOC && PDF_PAGE_NUMBER < PDF_DOC.numPages) {
        PDF_PAGE_NUMBER = PDF_DOC.numPages;
        queueRenderPage(PDF_PAGE_NUMBER);
      }
      return false;
    });
  };

  const init = async () => {
    PDF_DOC = await loadPdf(PDF_PATH);
    setPageCount(PDF_DOC.numPages);

    await renderPage();

    initPagerButtons();
    initScalingButtons();
  };

  init();
});
