'use strict';
(function () {
  var LEVEL_MIN = 25;
  var LEVEL_DEFAULT = 100;
  var LEVEL_INC = 25;

  var uploadPhotoForm = document.querySelector('.img-upload');
  var previewPhoto = uploadPhotoForm.querySelector('.img-upload__preview');
  var levelButtonMinus = document.querySelector('.scale__control--smaller');
  var levelButtonPlus = document.querySelector('.scale__control--bigger');
  var levelValueInput = document.querySelector('.scale__control--value');

  var setLevelValue = function (levelValue) {
    levelValueInput.value = levelValue;
    previewPhoto.style.transform = 'scale(' + levelValueInput.value / LEVEL_DEFAULT + ')';
  };
  setLevelValue(LEVEL_DEFAULT);

  var increasePictureSize = function () {
    levelValueInput.value = parseInt(levelValueInput.value, 10) + LEVEL_INC;
    if (levelValueInput.value > LEVEL_DEFAULT) {
      levelValueInput.value = LEVEL_DEFAULT;
    }
    setLevelValue(levelValueInput.value);
  };

  levelButtonPlus.addEventListener('click', function () {
    increasePictureSize();
  });

  var decreasePictureSize = function () {
    levelValueInput.value = parseInt(levelValueInput.value, 10) - LEVEL_INC;
    if (levelValueInput.value < LEVEL_MIN) {
      levelValueInput.value = LEVEL_MIN;
    }
    setLevelValue(levelValueInput.value);
  };

  levelButtonMinus.addEventListener('click', function () {
    decreasePictureSize();
  });

  var imgUploadOverlay = uploadPhotoForm.querySelector('.img-upload__overlay');
  var effectLevelPin = imgUploadOverlay.querySelector('.effect-level__pin');
  var effectLevelValue = imgUploadOverlay.querySelector('.effect-level__value');
  var effectLevelDepth = imgUploadOverlay.querySelector('.effect-level__depth');

  effectLevelPin.addEventListener('mousedown', function () {
    effectLevelPin.style.left = '100%';
    effectLevelDepth.style.width = effectLevelPin.style.left;
    effectLevelValue.value = effectLevelPin.style.left;
  });
})();
