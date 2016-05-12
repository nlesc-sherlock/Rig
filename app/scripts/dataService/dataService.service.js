(function() {
  'use strict';

  function DataService($q, $http, $timeout, Messagebus) { //, AuthenticationService) {
    this.backendURL = 'http://localhost:5000';
//    this.backendURL = 'http://192.168.189.128:5000';

    this.inventoryQuery = '/inventory'
    this.exampleQuery = '/records/original/0/100';
    this.suggestionsPath = '/suggestions';
    this.setDataPath = '/setdata'

    this.currentTopOfStack = {};
    this.lastMainScreenInteraction = {};

    var deferred = $q.defer();
    this.ready = deferred.promise;

    // this.init = function() {
    //   $timeout(this.getData,10);
    // };

    this.getInventory = function() {
      Messagebus.publish('dataInventory',$http.get(encodeURI(this.backendURL + this.inventoryQuery)));
    }.bind(this);

    this.getData = function() {
      Messagebus.publish('dataUpdate',$http.get(encodeURI(this.backendURL + this.exampleQuery)));
      this.getSuggestions(this.currentTopOfStack,this.lastMainScreenInteraction);
    }.bind(this);

    this.getSuggestions = function(topOfStack,mainScreenInteraction) {
      Messagebus.publish('newSuggestions',
        $http.post(encodeURI(this.backendURL + this.suggestionsPath),
                   {
                     'topOfStack': this.currentTopOfStack,
                     'mainScreenInteraction': this.lastMainScreenInteraction
                   }));
    }.bind(this);

    Messagebus.subscribe('inventoryInteraction',function(event,interactionIndex) {
      console.log(interactionIndex);
      $http.post(encodeURI(this.backendURL + this.setDataPath), {'index': interactionIndex});
      Messagebus.publish('selectedDataSetUpdatedInServer');
    }.bind(this));

    Messagebus.subscribe('mainScreenInteraction',function(event,interactionSpec) {
      // console.log(interactionSpec);
      this.lastMainScreenInteraction = interactionSpec;
      this.getSuggestions(this.currentTopOfStack,interactionSpec);
    }.bind(this));

    Messagebus.subscribe('topOfStack',function(event,block) {
      // console.log(block);
      this.currentTopOfStack = block;
      this.getSuggestions(this.currentTopOfStack,this.lastMainScreenInteraction);
    }.bind(this));



  }

  angular.module('rigApp.dataService')
    .service('DataService', DataService);
})();
