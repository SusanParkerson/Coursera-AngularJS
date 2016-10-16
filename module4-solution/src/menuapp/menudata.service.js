(function () {
'use strict';

angular.module('Data')
.service('MenuDataService', MenuDataService);


MenuDataService.$inject = ['$q', '$timeout', '$http', 'ApiBasePath']
function MenuDataService($q, $timeout, $http, ApiBasePath) {
  var service = this;

  // List of categories
  var categorylist = [];

  // List of shopping items
  var items = [];

  service.getAllCategories = function () {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/categories.json")
    }).then(
    function success(response) {
      categorylist = response.data;
      //console.log("response.data: ", response.data);
      return categorylist;
    },
    function error(response) {
      console.log("error response from $http to get categories");
    }) 

  };  //end of function service.getAllCategories

    service.getItemsForCategory = function (categoryShortName) {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json?category=" + categoryShortName)
    }).then(
    function success(response) {
      items = response.data.menu_items;
      return items;
    },
    function error(response) {
      console.log("error response from $http to get items for category");
    }) 

  };  //end of function service.getItemsForCategory

}  //end of function MenuDataService

})();
