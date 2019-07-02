'use strict';

(function () {
  var setupDialogElement = document.querySelector('.setup');
  var dialogHandler = setupDialogElement.querySelector('.upload');

  var submitElement = document.querySelector('.setup-submit');
  var closeElement = document.querySelector('.setup-close');

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

      setupDialogElement.style.top = (setupDialogElement.offsetTop - shift.y) + 'px';
      setupDialogElement.style.left = (setupDialogElement.offsetLeft - shift.x) + 'px';
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
  var onCloseDialog = function () {
    setupDialogElement.style.top = null;
    setupDialogElement.style.left = null;
  };

  submitElement.addEventListener('click', onCloseDialog);
  closeElement.addEventListener('click', onCloseDialog);
})();

// Артефакты и рюкзак
(function () {
  var shopElement = document.querySelector('.setup-artifacts-shop');
  var draggedItem = null;
  var artifactsElement = document.querySelector('.setup-artifacts');

  // На элемент в магазине добавляем обработчик начала перетаскивания
  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
    }
  });

  // Событие вызывается, когда перетаскивание элемента обрывается рядом с целью (перетаскивание считается законченым на действительной цели перетаскивания)
  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  // Событие вызывается, когда перетаскивание элемента обрывается на действительной цели перетаскивания (вставляем элемент в рюкзак)
  artifactsElement.addEventListener('drop', function (evt) {
    evt.target.appendChild(draggedItem);
  });
})();
