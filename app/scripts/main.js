require.config({
  paths: {
    jquery: '../bower_components/jquery/jquery',
    backbone: '../bower_components/backbone/backbone',
    'backbone.layoutmanager': '../bower_components/layoutmanager/backbone.layoutmanager',
    'backbone.stickit': '../bower_components/backbone.stickit/backbone.stickit',
    backgrid: '../bower_components/backgrid/lib/backgrid',
    underscore: '../bower_components/underscore/underscore',
    'underscore.string': '../bower_components/underscore.string/lib/underscore.string',
    handlebars: '../bower_components/handlebars/handlebars.runtime',
    //d3: '../bower_components/d3/d3',
    //async: '../bower_components/async/lib/async',
    bacon: '../bower_components/bacon/dist/Bacon',
    sockjs: '../bower_components/sockjs-0.3.4/index',
    URIjs: '../bower_components/uri.js/src'
  },
  shim: {
    underscore: { exports: '_' },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    backgrid: {
      deps: ['backbone'],
      exports: 'Backgrid'
    },
    //d3: { exports: 'd3' },
    handlebars: { exports: 'Handlebars' },
    'backbone.stickit': ['backbone']
  },
  deps: ['backbone.stickit', 'lib/backbone.layout']
});

require(['app','jquery'], function (App, $) {
    'use strict';

    App.start({
      wsUrl: 'http://localhost:9081/wamp',
      mainEl: '#main'
    }).then(function(app) {
      console.log('app started: ', app);

      window.App = app;
    });
});
