(function() {
  'use strict';

  function DataService($q, $http, $timeout, Messagebus) { //, AuthenticationService) {
    this.backendURL = 'http://localhost:5000';

    this.exampleQuery = '/records/original/0/10';

    var deferred = $q.defer();
    this.ready = deferred.promise;

    this.init = function() {
      $timeout(this.doQuery,10);
    };

    this.doQuery = function() {
      Messagebus.publish('dataUpdate',$http.get(encodeURI(this.backendURL + this.exampleQuery)));
    }.bind(this);

  }

  angular.module('rigApp.dataService')
    .service('DataService', DataService);
})();
