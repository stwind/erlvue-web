define([
  'backbone',
  'templates',
  'backbone.layoutmanager'
], function(Backbone, JST) {

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

});
