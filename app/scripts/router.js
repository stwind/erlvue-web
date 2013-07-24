define([
  'backbone',
  'comp/event'
], function(Backbone, Event) {

  var Router = Backbone.Router.extend({

    initialize: function(options) {
      this.event = Event.stream(this);
    },

    routes: {
      '': 'index'
    },

    index: function () {
      this.event.trigger('index', 'fuck');
    }
  });

  return Router;
});
