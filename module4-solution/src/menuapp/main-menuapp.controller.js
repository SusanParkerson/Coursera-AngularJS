(function () {
'use strict';

angular.module('MenuApp')
.controller('MainMenuAppController', MainMenuAppController);


MainMenuAppController.$inject = ['categorylist'];
function MainMenuAppController(categorylist) {
  var mainList = this;
  mainList.items = categorylist;
}

})();
