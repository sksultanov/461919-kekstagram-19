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
var fillObject = function () {

  for (var i = 0; i < QUANTITY_PICTURE; i++) {
    captionObject[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      description: 'Красивая фотография',
      likes: getRandomInt(15, 200),
      comments: [
        {
          avatar: 'img/avatar-' + getRandomInt(1, 6) + '.svg',
          mesage: MESSAGES[getRandomInt(0, MESSAGES.length - 1)],
          name: NAMES[getRandomInt(0, NAMES.length - 1)],
          quantityComments: getRandomInt(0, 6)
        },
        {
          avatar: 'img/avatar-' + getRandomInt(1, 6) + '.svg',
          mesage: MESSAGES[getRandomInt(0, MESSAGES.length - 1)],
          name: NAMES[getRandomInt(0, NAMES.length - 1)],
          quantityComments: getRandomInt(0, 6)
        },
        {
          avatar: 'img/avatar-' + getRandomInt(1, 6) + '.svg',
          mesage: MESSAGES[getRandomInt(0, MESSAGES.length - 1)],
          name: NAMES[getRandomInt(0, NAMES.length - 1)],
          quantityComments: getRandomInt(0, 6)
        },
        {
          avatar: 'img/avatar-' + getRandomInt(1, 6) + '.svg',
          mesage: MESSAGES[getRandomInt(0, MESSAGES.length - 1)],
          name: NAMES[getRandomInt(0, NAMES.length - 1)],
          quantityComments: getRandomInt(0, 6)
        },
        {
          avatar: 'img/avatar-' + getRandomInt(1, 6) + '.svg',
          mesage: MESSAGES[getRandomInt(0, MESSAGES.length - 1)],
          name: NAMES[getRandomInt(0, NAMES.length - 1)],
          quantityComments: getRandomInt(0, 6)
        },
        {
          avatar: 'img/avatar-' + getRandomInt(1, 6) + '.svg',
          mesage: MESSAGES[getRandomInt(0, MESSAGES.length - 1)],
          name: NAMES[getRandomInt(0, NAMES.length - 1)],
          quantityComments: getRandomInt(0, 6)
        }
      ]
    };

  }
  return captionObject;
};
fillObject();

var renderPicture = function (picture) {
  var pictureElement = similarPictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__comments').textContent = picture.comments[getRandomInt(0, 5)].quantityComments;
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  return pictureElement;
};

var fragment = document.createDocumentFragment();
for (var j = 0; j < captionObject.length; j++) {
  fragment.appendChild(renderPicture(captionObject[j]));
}
similarListElement.appendChild(fragment);


