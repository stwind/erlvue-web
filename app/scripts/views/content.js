define([
  'backbone',
  'underscore',
  'jquery',

  './procItem'
], function (Backbone, _, $, ItemView) {

  return Backbone.View.extend({

    template: 'content',

    partial: function($root, $el) {
      $root.find('.procs').append($el);
    },

    initialize: function (options) {
      this.listenTo(this.model, 'change:current', function(model, procs) {
        this.show(procs);
      });
      _.bindAll(this, 'addItem', 'removeItem', 'render');
    },

    show: function (procs) {
      var collection = this.collection = procs;

      this.listenTo(collection, 'add', this.addItem);
      this.listenTo(collection, 'remove', this.removeItem);
    },

    addItem: function (model) {
      var view = new ItemView({ model: model, factor: 50 });

      this.insertView('.procs', view).render().toState('enter');
      return this;
    },

    removeItem: function (model) {
      var view = this.getView(function(v) {
        return v.model.id == model.id;
      });

      view.toState('exit');

      setTimeout(function() {
        view.remove();
      }, 5000);

      return this;
    }

  });

});
