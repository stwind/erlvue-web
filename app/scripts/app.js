/*global define */
define([
  'router',
  'models/main',
  'views/main',
  'lib/wamp',
  'lib/backbone.remote'
], function (Router, AppModel, AppView, Wamp, Remote) {
  'use strict';

  return {
    start: function (opt) {
      var def = $.Deferred();

      Wamp.connect(opt.wsUrl).then(function(session) {
        var app = {};

        Remote.init(session);

        app.appModel = new AppModel();
        app.appView = new AppView({ 
          model: app.appModel, 
          el: opt.mainEl 
        });
        app.router = new Router({ 
          pushState: true, root: '/',
          model: app.appModel
        });

        def.resolve(app);
      });

      return def;
    }
  };
});
