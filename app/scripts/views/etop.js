define([
  'backbone',
  'underscore',
  'jquery',
  'backgrid',
  './backgrid/row'
], function (Backbone, _, $, Backgrid, Row) {

  var columns = [{
    name: 'pid',
    label: 'pid',
    sortable: false,
    editable: false,
    cell: 'string'
  }, {
    name: 'name',
    label: 'name',
    sortable: false,
    editable: false,
    cell: 'string'
  }, {
    name: 'mem',
    label: 'mem',
    sortable: false,
    editable: false,
    cell: 'integer'
  }, {
    name: 'reds',
    label: 'reds',
    sortable: false,
    editable: false,
    cell: 'integer'
  }, {
    name: 'mq',
    label: 'msgq',
    sortable: false,
    editable: false,
    cell: 'integer'
  }, {
    name: 'cf',
    label: 'current function',
    sortable: false,
    editable: false,
    cell: 'string'
  }];

  return Backbone.View.extend({

    manage: true,

    template: 'etop',

    className: "backgrid-container",

    afterRender: function() {
      if (!this.collection) return this;
      var grid = new Backgrid.Grid({
        columns: columns,
        collection: this.collection,
        row: Row
      });
      this.$el.append(grid.render().$el);
    }
  });

});
