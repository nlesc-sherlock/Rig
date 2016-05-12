(function() {
  'use strict';

  function View2Ctrl($location, $timeout, Messagebus, DataService) {

    this.changeView = function(value) {
      $location.path(value);
      $timeout(DataService.getInventory,100);
    };

    Messagebus.subscribe('changingView1',function(event) {
      // console.log('changing view');\
      this.changeView('view1');
    }.bind(this));
  }

  angular.module('rigApp.view2')
    .controller('View2Ctrl', View2Ctrl);
})();
