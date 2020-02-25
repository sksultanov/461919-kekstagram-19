'use strict';
(function () {
  var uploadPhotoForm = document.querySelector('.img-upload');
  var effect = document.querySelector('.img-upload__effects');
  var blockPin = document.querySelector('.img-upload__effect-level');
  var pin = blockPin.querySelector('.effect-level__pin');
  var depth = blockPin.querySelector('.effect-level__depth');
  var image = document.querySelector('.img-upload__preview img');
  var hashtagsInput = uploadPhotoForm.querySelector('.text__hashtags');
  var commentInput = uploadPhotoForm.querySelector('.text__description');

  var COMMENT_LENGTH = 140;
  var HASHTAG_MIN_LENGTH = 2;
  var HASHTAG_MAX_LENGTH = 20;
  var HASHTAG_MAX_COUNT = 5;

  var pinEnd = 455 + 'px';
  pin.style.left = pinEnd;
  depth.style.width = pin.style.left;
  var currenEffect = 'none';
  effect.addEventListener('change', function (evt) {
    var eff = evt.target.value;
    image.classList.remove('effects__preview--' + currenEffect);
    image.classList.add('effects__preview--' + eff);
    currenEffect = eff;
    if (currenEffect === 'none') {
      blockPin.style.display = 'none';
      image.style.filter = currenEffect;
    } else {
      blockPin.style.display = 'block';
      pin.style.left = pinEnd;
      depth.style.width = pin.style.left;
      getEffects();
    }
  });

  function getEffects() {
    var num = parseInt(pin.style.left, 10) / 455;
    if (currenEffect === 'chrome') {
      image.style.filter = 'grayscale(' + num + ')';
    } else if (currenEffect === 'sepia') {
      image.style.filter = currenEffect + '(' + num + ')';
    } else if (currenEffect === 'marvin') {
      image.style.filter = 'invert(' + num * 100 + '%)';
    } else if (currenEffect === 'phobos') {
      image.style.filter = 'blur(' + num * 3 + 'px)';
    } else if (currenEffect === 'heat') {
      image.style.filter = 'brightness(' + num * 3 + ')';
    }
  }


  var onHashtagsCheck = function (evt) {
    var target = evt.target;

    if (target.value === '') {
      target.setCustomValidity('');
    }

    var hashtags = target.value.split(' ');
    var customValidityString = '';
    if (hashtags.length > HASHTAG_MAX_COUNT) {
      customValidityString += 'Нельзя указывать более ' + HASHTAG_MAX_COUNT + ' хэштегов;   ';
    }
    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags[i][0] !== '#') {
        customValidityString += 'Хэштег должен начинаться с символа "#";   ';
      }

      if (hashtags[i].length < HASHTAG_MIN_LENGTH) {
        customValidityString += 'Минимальная длина хэштега составляет ' + HASHTAG_MIN_LENGTH + ' символа;   ';
      }

      if (hashtags[i].length > HASHTAG_MAX_LENGTH) {
        customValidityString += 'Максимальная длина хэштега не должна превышать ' + HASHTAG_MAX_LENGTH + ' символов;   ';
      }

      var regExpr = /(^)([#a-zA-Zа-яА-Я\d]*$)/ig;
      if (!regExpr.test(hashtags[i])) {
        customValidityString += 'В хэштеге используются недопустимые символы;   ';
      }

      for (var k = i + 1; k < hashtags.length; k++) {
        if (hashtags[i].toLowerCase() === hashtags[k].toLowerCase()) {
          customValidityString += 'Хэштеги не должны повторяться;   ';
        }
      }
    }

    target.setCustomValidity(customValidityString);
  };

  var onCommentCheck = function (evt) {
    var target = evt.target;
    if (target.value.length > COMMENT_LENGTH) {
      target.setCustomValidity('Длина комментария не должна превышать ' + COMMENT_LENGTH + ' символов');
    } else {
      target.setCustomValidity('');
    }
  };
  var onInputValidate = function () {
    hashtagsInput.value = hashtagsInput.value.toLowerCase();
    formSubmit.removeEventListener('submit', onInputValidate);
  };

  var formSubmit = document.querySelector('.img-upload__form');
  hashtagsInput.addEventListener('input', onHashtagsCheck);
  commentInput.addEventListener('input', onCommentCheck);
  formSubmit.addEventListener('submit', onInputValidate);
})();
