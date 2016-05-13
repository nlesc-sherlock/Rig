(function() {
  'use strict';

  function InventoryScreenController($timeout, Messagebus) {

    this.data = { };
    this.rowschecked = [];
    this.requireNewData = false;

    Messagebus.subscribe('inventoryUpdate',function(event,p) {
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
      // Update the selection in the table
      this.rowschecked.forEach(function(element){
        if (rowIndex == element.index){
          element.selected = true;
        }else{
          element.selected = false;
        }
      });

      // Inform that an interactions has been done
      Messagebus.publish('inventoryInteraction', {'index':rowIndex});

      //Update the variable that indicated the selected data set
      this.data.selected = rowIndex;
      this.requireNewData = (rowIndex != this.data.selected);
    };

    Messagebus.subscribe('selectedDataSetUpdatedInServer',function() {
      if (this.requireNewData == true) {
        //TODO: We need to change the displayed data in the wrangler before swithing to it
      }
      // Add timeout to let the user see that, if he has changed the selected row, it has been applied
      $timeout(function() {
        Messagebus.publish('changingToWrangler');
      }, 300);
    }.bind(this));
  }
  angular.module('rigApp.inventoryScreen')
    .controller('InventoryScreenController', InventoryScreenController);
})();
