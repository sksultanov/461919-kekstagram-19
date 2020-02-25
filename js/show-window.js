'use strict';
(function () {
  var ESC_KEY = 'Escape';
  var pageBody = document.querySelector('body');
  var uploadPhotoForm = document.querySelector('.img-upload');
  var uploadFileInput = uploadPhotoForm.querySelector('#upload-file');

  var imgUploadOverlay = uploadPhotoForm.querySelector('.img-upload__overlay');
  var closeUploadFormButton = uploadPhotoForm.querySelector('#upload-cancel');

  var hashtagsInput = uploadPhotoForm.querySelector('.text__hashtags');
  var commentInput = uploadPhotoForm.querySelector('.text__description');

  var onСloseUploadEscPress = function (evt) {
    if ((document.activeElement !== hashtagsInput) && (document.activeElement !== commentInput)) {
      if (evt.key === ESC_KEY) {
        closeUploadForm();
      }
    }
  };
  var openUploadForm = function () {
    imgUploadOverlay.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    document.addEventListener('keydown', onСloseUploadEscPress);
  };

  var closeUploadForm = function () {
    imgUploadOverlay.classList.add('hidden');
    pageBody.classList.remove('modal-open');
    document.removeEventListener('keydown', onСloseUploadEscPress);
    uploadFileInput.value = '';
  };

  uploadFileInput.addEventListener('change', function () {
    openUploadForm();
  });

  closeUploadFormButton.addEventListener('click', function () {
    closeUploadForm();
  });

})();
