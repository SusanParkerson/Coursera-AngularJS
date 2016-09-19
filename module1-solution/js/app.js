/*
The following function is an iife (Immediately-invoked function expression)
 */
(function () {
'use strict';
	angular.module('LunchCheck', [])
	.controller('LunchCheckController', LunchCheckController);

	LunchCheckController.$inject = ['$scope'];

	function LunchCheckController($scope) {

		$scope.theMessage = "";
		$scope.lunchItems = "";
  
  		$scope.checkItems = function () {
  			if ($scope.lunchItems === "")
  			{
  				$scope.theMessage = "Please enter data first";
  			}
  			else
  			{
  				var theItems = $scope.lunchItems.split(',');
  				var theCount = theItems.length;
  				if (theCount > 3)
  				{
  					$scope.theMessage = "Too much!";
  				}
  				else
  				{
  					$scope.theMessage = "Enjoy!";
  				}
  			}
  		};

	};

})();