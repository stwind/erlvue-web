define([
  'backbone',
  'underscore',
  'jquery',
  'backgrid'
], function (Backbone, _, $, Backgrid) {

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

    className: "procs backgrid-container",

    initialize: function (options) {
      _.bindAll(this, 'render');
      this.show(options.procs);
    },

    show: function (procs) {
      this.collection = procs;
      this.render();
    },

    afterRender: function() {
      if (!this.collection) return this;
      var grid = new Backgrid.Grid({
        columns: columns,
        collection: this.collection
      });
      this.$el.append(grid.render().$el);
    }
  });

});
