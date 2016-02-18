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
      suggestions.then(function(sugg){ 
        this.suggestedBlocks = sugg.data.suggestions;
      }.bind(this));
    }.bind(this));
    
  }
  angular.module('rigApp.blocks')
    .controller('BlocksController', BlocksController);
})();
