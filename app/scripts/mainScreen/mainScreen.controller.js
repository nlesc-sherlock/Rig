(function() {
  'use strict';

  function MainScreenController(Messagebus,$window) {
    Messagebus.subscribe('dataUpdate',function(event,data) {
      $window.alert(data);
    });
  }
  angular.module('rigApp.mainScreen')
    .controller('MainScreenController', MainScreenController);
})();