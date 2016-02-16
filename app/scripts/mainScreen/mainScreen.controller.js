(function() {
  'use strict';

  function MainScreenController(Messagebus) {
    this.data = { 
      'columns': [ 'one', 'two', 'three' ],
      'data': [
        { 'one': 10, 'two': 20, 'three': 30 },
        { 'one': 40, 'two': 50, 'three': 60 },
        { 'one': 70, 'two': 80, 'three': 90 }
      ]};

    Messagebus.subscribe('dataUpdate',function(event,d) {
      this.data = d;
    }.bind(this));
  }
  angular.module('rigApp.mainScreen')
    .controller('MainScreenController', MainScreenController);
})();