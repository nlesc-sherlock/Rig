(function() {
  'use strict';

  function BlocksController(Messagebus, $scope) {
    this.suggestedBlocks = [];

    Messagebus.subscribe('mainScreenInteraction',function(event,colHeader) {
        console.log('blocks sais ' + colHeader);
        this.suggestedBlocks = [
          {'operation':'split','parameter':colHeader},
          {'operation':'sample','parameter':100}
        ];
    }.bind(this));
  }
  angular.module('rigApp.blocks')
    .controller('BlocksController', BlocksController);
})();
