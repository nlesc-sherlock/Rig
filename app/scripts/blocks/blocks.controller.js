(function() {
  'use strict';

  function BlocksController(Messagebus, $scope) {
    this.suggestedBlocks = []; /* output of the DataService suggestions */

    this.planBlock = function(block) {
      console.log('planning the block');
      console.log(block);
      Messagebus.publish('planBlock',block);
    };

    Messagebus.subscribe('newSuggestions',function(event,suggestions) {
      this.suggestedBlocks = suggestions;
    }.bind(this));
    
  }
  angular.module('rigApp.blocks')
    .controller('BlocksController', BlocksController);
})();
