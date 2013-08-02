/*global define */
define([
  'backbone',
  'templates',
  'router',
  'models/main',
  'views/main',
  'lib/wamp',
  'lib/backbone.sync',

  'backbone.layoutmanager'
], function (Backbone, JST, Router, AppModel, AppView, Wamp, Sync) {
  'use strict';

  Backbone.Layout.configure({
    manage: true,
    fetch: function(tmpl) {
      return JST[tmpl];
    },
    serialize: function () {
      var obj = this.collection || this.model;
      return obj ? obj.toJSON() : {};
    }
  });

  return {
    start: function () {
      var dfd = $.Deferred();

      Wamp.connect('http://localhost:9081/wamp').then(function(session) {
        var app = {};

        Sync.init(session);

        app.appModel = new AppModel();
        app.appView = new AppView({ 
          model: app.appModel, 
          el: '#main' 
        });
        app.router = new Router({ 
          pushState: true, root: '/',
          model: app.appModel
        });

        dfd.resolve(app);
      });

      return dfd;
    }
  };
});
