(function() {
  'use strict';

  function MainScreenController(Messagebus) {
    this.data = { };
    this.rowschecked = [];

    Messagebus.subscribe('dataUpdate',function(event,p) {
      p.then(function(r) {
        this.data = r.data;
        this.rowschecked = [];
        var index = 0;
        this.data.data.forEach(function(element) {
          this.rowschecked.push({index:index, selected:false});
          index++;
        }.bind(this));
      }.bind(this));
    }.bind(this));

    this.clickTableHeader = function(columnName) {
      Messagebus.publish('mainScreenInteraction',{'type':'column-header',
                                                  'value':columnName});
    };

    this.doubleClickTableCell = function(columnName, cellValue) {
      this.selectTableTextCell(columnName, cellValue);

    };

    this.selectTableTextCell=  function(columnName, cellValue) {
      var text = "";
      var pinit = -1;
      var pend = -1;
      if (window.getSelection) {
        var selection = window.getSelection();
        if (selection.anchorNode === selection.focusNode){
          text = selection.toString();
          pinit = selection.anchorOffset;
          pend = pinit + text.length;

          if (text == "") {
            Messagebus.publish('mainScreenInteraction', {
              'type': 'cell',
              'column': columnName,
              'value': cellValue
            });
          } else {
            Messagebus.publish('mainScreenInteraction', {
              'type': 'seltex',
              'column': columnName,
              'value': cellValue,
              'selection': text,
              'pinit': pinit,
              'pend:': pend
            });
          }
        }
      } else if (document.selection && document.selection.type !== 'Control') {
          //TODO: get positions when window.getSelection is null
          text = document.selection.createRange().text;
      }


    };

    this.clickTableRow = function(rowIndex) {
      var selectedRows = [];
      this.rowschecked.forEach(function(element){
        if (element.selected) {
          selectedRows.push(element.index);
        }
      });
      Messagebus.publish('mainScreenInteraction',{'type':'row',
                                                  'value':selectedRows});
    };

  }
  angular.module('rigApp.mainScreen')
    .controller('MainScreenController', MainScreenController);
})();
