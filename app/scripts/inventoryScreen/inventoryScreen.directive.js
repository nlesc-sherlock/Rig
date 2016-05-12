(function() {
  'use strict';

  function rigInventoryScreen() {
    return {
      restrict: 'AE',
      templateUrl: 'scripts/inventoryScreen/inventoryScreen.directive.html',
      controller: 'InventoryScreenController',
      controllerAs: 'is'
    };
  }

  angular.module('rigApp.inventoryScreen')
    .directive('rigInventoryScreen', rigInventoryScreen);
})();
