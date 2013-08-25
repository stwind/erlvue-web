define([
  'backbone',
  'underscore',
  'jquery',

  './nodeItem'
], function (Backbone, _, $, ItemView) {

  return Backbone.View.extend({

    template: 'content',

    partial: function($root, $el) {
      $root.find('.container').append($el);
    },

    initialize: function (options) {
      this.model.on('change:current', function(model, procs) {
        this.show(procs);
      }, this);
    },

    show: function (procs) {
      var collection = this.collection = procs;

      collection
        .iobind()
        .on('add', this.addItem, this)
        .on('remove', this.removeItem, this);
    },

    addItem: function (model) {
      var root = this,
          view = new ItemView({ model: model });

      root
        .insertView('.container', view)
        .render().promise()
        .then(function() {
          root.trigger('addItem', view, root);
        });
    },

    removeItem: function (model) {
      this.removeView(function(view) {
        return view.model.id == model.id;
      });
    }

  });

});
