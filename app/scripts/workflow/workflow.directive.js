(function() {
  'use strict';

  function rigWorkflow() {
    return {
      restrict: 'E',
      templateUrl: 'scripts/workflow/workflow.directive.html',
      controller: 'WorkflowController',
      controllerAs: 'wf'
    };
  }

  angular.module('rigApp.workflow')
    .directive('rigWorkflow', rigWorkflow);
})();