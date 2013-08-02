define([
  'backbone'
], function (Backbone) {
  
  var View = Backbone.View.extend({

    template: 'main',

    initialize: function () {
      this.model.on('change', this.render, this);
      this.render();
    }

  });

  return View;

});
