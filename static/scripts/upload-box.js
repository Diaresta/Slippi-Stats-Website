const FILE_NAME = document.getElementById('fileName');

function uploadStyling() {
  var uploadBox = document.getElementById('upload-box');

  var uploadFile = function (files) {
    var formData = new FormData(),
      xhr = new XMLHttpRequest(),
      x;

    for (x = 0; x < files.length; x = x + 1) {
      formData.append('file[]', files[x]);
    }

    xhr.onload = function () {
      var data = this.responseText;
      console.log(data);
    };

    xhr.open('POST', 'static/scripts/script.js');
    xhr.send(formData);

    console.log(files);
  };

  // Stops selected file from opening in browser
  uploadBox.ondrop = function (e) {
    e.preventDefault();
    // this.className = 'upload-box';
    uploadFile(e.dataTransfer.files);

    // console.log(e.dataTransfer);
    console.log(e.dataTransfer.files[0].name);

    FILE_NAME.innerHTML = e.dataTransfer.files[0].name + ' - time';
    FILE_NAME.style.fontStyle = 'italic';
  };

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
