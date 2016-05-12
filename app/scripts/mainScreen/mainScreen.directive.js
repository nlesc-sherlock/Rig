(function() {
  'use strict';

  function rigMainScreen() {
    return {
      restrict: 'AE',
      templateUrl: 'scripts/mainScreen/mainScreen.directive.html',
      controller: 'MainScreenController',
      controllerAs: 'ms'
    };
  }

  angular.module('rigApp.mainScreen')
    .directive('rigMainScreen', rigMainScreen);
})();
