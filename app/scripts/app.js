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

        var appModel = app.model = new AppModel();
        app.view = new AppView({ 
          model: appModel, 
          el: opt.mainEl 
        });
        app.router = new Router({ 
          pushState: true, root: '/',
          model: appModel
        });

        def.resolve(app);
      });

      return def;
    }
  };
});
