(function() {
  'use strict';

  function rigWrangler() {
    return {
      restrict: 'E',
      templateUrl: 'scripts/wrangler/wrangler.directive.html',
      controller: 'WranglerController',
      controllerAs: 'i'
    };
  }

  angular.module('rigApp.wrangler')
    .directive('rigWrangler', rigWrangler);
})();
