'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var userName = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var userSurname = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATCOLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYESCOLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var LENGTH_WIZARDS_ARR = 4;

var randomSelection = function (arr) {
  var rands = Math.floor(Math.random() * arr.length);
  return (rands);
};

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

var wizards = arrWizards(userName, userSurname, WIZARD_COATCOLOR, WIZARD_EYESCOLOR, LENGTH_WIZARDS_ARR);

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);
