(function() {
  'use strict';

  function rigInventory() {
    return {
      restrict: 'E',
      templateUrl: 'scripts/inventory/inventory.directive.html',
      controller: 'InventoryController',
      controllerAs: 'i'
    };
  }

  angular.module('rigApp.inventory')
    .directive('rigInventory', rigInventory);
})();
