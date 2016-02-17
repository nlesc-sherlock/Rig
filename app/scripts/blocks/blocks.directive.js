(function() {
  'use strict';

  function rigBlocks() {
    return {
      restrict: 'E',
      templateUrl: 'scripts/blocks/blocks.directive.html',
      controller: 'BlocksController',
      controllerAs: 'bl'
    };
  }

  angular.module('rigApp.blocks')
    .directive('rigBlocks', rigBlocks);
})();