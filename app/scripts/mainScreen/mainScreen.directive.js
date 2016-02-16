(function() {
  'use strict';

  function rigMainScreen() {
    return {
      restrict: 'E',
      templateUrl: 'scripts/mainScreen/mainScreen.directive.html',
      controller: 'MainScreenController',
      controllerAs: 'ms'
    };
  }

  angular.module('rigApp.mainScreen')
    .directive('rigMainScreen', rigMainScreen);
})();