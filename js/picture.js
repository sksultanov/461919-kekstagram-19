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

  var fragment = document.createDocumentFragment();
  for (var j = 0; j < window.data.length; j++) {
    fragment.appendChild(renderPicture(window.data[j]));
  }
  similarListElement.appendChild(fragment);
})();
