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
      'rigApp.selector',
      'rigApp.inventory',
      'rigApp.wrangler',
      'rigApp.dataService',
      'rigApp.mainScreen',
      'rigApp.inventoryScreen',
      'rigApp.blocks',
      'rigApp.workflow'
    ])
    // .config(['$routeProvider', function($routeProvider) {
    //   $routeProvider.otherwise({redirectTo: '/view1'});
    // }])
    .run(function($timeout, DataService, Messagebus){
      $timeout(DataService.getInventory,500);
      $timeout(DataService.getData,500);
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
  angular.module('rigApp.selector', ['rigApp.utils']);
  angular.module('rigApp.inventory', ['rigApp.utils','rigApp.dataService']);
  angular.module('rigApp.wrangler', ['rigApp.utils','rigApp.dataService']);

  angular.module('rigApp.mainScreen', ['rigApp.utils']);
  angular.module('rigApp.blocks', ['rigApp.utils']);
  angular.module('rigApp.workflow', ['rigApp.utils']);
  angular.module('rigApp.inventoryScreen', ['rigApp.utils']);
})();
