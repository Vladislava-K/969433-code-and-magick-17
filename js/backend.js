'use strict';

(function () {
  var URL_POST = 'https://js.dump.academy/code-and-magick';
  var URL_GET = 'https://js.dump.academy/code-and-magick/data';

  // функция, которая отправляет данные на сервер
  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest(onLoad, onError);//  Вызываем функцию-конструктор
    xhr.responseType = 'json';//  Изменяем тип ответа на json


    xhr.addEventListener('load', function () {
      onLoad(xhr.response);// Возвращает объект когда загружается вся страница
    });

    xhr.open('POST', URL_POST);// Открываем соединение
    xhr.send(data);// Отправляем данные
  };

  // функция, которая получает данные с сервера
  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // Определяет количество миллисекунд, которое запрос будет выполняться, до того, как будет автоматически прерван (10с)

    xhr.open('GET', URL_GET);
    xhr.send();
  };

  window.backend = {
    save: save,
    load: load
  };
})();
