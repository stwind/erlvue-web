define([
  'backbone'
], function(Backbone) {

  return Backbone.View.extend({

    template: 'nodeItem',

    bindings: {
      '.node-item-pid': 'pid',
      '.node-item-name': 'name',
      '.node-item-mem': 'mem',
      '.node-item-reds': 'reds'
    },

    afterRender: function() {
      this.stickit();
    }

  });

});
