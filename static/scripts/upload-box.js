function uploadStyling() {
  var uploadBox = document.getElementById('upload-box');

  // File upload styling hovering
  uploadBox.ondragover = function () {
    this.className = 'upload-box dragover';
    return false;
  };

  // File upload styling non-hovering
  uploadBox.ondragleave = function () {
    this.className = 'upload-box';
    return false;
  };
}

uploadStyling();
