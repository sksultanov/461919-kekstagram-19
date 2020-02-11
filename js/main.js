'use strict';

var similarListElement = document.querySelector('.pictures');

var similarPictureTemplate = document.querySelector('#picture').content;

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
var captionObject = [];
var QUANTITY_PICTURE = 25;
var maxLengthComments = 10;
var createComment = function () {
  return {
    avatar: 'img/avatar-' + getRandomInt(1, 6) + '.svg',
    mesage: MESSAGES[getRandomInt(0, MESSAGES.length - 1)],
    name: NAMES[getRandomInt(0, NAMES.length - 1)],
  };

};
var createRandomComments = function (randomNum) {
  var array = [];
  for (var i = 0; i < randomNum; i++) {
    array.push(createComment());
  }
  return array;
};

var fillObject = function () {

  for (var i = 0; i < QUANTITY_PICTURE; i++) {
    captionObject[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      description: 'Красивая фотография',
      likes: getRandomInt(15, 200),
      comments: createRandomComments(getRandomInt(0, maxLengthComments))

    };

  }
  return captionObject;
};
fillObject();


var renderPicture = function (picture) {
  var pictureElement = similarPictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  return pictureElement;
};

var fragment = document.createDocumentFragment();
for (var j = 0; j < captionObject.length; j++) {
  fragment.appendChild(renderPicture(captionObject[j]));
}
similarListElement.appendChild(fragment);

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

var LEVEL_MIN = 25;
var LEVEL_DEFAULT = 100;
var LEVEL_INC = 25;

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

var effectLevelPin = imgUploadOverlay.querySelector('.effect-level__pin');
var effectLevelValue = imgUploadOverlay.querySelector('.effect-level__value');
var effectLevelDepth = imgUploadOverlay.querySelector('.effect-level__depth');

effectLevelPin.addEventListener('mousedown', function () {
  effectLevelPin.style.left = '100%';
  effectLevelDepth.style.width = effectLevelPin.style.left;
  effectLevelValue.value = effectLevelPin.style.left;
});

var imgEffects = imgUploadOverlay.querySelector('.img-upload__effects');

var pinEnd = 455 + 'px';

