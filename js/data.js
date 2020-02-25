'use strict';
(function () {


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

  window.data = captionObject;

})();
