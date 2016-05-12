(function() {
  'use strict';

  function rigViewMenu() {
    return {
      restrict: 'AE',
      templateUrl: 'scripts/viewMenu/viewMenu.directive.html',
      controller: 'ViewMenuController',
      controllerAs: 'vm'
    };
  }

  angular.module('rigApp.viewMenu')
    .directive('rigViewMenu', rigViewMenu);
})();
