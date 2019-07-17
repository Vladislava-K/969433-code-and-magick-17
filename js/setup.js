'use strict';
(function () {
  var setupd = document.querySelector('.setup');
  window.setupClose = setupd.querySelector('.setup-close');

  var form = setupd.querySelector('.setup-wizard-form');

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      setupd.classList.add('hidden');
    }, errorHandler);
    evt.preventDefault();
  });

  var init = function () {
    window.backend.load(window.successHandler, errorHandler);
  };

  //  Открытие/закрытие окна настройки персонажа
  var characterWindowSetting = function () {
    var setupOpen = document.querySelector('.setup-open');
    var userNameInput = setupd.querySelector('.setup-user-name');

    var onPopupEscPress = function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE && userNameInput !== document.activeElement) {
        closePopup();
        window.onCloseDialog();
      }
    };

    var openPopup = function () {
      init();

      setupd.classList.remove('hidden');

      document.addEventListener('keydown', onPopupEscPress);
    };

    var closePopup = function () {
      setupd.classList.add('hidden');
      document.removeEventListener('keydown', onPopupEscPress);
    };

    setupOpen.addEventListener('click', function () {
      openPopup();
    });

    setupOpen.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, openPopup);
    });

    window.setupClose.addEventListener('click', function () {
      closePopup();
    });

    window.setupClose.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, function () {
        closePopup();
        window.onCloseDialog();
      });
    });
  };

  characterWindowSetting();

  //  Валидация ввода имени персонажа
  var validationName = function () {
    var userNameInput = setupd.querySelector('.setup-user-name');

    userNameInput.addEventListener('invalid', function () {
      if (userNameInput.validity.tooShort) {
        userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
      } else if (userNameInput.validity.tooLong) {
        userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
      } else if (userNameInput.validity.valueMissing) {
        userNameInput.setCustomValidity('Обязательное поле');
      } else {
        userNameInput.setCustomValidity('');
      }
    });

    userNameInput.myvalue = userNameInput.value;
    userNameInput.value = userNameInput.myvalue;
  };

  validationName();

  window.setup = {
    setupd: setupd,
    errorHandler: errorHandler
  };
})();
