'use strict';
(function () {
  var LENGTH_WIZARDS_ARR = 4;
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');//  Итоговую разметку .setup-similar-item берем из шаблона #similar-wizard-template
  var similarListElement = document.querySelector('.setup-similar-list');//  Аналогичные элементы списка
  var similar = document.querySelector('.setup-similar');

  var showSetupSimilar = function () {
    similar.classList.remove('hidden');
  };

  //  функция создания DOM-элемента на основе JS-объекта
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  //  Заполняем блок DOM-элементами на основе массива JS-объектов
  window.renders = function (data) {
    //  var fragment = document.createDocumentFragment();

    var takeNumber = data.length > LENGTH_WIZARDS_ARR ? LENGTH_WIZARDS_ARR : data.length;
    similarListElement.innerHTML = '';

    var newWizards = data.slice(0, takeNumber);
    newWizards.forEach(function (itemNewWizard) {
      similarListElement.appendChild(renderWizard(itemNewWizard));
    });

    showSetupSimilar();

    //  similarListElement.appendChild(fragment);
  };

  //  Функция удаления волшебников
  window.removeWizards = function () {
    document.querySelectorAll('.setup-similar-item').forEach(function (itemWizard) {
      itemWizard.remove();
    });
  };
})();
