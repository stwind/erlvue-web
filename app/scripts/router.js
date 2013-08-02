define([
  'backbone'
], function(Backbone, AppModel) {

  var Router = Backbone.Router.extend({

    initialize: function(opt) {
      this.model = opt.model;
      Backbone.history.start(opt);
    },

    routes: {
      '': 'index'
    },

    index: function () {
      this.model.fetch().then(function (result) {
        console.log("shit");
      });
    }
  });

  return Router;
});
