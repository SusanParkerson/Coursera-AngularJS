
//The following function is an iife (Immediately-invoked function expression).
//Using an iife like this avoids polluting the global namespace.
(function () {
//strict mode prevents the use of undeclared variables
'use strict';
	angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService',MenuSearchService)
  .directive('foundItems', FoundItemsDirective)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");
	
  //$inject protects the dependency injection from minification
  NarrowItDownController.$inject = ['$scope', 'MenuSearchService'];
  function NarrowItDownController($scope, MenuSearchService) {
    var thisController = this;
    
    var searchTerm = "";

    var found = [];

    thisController.NarrowButtonClicked = function () {
      MenuSearchService.getMatchedMenuItems($scope.searchTerm).then(function(response) {
        //Update controller collection property
        thisController.found = response;
      });    
    }

    thisController.removeItem = function (itemIndex) {
      MenuSearchService.removeItem(itemIndex.index);
    }

    thisController.nothingFound = function ()
    {
      return MenuSearchService.nothingFound();
    }
    
  }

  MenuSearchService.$inject = ['$http', 'ApiBasePath']
	function MenuSearchService($http, ApiBasePath) {
    var thisService = this;

    //function: getMatchedMenuItems(searchTerm)
    //Purpose: reaches out to the server (using $http service) to 
    //    retrieve the list of all the menu items.  Once it gets
    //    all menu items, it loops through them to pick out the ones
    //    whose description matches the searchTerm. Once a list of items
    //    is compiled, this function returns the list (wrapped in a promise).
    //    The "then" function itself returns a promise.
    // URL for the REST Endpoint is:
    // https://davids-restaurant.herokuapp.com/menu_items.json

    //List of found items
    var foundItems = [];

    var nothingFoundFlag = false;

    thisService.getMatchedMenuItems = function (searchTerm) {
      
      return $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      }).then(function success(response) {
        
        // process result and only keep items that match
        foundItems.length = 0;
        if (!searchTerm)
        {
          nothingFoundFlag = true;
        }
        else
        {
          for (var i = 0; i<response.data.menu_items.length; i++)
          {
            if(response.data.menu_items[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
            {
              foundItems.push(response.data.menu_items[i]);
            }
          }
          if(foundItems.length > 0)
          {
            nothingFoundFlag = false;
          }
          else
          {
            nothingFoundFlag = true;
          }
        }
        // return processed items
        return foundItems;
      },
      function error(response) {
        console.log("error response from $http");
      });

    } //end of function this.getMatchedMenuItems

    thisService.removeItem = function (itemIndex) {
        foundItems.splice(itemIndex, 1);
    };

    thisService.getItems = function () {
      return foundItems;
    };

    thisService.nothingFound = function () {
      return nothingFoundFlag;
    };

  } //end of service function MenuSearchService


  function FoundItemsDirective() {

    //Create the Directive Definition Object (ddo)
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        found: '<',
        removeItem: '&'
      },
      controller: NarrowItDownController,
      controllerAs: 'NarrowCtrl',
      bindToController: true
    };

    return ddo;
  }

function NarrowItDownDirectiveController() {
  var directiveCtrl = this;

}


})();
