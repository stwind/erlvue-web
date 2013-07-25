define([
  'backbone'
], function (Backbone) {
  
  var View = Backbone.View.extend({

    template: 'main',

    initialize: function () {
      this.render();
    }

  });

  return View;

});
