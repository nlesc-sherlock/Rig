(function() {
  'use strict';

  function MainScreenController(Messagebus) {
    this.data = { };

    Messagebus.subscribe('dataUpdate',function(event,p) {
      p.then(function(r) {
        this.data = r.data;
      }.bind(this));
    }.bind(this));

    this.clickTableHeader = function(columnName) {
      Messagebus.publish('mainScreenInteraction',{'type':'column-header',
                                                  'value':columnName});
    };

    this.selectTableTextCell=  function(columnName, cellValue) {
      var text = "";
      var pinit = -1;
      var pend = -1;
      if (window.getSelection) {
          text = window.getSelection().toString();
          pinit = window.getSelection().anchorOffset;
          pend = window.getSelection().extentOffset;
      } else if (document.selection && document.selection.type != "Control") {
          //TODO: get positions when window.getSelection is null
          text = document.selection.createRange().text;
      }

      if (text == ""){
        Messagebus.publish('mainScreenInteraction',{'type':'cell',
                                                    'column':columnName,
                                                    'value':cellValue});
      }else{
        Messagebus.publish('mainScreenInteraction',{'type':'seltex',
                                                    'column':columnName,
                                                    'value':cellValue,
                                                    'selection':text,
                                                    'pinit':pinit,
                                                    'pend:':pend});
      }
    };

    this.clickTableRow = function(rowIndex) {
      Messagebus.publish('mainScreenInteraction',{'type':'row',
                                                  'value':rowIndex});
    };

  }
  angular.module('rigApp.mainScreen')
    .controller('MainScreenController', MainScreenController);
})();
