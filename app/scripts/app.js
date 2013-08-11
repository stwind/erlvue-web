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
    fetchTemplate: function(tmpl) {
      return JST[tmpl];
    },
    serialize: function () {
      var obj = this.collection || this.model;
      return obj ? obj.toJSON() : {};
    }
  });

  return {
    start: function (opt) {
      var def = $.Deferred();

      Wamp.connect(opt.wsUrl).then(function(session) {
        var app = {};

        Sync.init(session);

        app.appModel = new AppModel();
        app.appView = new AppView({ 
          model: app.appModel, 
          el: opt.mainEl 
        });
        app.router = new Router({ 
          pushState: true, root: '/',
          model: app.appModel,
          view: app.appView
        });

        def.resolve(app);
      });

      return def;
    }
  };
});
