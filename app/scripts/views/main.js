define([
  'backbone',
  './content'
], function (Backbone, ContentView) {
  
  var View = Backbone.View.extend({

    manage: true,

    template: 'main',

    sections: {
      content: '.content'
    },

    initialize: function () {
      var model = this.model;

      var content = new ContentView({ model: model });

      this.setViews({ 
        content: content
      });

      this.render();
    }

  });

  return View;

});
