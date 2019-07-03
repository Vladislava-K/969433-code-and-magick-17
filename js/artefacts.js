'use strict';

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

