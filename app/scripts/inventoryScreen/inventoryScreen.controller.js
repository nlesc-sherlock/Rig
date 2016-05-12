(function() {
  'use strict';

  function InventoryScreenController($location, Messagebus) {
    this.data = { };
    this.rowschecked = [];

    Messagebus.subscribe('dataInventory',function(event,p) {
      p.then(function(r) {
        this.data = r.data;
        this.rowschecked = [];
        var index = 0;
        this.data.data.forEach(function(element) {
          this.rowschecked.push({index:index, selected:index==this.data.selected});
          index++;
        }.bind(this));
      }.bind(this));
    }.bind(this));


    this.clickTableRow = function(rowIndex) {
      // console.log("Pressing data set " + rowIndex)
      var selectedRow = -1;
      this.rowschecked.forEach(function(element){
        if (rowIndex == element.index){
          element.selected = true;
          selectedRow = element.index;
        }else{
          element.selected = false;
        }
      });
      Messagebus.publish('inventoryInteraction',{'index':rowIndex});
    };

    Messagebus.subscribe('selectedDataSetUpdatedInServer',function(event,p) {
      console.log('server updated')
      Messagebus.publish('changingView2');
    }.bind(this));


  }
  angular.module('rigApp.inventoryScreen')
    .controller('InventoryScreenController', InventoryScreenController);
})();
