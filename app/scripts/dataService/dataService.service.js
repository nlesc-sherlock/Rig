(function() {
  'use strict';

  function DataService($q, $http, Messagebus, AuthenticationService) {
    this.backendURL = 'http://localhost:5000/query/';

    this.exampleQuery = 'example';

    var deferred = $q.defer();
    this.ready = deferred.promise;

    this.init = function() {
      this.doQuery().then(function success(queryResult) {
        console.log(queryResult);
      });
    };

    this.doQuery = function() {
      return $http.get(encodeURI(this.backendURL + this.exampleQuery));
    };

  }

  angular.module('rigApp.dataService')
    .service('DataService', DataService);
})();