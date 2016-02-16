(function() {
  'use strict';

  function MainScreenController(Messagebus) {
    Messagebus.subscribe('dataUpdate',function(event,data) {
      console.log(data);
    });
  }
  angular.module('rigApp.mainScreen')
    .controller('MainScreenController', MainScreenController);
})();