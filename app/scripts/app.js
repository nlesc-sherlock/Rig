// The app

(function() {
  'use strict';

  /**
   * @ngdoc overview
   * @name rigApp
   * @description
   * # rigApp
   *
   * Main module of the application.
   */
  angular
    .module('rigApp', [
      'ngAnimate',
      'ngSanitize',
      'ngTouch',
      'ngRoute',
      'ui.bootstrap',
      'rigApp.viewMenu',
      'rigApp.view1',
      'rigApp.view2',
      'rigApp.dataService',
      'rigApp.mainScreen',
      'rigApp.inventoryScreen',
      'rigApp.blocks',
      'rigApp.workflow'
    ])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.otherwise({redirectTo: '/view1'});
    }])
    .run(function($timeout, DataService, Messagebus){
      $timeout(DataService.getInventory,500);
      // DataService.getInventory();
      // $timeout(function(){
      //   // When initialization is done, we ask for the inventory data
      //   console.log("Getting inventory data...")
      //   Messagebus.publish('getInventory');
      // }, 500);
    });

  angular.module('rigApp.templates', []);
  angular.module('rigApp.utils', ['rigApp.templates']);
  angular.module('rigApp.dataService', ['rigApp.utils']);

  angular.module('rigApp.viewMenu', ['rigApp.utils']);

  angular.module('rigApp.mainScreen', ['rigApp.utils']);
  angular.module('rigApp.blocks', ['rigApp.utils']);
  angular.module('rigApp.workflow', ['rigApp.utils']);

  angular.module('rigApp.inventoryScreen', ['rigApp.utils']);

  angular.module('rigApp.view1', ['ngRoute', 'rigApp.templates', 'rigApp.dataService', 'rigApp.inventoryScreen']);
  angular.module('rigApp.view2', ['ngRoute', 'rigApp.templates', 'rigApp.dataService', 'rigApp.mainScreen', 'rigApp.blocks', 'rigApp.workflow']);
})();
