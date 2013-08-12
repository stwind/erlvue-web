define([
  'backbone',
  'd3'
], function (Backbone, d3) {

  var View = Backbone.View.extend({

    template: 'content',

    initialize: function (options) {
      this.model.on('change:current', this.show, this);
    },

    show: function (model, procs) {
      var collection = this.collection = procs;
      collection.iobind().on('sync', this.update, this);
      this.container = d3.select(this.el).select('.container');
    },

    update: function () {
      var models = this.collection.models,
          items = this.container.selectAll('li').data(models);

      items.enter().append('li').text(function (d) {
        return d.get('pid');
      });
    }

  });

  return View;

});
