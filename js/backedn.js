'use strict';

(function () {
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';
  var URL_DOWNLOAD = 'https://js.dump.academy/kekstagram/data';
  var TIMEOUT = 10000;

  var StatusCode = {
    NOT_FOUND: 404,
    SUCCESS: 200,
    USER_UNAUTHORIZED: 401,
    BAD_REQUEST: 400,
    SERVER_ERROR: 500
  };

  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case StatusCode.SUCCESS:
          onLoad(xhr.response);
          break;
        case StatusCode.BAD_REQUEST:
          onError('Неверный запрос');
          break;
        case StatusCode.SERVER_ERROR:
          onError('Внутренняя ошибка сервера');
          break;
        case StatusCode.USER_UNAUTHORIZED:
          onError('Пользователь не авторизован');
          break;
        case StatusCode.NOT_FOUND:
          onError('Страница не найдена');
          break;

        default:
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    return xhr;
  };

  var upload = function (data, onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };

  var load = function (onLoad, onError) {
    var xhr = setup(onLoad, onError);

    xhr.open('GET', URL_DOWNLOAD);
    xhr.send();
  };

  window.backend = {
    upload: upload,
    load: load
  };
})();
