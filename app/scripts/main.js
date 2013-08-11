require.config({
  paths: {
    jquery: '../bower_components/jquery/jquery',
    backbone: '../bower_components/backbone/backbone',
    'backbone.layoutmanager': '../bower_components/layoutmanager/backbone.layoutmanager',
    underscore: '../bower_components/underscore/underscore',
    'underscore.string': '../bower_components/underscore.string/lib/underscore.string',
    handlebars: '../bower_components/handlebars/handlebars.runtime',
    bacon: '../bower_components/bacon/dist/Bacon',
    sockjs: '../bower_components/sockjs-0.3.4/index'
  },
  shim: {
    underscore: { exports: '_' },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    handlebars: { exports: 'Handlebars' },
    'backbone.layoutmanager': ['backbone']
  }
});

require(['app','jquery'], function (App, $) {
    'use strict';
    // use app here

    App.start({
      wsUrl: 'http://localhost:9081/wamp',
      mainEl: '#main'
    }).then(function(app) {
      console.log('app started: ', app);
    });
});
