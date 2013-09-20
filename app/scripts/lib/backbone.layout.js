define([
  'backbone',
  'templates',
  'backbone.layoutmanager'
], function(Backbone, JST) {

  Backbone.Layout.configure({
    fetchTemplate: function(tmpl) {
      return JST[tmpl];
    }
  });

});
