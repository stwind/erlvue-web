/*global define */
define([
  'backbone',
  'templates',
  'router',
  'models/main',
  'views/main',

  'backbone.layoutmanager'
], function (Backbone, JST, Router, AppModel, AppView) {
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

  var appModel = new AppModel();
  var appView = new AppView({ model: appModel, el: '#main' });
  var router = new Router({ 
    pushState: true, root: '/',
    model: appModel
  });

  return 'hoho';
});
