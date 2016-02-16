(function() {
  'use strict';

  function DataService($q, $http, $timeout, Messagebus) { //, AuthenticationService) {
    this.backendURL = 'http://localhost:5000/query/';

    this.exampleQuery = 'example';

    var deferred = $q.defer();
    this.ready = deferred.promise;

    this.init = function() {
      $timeout(this.doQuery,10);
    };

    this.doQuery = function() {
      Messagebus.publish('dataUpdate',{ 'result': [
        { 'one': 1, 'two': 2, 'three': 3 },
        { 'one': 4, 'two': 5, 'three': 6 },
        { 'one': 7, 'two': 8, 'three': 9 }
      ]});
//      return $http.get(encodeURI(this.backendURL + this.exampleQuery));
    };

  }

  angular.module('rigApp.dataService')
    .service('DataService', DataService);
})();