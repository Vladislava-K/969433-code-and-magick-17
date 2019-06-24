'use strict';

//  var userName = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
//  var userSurname = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATCOLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYESCOLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALLCOLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
//  var LENGTH_WIZARDS_ARR = 4;

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// Выбирает случайное значение из массива
var randomSelection = function (arr) {
  var rands = Math.floor(Math.random() * arr.length);
  return (rands);
};

// Перемешивает массив используя тасование Фишера-Йетса
var shuffle = function (arr) {
  var j;
  var temp;
  for (var i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }

  return arr;
};

/*
// Создает массив магов из объектов с данными
var arrWizards = function (myUserName, myUserSurname, myWizardCoatcolor, myWizardEyescolor, myLengthWizardsArr) {
  var WIZARD_NAMES = [];
  var wizards = [];

  for (var i = 0; i < myLengthWizardsArr; i++) {
    var shuffleuserName = shuffle(userName);
    var chosenuserName = randomSelection(shuffleuserName);

    var shuffleuserSurname = shuffle(userSurname);
    var chosenuserSurname = randomSelection(shuffleuserSurname);
    WIZARD_NAMES[i] = userName[chosenuserName] + ' ' + userSurname[chosenuserSurname];

    var shuffleWizardCoatcolor = shuffle(myWizardCoatcolor);
    var chosenWizardCoatcolor = myWizardCoatcolor[randomSelection(shuffleWizardCoatcolor)];

    var shuffleWizardEyescolor = shuffle(myWizardEyescolor);
    var chosenWizardEyescolor = myWizardEyescolor[randomSelection(shuffleWizardEyescolor)];

    wizards[i] = {name: WIZARD_NAMES[i], coatColor: chosenWizardCoatcolor, eyesColor: chosenWizardEyescolor};
  }

  return (wizards);
};

//  функция создания DOM-элемента на основе JS-объекта
var renderWizard = function (wizard) {
  var userDialog = document.querySelector('.setup');
  userDialog.classList.remove('hidden');

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');//  Итоговую разметку .setup-similar-item берем из шаблона #similar-wizard-template

  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

//  функция заполнения блока DOM-элементами на основе массива JS-объектов
var fillingWizard = function () {
  var wizards = arrWizards(userName, userSurname, WIZARD_COATCOLOR, WIZARD_EYESCOLOR, LENGTH_WIZARDS_ARR);

  document.querySelector('.setup-similar').classList.remove('hidden');
  var similarListElement = document.querySelector('.setup-similar-list');//  Аналогичные элементы списка

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
};

//  fillingWizard();//  Вызов функции заполнения блока DOM-элементами на основе массива JS-объектов
*/

//  Открытие/закрытие окна настройки персонажа
var characterWindowSetting = function () {
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var userNameInput = setup.querySelector('.setup-user-name');

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      var target = evt.target;
      if (target === userNameInput) {
        document.removeEventListener('keydown', onPopupEscPress);
        evt.stopPropagation();
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
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });
};

characterWindowSetting();

//  Валидация ввода имени персонажа
var validationName = function () {
  var setup = document.querySelector('.setup');
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

//  Изменение цвета мантии персонажа по нажатию
var changeWizardCoat = function () {
  var setupWizardCoat = document.querySelector('.setup-wizard').querySelector('.wizard-coat');
  var wizardCoatInput = document.querySelector('.setup-wizard-appearance').querySelectorAll('input')[0];

  setupWizardCoat.onclick = function (evt) {
    var shuffleWizardCoat = shuffle(WIZARD_COATCOLOR);
    var chosenWizardCoat = WIZARD_COATCOLOR[randomSelection(shuffleWizardCoat)];
    evt.target.style.fill = chosenWizardCoat;

    wizardCoatInput.value = chosenWizardCoat;
  };
};

changeWizardCoat();

//  Изменение цвета глаз персонажа по нажатию
var changeWizardEyes = function () {
  var setupWizardEyes = document.querySelector('.setup-wizard').querySelector('.wizard-eyes');
  var wizardEyesInput = document.querySelector('.setup-wizard-appearance').querySelectorAll('input')[1];

  setupWizardEyes.onclick = function (evt) {
    var shuffleWizardEyes = shuffle(WIZARD_EYESCOLOR);
    var chosenWizardEyes = WIZARD_EYESCOLOR[randomSelection(shuffleWizardEyes)];
    evt.target.style.fill = chosenWizardEyes;

    wizardEyesInput.value = chosenWizardEyes;
  };
};

changeWizardEyes();

//  Изменение цвета фаерболов по нажатию
var changeFireballWap = function () {
  var setupFireballWap = document.querySelector('.setup-fireball-wrap');
  var fireballWapInput = setupFireballWap.querySelector('input');

  setupFireballWap.onclick = function (evt) {
    var shuffleWizardFireballWap = shuffle(WIZARD_FIREBALLCOLOR);
    var chosenWizardFireballWap = WIZARD_FIREBALLCOLOR[randomSelection(shuffleWizardFireballWap)];
    evt.target.style.backgroundColor = chosenWizardFireballWap;

    fireballWapInput.value = chosenWizardFireballWap;
  };
};

changeFireballWap();
