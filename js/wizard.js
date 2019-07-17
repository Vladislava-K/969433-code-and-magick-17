'use strict';

(function () {
  var wizardElement = document.querySelector('.setup-wizard');

  var setupWizardCoat = wizardElement.querySelector('.wizard-coat');
  var wizardCoatInput = document.querySelector('.setup-wizard-appearance').querySelectorAll('input')[0];

  var setupWizardEyes = wizardElement.querySelector('.wizard-eyes');
  var wizardEyesInput = document.querySelector('.setup-wizard-appearance').querySelectorAll('input')[1];

  var setupFireballWap = document.querySelector('.setup-fireball-wrap');
  var fireballWapInput = setupFireballWap.querySelector('input');


  var wizard = {
    onEyesChange: function () {},
    onCoatChange: function () {}
  };

  wizard.onEyesChange = function (color) {
    window.eyesColor = color;
    window.debounce(window.updateWizards);
  };

  wizard.onCoatChange = function (color) {
    window.coatColor = color;
    window.debounce(window.updateWizards);
  };

  var getRandomElement = function (array) {
    var shuffleWizardElement = window.util.shuffle(array);
    var chosenWizardElement = array[window.util.randomSelection(shuffleWizardElement)];
    return chosenWizardElement;
  };

  //  Изменение цвета мантии персонажа по нажатию
  setupWizardCoat.addEventListener('click', function (evt) {
    var newColor = getRandomElement(window.util.WIZARD_COATCOLOR);
    evt.target.style.fill = newColor;

    wizardCoatInput.value = newColor;

    window.wizard.onCoatChange(newColor);
  });

  //  Изменение цвета глаз персонажа по нажатию
  setupWizardEyes.addEventListener('click', function (evt) {
    var newColor = getRandomElement(window.util.WIZARD_EYESCOLOR);
    evt.target.style.fill = newColor;

    wizardEyesInput.value = newColor;

    window.wizard.onEyesChange(newColor);
  });

  //  Изменение цвета фаерболов по нажатию
  setupFireballWap.addEventListener('click', function (evt) {
    var newColor = getRandomElement(window.util.WIZARD_FIREBALLCOLOR);
    evt.target.style.backgroundColor = newColor;

    fireballWapInput.value = newColor;
    window.fireballColor = newColor;
  });

  window.wizard = wizard;
  return window.wizard;
})();
