'use strict';
(function () {
  var LENGTH_WIZARDS_ARR = 4;

  window.setup = document.querySelector('.setup');
  window.setupClose = window.setup.querySelector('.setup-close');

  var similarListElement = document.querySelector('.setup-similar-list');//  Аналогичные элементы списка
  var form = window.setup.querySelector('.setup-wizard-form');

  //  функция создания DOM-элемента на основе JS-объекта
  var renderWizard = function (wizard) {
    var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');//  Итоговую разметку .setup-similar-item берем из шаблона #similar-wizard-template

    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var showSetupSimilar = function () {
    window.setup.querySelector('.setup-similar').classList.remove('hidden');
  };

  //  Заполняем блок DOM-элементами на основе массива JS-объектов

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      window.setup.classList.add('hidden');
    }, errorHandler);
    evt.preventDefault();
  });

  var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < LENGTH_WIZARDS_ARR; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }

    similarListElement.appendChild(fragment);
    window.setup.querySelector('.setup-similar').classList.remove('hidden');
  };

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

  var init = function () {
    window.backend.load(successHandler, errorHandler);
    showSetupSimilar();
  };

  //  Открытие/закрытие окна настройки персонажа
  var characterWindowSetting = function () {
    init();

    var setupOpen = document.querySelector('.setup-open');
    var userNameInput = window.setup.querySelector('.setup-user-name');

    var onPopupEscPress = function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        var target = evt.target;
        if (target === userNameInput) {
          document.removeEventListener('keydown', onPopupEscPress);
          openPopup();
        } else {
          closePopup();
          window.onCloseDialog();
        }
      }
    };

    var openPopup = function () {
      window.setup.classList.remove('hidden');

      document.addEventListener('keydown', onPopupEscPress);
    };

    var closePopup = function () {
      window.setup.classList.add('hidden');

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
      window.util.isEnterEvent(evt, closePopup);
    });
  };

  characterWindowSetting();

  //  Валидация ввода имени персонажа
  var validationName = function () {
    var userNameInput = window.setup.querySelector('.setup-user-name');

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
})();
