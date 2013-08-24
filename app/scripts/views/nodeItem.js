define([
  'backbone'
], function(Backbone) {

  return Backbone.View.extend({

    template: 'nodeItem',

    initialize: function (options) {
      this.model.on('change', this.update, this);
    },

    update: function() {
      this.render();
    }

  });

});
