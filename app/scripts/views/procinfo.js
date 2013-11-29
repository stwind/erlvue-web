define([
  'backbone'
], function(Backbone) {

  return Backbone.View.extend({

    manage: true,

    template: 'procinfo',

    bindings: {
      '.mem .val': 'mem',
      '.regname .val': 'name',
      '.init-call .val': 'initial_call',
      '.current-call .val': 'cf',
      '.msgq .val': 'mq',
      '.reds .val': 'reds',
      '.status .val': 'status',
      '.group-leader .val': 'group_leader',
    },

    show: function(model) {
      this.model = model;

      this.render();
    },

    afterRender: function() {
      if (this.model) {
        this.stickit();
      }
    }

  });

});
