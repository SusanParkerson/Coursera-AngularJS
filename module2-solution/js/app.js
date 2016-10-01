
//The following function is an iife (Immediately-invoked function expression).
//Using an iife like this avoids polluting the global namespace.
(function () {
//strict mode prevents the use of undeclared variables
'use strict';
	angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService',ShoppingListCheckOffService);
	
  //$inject protects the dependency injection from minification
  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var ToBuy_this = this;
    ToBuy_this.items = ShoppingListCheckOffService.getItemsToBuy();

    ToBuy_this.buyItem = function (itemIndex) {
      ShoppingListCheckOffService.buyItem(itemIndex);
    };

  }

  //$inject protects the dependency injection from minification
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var AlreadyBought_this = this;
    AlreadyBought_this.items = ShoppingListCheckOffService.getItemsAlreadyBought();

  }

	function ShoppingListCheckOffService() {
    var thisService = this;

    var itemsToBuy = [
      { name: "avocado", quantity: 1 },
      { name: "apples", quantity: 10 },
      { name: "bananas", quantity: 5 },
      { name: "eggs", quantity: 12 },
      { name: "lettuce", quantity: 1 }
    ];

    var itemsAleadyBought = [];

    thisService.buyItem = function (indx) {
      itemsAleadyBought.push(itemsToBuy[indx]);
      itemsToBuy.splice(indx, 1);
    }

    thisService.getItemsToBuy = function () {
      return itemsToBuy;
    };

    thisService.getItemsAlreadyBought = function() {
      return itemsAleadyBought;
    }
  }

})();