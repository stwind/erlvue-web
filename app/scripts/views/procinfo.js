define([
  'backbone'
], function(Backbone) {

  return Backbone.View.extend({

    manage: true,

    template: 'procinfo',

    bindings: {
      '.proc-pid': 'pid',
      '.proc-name': 'name',
      '.proc-mem': 'mem',
      '.proc-reds': 'reds'
    },

    afterRender: function() {
      this.stickit();
    }

  });

});
