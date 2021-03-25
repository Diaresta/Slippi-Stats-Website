const SUBMIT_FORM = document.getElementById('submit-form');
const FILE_NAME = document.getElementById('file-name');
const UPLOAD_BOX = document.getElementById('upload-box');
const FILE_INPUT = document.getElementById('file-input');
const INPUT_TEXT = document.getElementById('input-text');
const DROP_AREA = document.getElementById('drop-area');
const CLEAR_BUTTON = document.getElementById('clear-button');
const STATS_BUTTON = document.getElementById('stats-button');
const ERROR_TEXT = document.getElementById('error');

// File upload styling hovering
UPLOAD_BOX.ondragover = function () {
  this.className = 'upload-box dragover';
  return false;
};

// File upload styling non-hovering
UPLOAD_BOX.ondragleave = function () {
  this.className = 'upload-box';
  return false;
};

// Upload File by Clicking
DROP_AREA.onclick = function () {
  FILE_INPUT.click();
};

// When file is manually uploaded
FILE_INPUT.onchange = function () {
  UPLOAD_BOX.className = 'upload-box dragover';
  STATS_BUTTON.style.backgroundColor = '#21ba45';
  STATS_BUTTON.style.cursor = 'pointer';

  FILE_NAME.innerHTML = 'File uploaded!';
  FILE_NAME.style.fontStyle = 'italic';

  INPUT_TEXT.style.transform = 'translate(-50%, -175%)';

  // Button hover color
  STATS_BUTTON.onmouseover = function () {
    this.style.backgroundColor = '#17a639';
    this.style.color = '#ccc';
  };

  STATS_BUTTON.onmouseleave = function () {
    this.style.backgroundColor = '#21ba45';
    this.style.color = '#fff';
  };

  STATS_BUTTON.onclick = function () {
    ERROR_TEXT.innerHTML = 'Loading...';
  };
  return false;
};
