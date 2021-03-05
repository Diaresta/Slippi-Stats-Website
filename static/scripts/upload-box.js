const SUBMIT_FORM = document.getElementById('submit-form');
const FILE_NAME = document.getElementById('file-name');
const UPLOAD_BOX = document.getElementById('upload-box');
const FILE_INPUT = document.getElementById('file-input');
const CLEAR_BUTTON = document.getElementById('clear-button');
const STATS_BUTTON = document.getElementById('stats-button');

// function uploadStyling() {
//   var uploadFile = function (files) {
//     var formData = new FormData(),
//       xhr = new XMLHttpRequest(),
//       x;

//     for (x = 0; x < files.length; x = x + 1) {
//       formData.append('file[]', files[x]);
//     }

//     xhr.onload = function () {
//       var data = this.responseText;
//       console.log(data);
//     };

//     xhr.open('POST', './public/uploads');
//     xhr.send(formData);

//     console.log(files);
//   };

//   // Stops selected file from opening in browser
//   UPLOAD_BOX.ondrop = function (e) {
//     e.preventDefault();
//     // this.className = 'upload-box';
//     uploadFile(e.dataTransfer.files);

//     console.log(e.dataTransfer.files[0].name);

//     FILE_NAME.innerHTML = e.dataTransfer.files[0].name + ' - time';
//     FILE_NAME.style.fontStyle = 'italic';
//     STATS_BUTTON.style.border = '2px solid #21ba45';
//     STATS_BUTTON.style.cursor = 'pointer';
//   };

//   // File upload styling hovering
//   UPLOAD_BOX.ondragover = function () {
//     this.className = 'upload-box dragover';
//     return false;
//   };

//   // File upload styling non-hovering
//   UPLOAD_BOX.ondragleave = function () {
//     this.className = 'upload-box';
//     return false;
//   };

//   // Upload File by Clicking
//   UPLOAD_BOX.onclick = function () {
//     FILE_INPUT.click();
//   };

//   // Clears styling/inputs when clicked
//   CLEAR_BUTTON.addEventListener('click', clearStyling);

//   function clearStyling() {
//     FILE_NAME.innerHTML = '';
//     UPLOAD_BOX.className = 'upload-box';
//     STATS_BUTTON.style.border = 'medium none';
//     STATS_BUTTON.style.cursor = 'auto';
//   }
// }

// SUBMIT_FORM.addEventListener('submit', (e) => {
//   e.preventDefault();

//   const slpFolder = 'upload.js';
//   const formData = new FormData();

//   console.log(FILE_INPUT.files);

//   formData.append('FILE_INPUT', FILE_INPUT.files[0]);

//   fetch(slpFolder, {
//     method: 'POST',
//     body: formData,
//   }).catch(console.error);
// });

// SUBMIT_FORM.addEventListener('submit', (e) => {
//   e.preventDefault();

//   const slpFolder = 'upload.php';
//   const formData = new FormData();

//   console.log(FILE_INPUT.files);

//   formData.append('FILE_INPUT', FILE_INPUT.files[0]);

//   fetch(slpFolder, {
//     method: 'POST',
//     body: formData,
//   }).catch(console.error);
// });

uploadStyling();
