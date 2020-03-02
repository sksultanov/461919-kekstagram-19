'use strict';
(function () {
  var errorWrapper;
  var errorTitle;

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };


  var getRandomArrElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  var getRandomArray = function (array, elementsAmount) {
    var selectedElements = [];
    var element;

    while (selectedElements.length < elementsAmount) {
      element = getRandomArrElement(array);

      if (selectedElements.indexOf(element) === -1) {
        selectedElements.push(element);
      }
    }

    return selectedElements;
  };

  var showErrorPopup = function () {
    var errorTemplate = document.querySelector('#error').content;
    var errorMessagePopup = errorTemplate.cloneNode(true);
    document.querySelector('main').appendChild(errorMessagePopup);
    errorWrapper = document.querySelector('.error__inner');
    errorTitle = errorWrapper.querySelector('.error__title');

  };


  var onLoadError = function (response) {
    showErrorPopup();

    var errorText = document.createElement('p');
    errorTitle.textContent = 'Ошибка загрузки данных';
    errorText.innerHTML = response;
    errorWrapper.insertBefore(errorText, errorTitle);
  };

  window.utils = {
    getRandomNumber: getRandomNumber,
    getRandomArrElement: getRandomArrElement,
    onLoadError: onLoadError,
    getRandomArray: getRandomArray,
  };
})();
