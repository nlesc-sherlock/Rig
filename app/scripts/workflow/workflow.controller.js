(function() {
  'use strict';

  function WorkflowController(Messagebus, $window, $scope) {
    this.workflowBlocks = [];

    Messagebus.subscribe('planBlock',function(event,block) {
      console.log('planned block');
      console.log(block);
      this.workflowBlocks.push(block);
      Messagebus.publish('topOfStack',block);
    }.bind(this));

    this.execute = function() {
      console.log('execute');
      console.log(this.workflowBlocks);
      window.alert('EXECUTING WORKFLOW\nPLEASE WAIT\n\n' + JSON.stringify(this.workflowBlocks,null,'    '));
    }
  }
  angular.module('rigApp.workflow')
    .controller('WorkflowController', WorkflowController);
})();
