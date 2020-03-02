'use strict';

(function () {
  var similarListElement = document.querySelector('.pictures');

  var similarPictureTemplate = document.querySelector('#picture').content;
  var renderPicture = function (picture) {
    var pictureElement = similarPictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    return pictureElement;
  };
  var onSuccessPicture = function (picture) {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < picture.length; j++) {
      fragment.appendChild(renderPicture(picture[j]));
    }
    similarListElement.appendChild(fragment);
  };
  window.backend.load(onSuccessPicture, window.utils.onLoadError);
})();
