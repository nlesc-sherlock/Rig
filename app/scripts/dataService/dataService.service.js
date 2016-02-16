(function() {
  'use strict';

  function DataService($q, $http, $timeout, Messagebus) { //, AuthenticationService) {
    this.backendURL = 'http://localhost:5000/';

    this.exampleQuery = 'example';

    var deferred = $q.defer();
    this.ready = deferred.promise;

    this.init = function() {
      $timeout(this.doQuery,10);
    };

    this.doQuery = function() {
      $http.get(encodeURI(this.backendURL)).then(function(result){
        Messagebus.publish('dataUpdate',result.data);
      });
      //Messagebus.publish('dataUpdate', ... );
/*    { 
        'columns': [ 'one', 'two', 'three' ],
        'data': [
          { 'one': 1, 'two': 2, 'three': 3 },
          { 'one': 4, 'two': 5, 'three': 6 },
          { 'one': 7, 'two': 8, 'three': 9 }
        ]}
  */              
//      return $http.get(encodeURI(this.backendURL + this.exampleQuery));
    }.bind(this);

  }

  angular.module('rigApp.dataService')
    .service('DataService', DataService);
})();