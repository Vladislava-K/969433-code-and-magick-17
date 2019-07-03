'use strict';

(function () {
  //  Изменение цвета мантии персонажа по нажатию
  var changeWizardCoat = function () {
    var setupWizardCoat = document.querySelector('.setup-wizard').querySelector('.wizard-coat');
    var wizardCoatInput = document.querySelector('.setup-wizard-appearance').querySelectorAll('input')[0];

    setupWizardCoat.addEventListener('click', function (evt) {
      var shuffleWizardCoat = window.util.shuffle(window.util.WIZARD_COATCOLOR);
      var chosenWizardCoat = window.util.WIZARD_COATCOLOR[window.util.randomSelection(shuffleWizardCoat)];
      evt.target.style.fill = chosenWizardCoat;

      wizardCoatInput.value = chosenWizardCoat;
    });
  };

  changeWizardCoat();

  //  Изменение цвета глаз персонажа по нажатию
  var changeWizardEyes = function () {
    var setupWizardEyes = document.querySelector('.setup-wizard').querySelector('.wizard-eyes');
    var wizardEyesInput = document.querySelector('.setup-wizard-appearance').querySelectorAll('input')[1];

    setupWizardEyes.addEventListener('click', function (evt) {
      var shuffleWizardEyes = window.util.shuffle(window.util.WIZARD_EYESCOLOR);
      var chosenWizardEyes = window.util.WIZARD_EYESCOLOR[window.util.randomSelection(shuffleWizardEyes)];
      evt.target.style.fill = chosenWizardEyes;

      wizardEyesInput.value = chosenWizardEyes;
    });
  };

  changeWizardEyes();

  //  Изменение цвета фаерболов по нажатию
  var changeFireballWap = function () {
    var setupFireballWap = document.querySelector('.setup-fireball-wrap');
    var fireballWapInput = setupFireballWap.querySelector('input');

    setupFireballWap.addEventListener('click', function (evt) {
      var shuffleWizardFireballWap = window.util.shuffle(window.util.WIZARD_FIREBALLCOLOR);
      var chosenWizardFireballWap = window.util.WIZARD_FIREBALLCOLOR[window.util.randomSelection(shuffleWizardFireballWap)];
      evt.target.style.backgroundColor = chosenWizardFireballWap;

      fireballWapInput.value = chosenWizardFireballWap;
    });
  };

  changeFireballWap();

})();
