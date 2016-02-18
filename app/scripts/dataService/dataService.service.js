(function() {
  'use strict';

  function DataService($q, $http, $timeout, Messagebus) { //, AuthenticationService) {
//    this.backendURL = 'http://localhost:5000';
    this.backendURL = 'http://145.100.116.242:5000';

    this.exampleQuery = '/records/original/0/100';
    this.suggestionsPath = '/suggestions';

    this.currentTopOfStack = {};
    this.lastMainScreenInteraction = {};

    var deferred = $q.defer();
    this.ready = deferred.promise;

    this.init = function() {
      $timeout(this.getData,10);
    };

    this.getData = function() {
      Messagebus.publish('dataUpdate',$http.get(encodeURI(this.backendURL + this.exampleQuery)));
      this.getSuggestions(this.currentTopOfStack,this.lastMainScreenInteraction);
    }.bind(this);

    this.getSuggestions = function(topOfStack,mainScreenInteraction) {
      Messagebus.publish('newSuggestions',$http.post(encodeURI(this.backendURL + this.suggestionsPath),
        {
          'topOfStack': this.currentTopOfStack,
          'mainScreenInteraction': this.lastMainScreenInteraction
        }));
    }.bind(this);

    Messagebus.subscribe('mainScreenInteraction',function(event,interactionSpec) {
      console.log(interactionSpec);
      this.lastMainScreenInteraction = interactionSpec;
      this.getSuggestions(this.currentTopOfStack,interactionSpec);
    }.bind(this));

    Messagebus.subscribe('topOfStack',function(event,block) {
      console.log(block);
      this.currentTopOfStack = block;
      this.getSuggestions(this.currentTopOfStack,this.lastMainScreenInteraction);
    }.bind(this));

  }

  angular.module('rigApp.dataService')
    .service('DataService', DataService);
})();
