define([
  'backbone',
  'underscore',
  'jquery'
], function (Backbone, _, $) {

  return Backbone.View.extend({
    manage: true,

    template: 'stats',

    bindings: {
      '.node .val': 'node',
      '.proc-count .val': 'proc_count',
      '.mem-total .val': 'mem_total',
      '.runq .val': 'run_queue',
      '.reds .val': 'reductions'
    },

    afterRender: function() {
      this.stickit();
    }

  });

});
