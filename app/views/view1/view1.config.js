(function() {
  'use strict';

  function view1Provider($routeProvider) {
    $routeProvider.when('/view1', {
      templateUrl: 'views/view1/view1.html',
      controller: 'View1Ctrl',
      controllerAs: 'view1controller'
    });
  }

  angular.module('rigApp.view1')
    .config(['$routeProvider', view1Provider]);
})();
