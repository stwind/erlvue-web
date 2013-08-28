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
      this.listenTo(this.model, 'change:current', function(model, procs) {
        this.show(procs);
      });
      _.bindAll(this, 'addItem', 'removeItem', 'render');
    },

    show: function (procs) {
      var collection = this.collection = procs;

      // XXX: use listenTo ?
      collection.on('sort', this.render);
    },

    beforeRender: function () {
      var collection = this.collection;
      if (collection) {
        collection.each(this.addItem);
      }
    },

    addItem: function (model) {
      var view = new ItemView({ model: model });

      this.insertView('.container', view);
      return this;
    },

    removeItem: function (model) {
      this.removeView(function(view) {
        return view.model.id == model.id;
      });

      return this;
    }

  });

});
