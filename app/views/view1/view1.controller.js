(function() {
  'use strict';

  function View1Ctrl($timeout, $location,  DataService, Messagebus) {

    this.changeView = function(value) {
      $location.path(value);
      $timeout(DataService.getData,50);
    };

    Messagebus.subscribe('changingView2',function(event) {
      // console.log('changing view');
      Messagebus.publish('updatingViewMenu',{'viewId':'view2'});
      this.changeView('view2');
    }.bind(this));
  }
  angular.module('rigApp.view1')
    .controller('View1Ctrl', View1Ctrl);
})();
