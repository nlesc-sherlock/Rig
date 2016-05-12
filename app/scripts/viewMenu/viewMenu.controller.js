(function() {
  'use strict';

  function ViewMenuController($location, Messagebus) {

    var myEl = angular.element( document.querySelector( '#inventory-button' ) );
    if ($location.path() == '/view2'){
      myEl = angular.element( document.querySelector( '#wrangler-button' ) );
    }
    myEl.addClass('black');

    this.updateButtonColors = function(viewId) {
      var c1 = 'white';
      var c2 = 'black';
      if (viewId == 'view1'){
        c1 = 'black';
        c2 = 'white';
      }
      var myEl = angular.element( document.querySelector( '#inventory-button' ) );
      myEl.removeClass(c2);
      myEl.addClass(c1);
      var myEl2 = angular.element( document.querySelector( '#wrangler-button' ) );
      myEl2.removeClass(c1);
      myEl2.addClass(c2);
    };

  this.initView = function(viewId) {
    this.updateButtonColors(viewId);
    if (viewId == 'view1'){
      Messagebus.publish('changingView1');
    }else{
      Messagebus.publish('changingView2');
    }
  };

  Messagebus.subscribe('updatingViewMenu',function(event, viewId) {
    this.updateButtonColors(viewId);
  }.bind(this));

  }
  angular.module('rigApp.viewMenu')
    .controller('ViewMenuController', ViewMenuController);
})();
