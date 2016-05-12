(function() {
  'use strict';

  function view2Provider($routeProvider) {
    $routeProvider.when('/view2', {
      templateUrl: 'views/view2/view2.html',
      controller: 'View2Ctrl',
      controllerAs: 'view2controller'
    });
  }

  angular.module('rigApp.view2')
    .config(['$routeProvider', view2Provider]);
})();
