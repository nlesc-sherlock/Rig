(function() {
  'use strict';

  function BlocksController(Messagebus, $scope) {
    this.suggestedBlocks = [];
    this.topOfStack = {};

    Messagebus.subscribe('mainScreenInteraction',function(event,colHeader) {
      console.log('blocks sais ' + colHeader);
      this.suggestedBlocks = [
        {'operation':'split','parameter':colHeader},
        {'operation':'sample','parameter':100}
      ];
    }.bind(this));
    
    Messagebus.subscribe('topOfStack',function(event,block) {
      console.log('new top of stack is');
      console.log(block);
      this.topOfStack = block;
    }.bind(this));

    this.planBlock = function(block) {
      console.log('planning the block');
      console.log(block);
      Messagebus.publish('planBlock',block);
    };

  }
  angular.module('rigApp.blocks')
    .controller('BlocksController', BlocksController);
})();
