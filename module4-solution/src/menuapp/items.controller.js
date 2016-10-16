(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoryItemsController', CategoryItemsController);


CategoryItemsController.$inject = ['itemslist'];
function CategoryItemsController(itemslist) {
  var itemsCtrl = this;
  itemsCtrl.items = itemslist;
}

})();
