// The app

(function() {
  'use strict';

  /**
   * @ngdoc overview
   * @name uncertApp
   * @description
   * # uncertApp
   *
   * Main module of the application.
   */
  angular
    .module('rigApp', [
      'ngAnimate',
      'ngSanitize',
      'ngTouch',
      'ui.bootstrap',
      'rigApp.dataService',
      'rigApp.mainScreen',
      'rigApp.blocks',
      'rigApp.workflow'
    ])
    .run(function(DataService){
        DataService.init();
    });

  angular.module('rigApp.templates', []);
  angular.module('rigApp.utils', ['rigApp.templates']);
  angular.module('rigApp.dataService', ['rigApp.utils']);
  angular.module('rigApp.mainScreen', ['rigApp.utils']);
  angular.module('rigApp.blocks', ['rigApp.utils']);
  angular.module('rigApp.workflow', ['rigApp.utils']);
})();
