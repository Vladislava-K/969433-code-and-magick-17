'use strict';

(function () {
  var dialogHandler = window.setup.querySelector('.upload');
  var submitElement = document.querySelector('.setup-submit');

  // Обработаем событие начала перетаскивания нашего диалога
  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    // При каждом движении мыши нам нужно обновлять смещение относительно первоначальной точки
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.setup.style.top = (window.setup.offsetTop - shift.y) + 'px';
      window.setup.style.left = (window.setup.offsetLeft - shift.x) + 'px';
    };

    // При отпускании кнопки мыши нужно переставать слушать события движения мыши
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      // Обработчик на click отменяет действие по умолчанию, если перемещение имело место
      if (dragged) {
        var onClickPreventDefault = function (dragEvt) {
          dragEvt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }

    };

    // Добавим обработчики события передвижения мыши и отпускания кнопки мыши
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // При повторном открытии/закрытии диалога, положение диалога должно сбрасываться на изначальное
  window.onCloseDialog = function () {
    window.setup.style.top = null;
    window.setup.style.left = null;
  };

  submitElement.addEventListener('click', window.onCloseDialog);
  window.setupClose.addEventListener('click', window.onCloseDialog);
})();
