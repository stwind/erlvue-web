require.config({
  paths: {
    jquery: '../bower_components/jquery/jquery',
    backbone: '../bower_components/backbone/backbone',
    underscore: '../bower_components/underscore/underscore',
    handlebars: '../bower_components/handlebars/handlebars.runtime'
  },
  shim: {
    underscore: { exports: '_' },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    handlebars: { exports: 'Handlebars' }
  }
});

require(['app','jquery','handlebars','underscore'], function (app, $,H,_) {
    'use strict';
    console.log(H);
    console.log(_);
    // use app here
    console.log(app);
    console.log('Running jQuery %s', $().jquery);
});
