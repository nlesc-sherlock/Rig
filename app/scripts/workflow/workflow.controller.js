(function() {
  'use strict';

  function WorkflowController(Messagebus, $scope) {
    this.workflowBlocks = [];

    Messagebus.subscribe('planBlock',function(event,block) {
      console.log('planned block');
      console.log(block);
      this.workflowBlocks.push(block);
      Messagebus.publish('topOfStack',block);
    }.bind(this));
  }
  angular.module('rigApp.workflow')
    .controller('WorkflowController', WorkflowController);
})();
