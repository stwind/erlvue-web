define([
  'backbone',
  'underscore'
], function (Backbone, _) {
  var View = Backbone.View.extend({

    template: 'nodelist',

    tagName: 'ul',

    events: {
      'click .node-item': 'onItemClick'
    },

    initialize: function (options) {
      this.collection.fetch();
      this.collection.on('sync', this.render, this);
    },

    onItemClick: function (e) {
      var name = $(e.target).data('name');
      this.model.selectNode(name);
    }

  });

  return View;
});
