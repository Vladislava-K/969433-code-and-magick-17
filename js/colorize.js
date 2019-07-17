'use strict';

(function () {
  window.wizards = [];

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === window.coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === window.eyesColor) {
      rank += 1;
    }

    return rank;
  };

  window.updateWizards = function () {
    window.renders(window.wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = window.wizards.indexOf(left) - window.wizards.indexOf(right);
      }
      return rankDiff;
    }));
  };

  window.successHandler = function (data) {
    window.wizards = data;
    window.updateWizards();
  };
})();
