(function() {
  'use strict';

  function MainScreenController(Messagebus) {
    this.data = { };

    Messagebus.subscribe('dataUpdate',function(event,p) {
      p.then(function(r) {
        this.data = r.data;
      }.bind(this));
    }.bind(this));

  }
  angular.module('rigApp.mainScreen')
    .controller('MainScreenController', MainScreenController);
})();