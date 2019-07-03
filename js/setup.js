'use strict';
(function () {
  // Данные для предыдущих заданий
  var userName = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var userSurname = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var LENGTH_WIZARDS_ARR = 4;

  var setup = document.querySelector('.setup');

  //  Предыдущие задания
  // Создает массив магов из объектов с данными
  var arrWizards = function (myUserName, myUserSurname, myWizardCoatcolor, myWizardEyescolor, myLengthWizardsArr) {
    var WIZARD_NAMES = [];
    var wizards = [];

    for (var i = 0; i < myLengthWizardsArr; i++) {
      var shuffleuserName = window.util.shuffle(userName);
      var chosenuserName = window.util.randomSelection(shuffleuserName);

      var shuffleuserSurname = window.util.shuffle(userSurname);
      var chosenuserSurname = window.util.randomSelection(shuffleuserSurname);
      WIZARD_NAMES[i] = userName[chosenuserName] + ' ' + userSurname[chosenuserSurname];

      var shuffleWizardCoatcolor = window.util.shuffle(myWizardCoatcolor);
      var chosenWizardCoatcolor = myWizardCoatcolor[window.util.randomSelection(shuffleWizardCoatcolor)];

      var shuffleWizardEyescolor = window.util.shuffle(myWizardEyescolor);
      var chosenWizardEyescolor = myWizardEyescolor[window.util.randomSelection(shuffleWizardEyescolor)];

      wizards[i] = {name: WIZARD_NAMES[i], coatColor: chosenWizardCoatcolor, eyesColor: chosenWizardEyescolor};
    }

    return (wizards);
  };

  //  функция создания DOM-элемента на основе JS-объекта
  var renderWizard = function (wizard) {
    var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');//  Итоговую разметку .setup-similar-item берем из шаблона #similar-wizard-template

    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  //  функция заполнения блока DOM-элементами на основе массива JS-объектов
  var fillingWizard = function () {
    var wizards = arrWizards(userName, userSurname, window.util.WIZARD_COATCOLOR, window.util.WIZARD_EYESCOLOR, LENGTH_WIZARDS_ARR);

    document.querySelector('.setup-similar').classList.remove('hidden');
    var similarListElement = document.querySelector('.setup-similar-list');//  Аналогичные элементы списка

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < wizards.length; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);
  };

  //  Открытие/закрытие окна настройки персонажа
  fillingWizard();//  Вызов функции заполнения блока DOM-элементами на основе массива JS-объектов
  var characterWindowSetting = function () {
    var setupOpen = document.querySelector('.setup-open');
    var setupClose = setup.querySelector('.setup-close');
    var userNameInput = setup.querySelector('.setup-user-name');

    var onPopupEscPress = function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        var target = evt.target;
        if (target === userNameInput) {
          document.removeEventListener('keydown', onPopupEscPress);
          openPopup();
        } else {
          closePopup();
        }
      }
    };

    var openPopup = function () {
      setup.classList.remove('hidden');

      document.addEventListener('keydown', onPopupEscPress);
    };

    var closePopup = function () {
      setup.classList.add('hidden');

      document.removeEventListener('keydown', onPopupEscPress);
    };

    setupOpen.addEventListener('click', function () {
      openPopup();
    });

    setupOpen.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, openPopup);
    });

    setupClose.addEventListener('click', function () {
      closePopup();
    });

    setupClose.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, closePopup);
    });
  };

  characterWindowSetting();

  //  Валидация ввода имени персонажа
  var validationName = function () {
    var userNameInput = setup.querySelector('.setup-user-name');

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
