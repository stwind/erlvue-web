define([
  'backbone',
  'underscore',
  'jquery',

  './nodeItem'
], function (Backbone, _, $, ItemView) {

  return Backbone.View.extend({

    template: 'content',

    sections: {
      container: '.container'
    },

    partial: function($root, $el) {
      $root.find('.container').append($el);
    },

    initialize: function (options) {
      this.model.on('change:current', this.show, this);
    },

    show: function (model, procs) {
      var collection = this.collection = procs;

      collection
        .iobind()
        .on('add', this.addItem, this)
        .on('remove', this.removeItem, this);
    },

    addItem: function (model) {
      var root = this,
          container = root.$('.container'),
          view = new ItemView({ model: model });

      root.insertView('container', view).render();
    },

    removeItem: function (model) {
      var view = this.getView(function(v) {
        return v.model.id == model.id;
      });

      view && view.$el.addClass('removed');
    }

  });

});
