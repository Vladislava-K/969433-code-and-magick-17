'use strict';

(function () {
  var WIZARD_COATCOLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYESCOLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIREBALLCOLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    // Выбирает случайное значение из массива
    randomSelection: function (arr) {
      var rands = Math.floor(Math.random() * arr.length);
      return (rands);
    },
    // Перемешивает массив используя тасование Фишера-Йетса
    shuffle: function (arr) {
      var j;
      var temp;
      for (var i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
      }

      return arr;
    },
    WIZARD_COATCOLOR: WIZARD_COATCOLOR,
    WIZARD_EYESCOLOR: WIZARD_EYESCOLOR,
    WIZARD_FIREBALLCOLOR: WIZARD_FIREBALLCOLOR,
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE
  };

})();
