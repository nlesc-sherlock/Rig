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

    Messagebus.subscribe('generatedWorkflow',function(event,notebook) {
      notebook.then(function(nb){ 
        console.log('generated workflow');
        console.log(nb);
      }.bind(this));
    }.bind(this));

    this.execute = function() {
      console.log('generate workflow');
      console.log(this.workflowBlocks);
      Messagebus.publish('generateWorkflow',this.workflowBlocks);
    }
  }
  angular.module('rigApp.workflow')
    .controller('WorkflowController', WorkflowController);
})();
