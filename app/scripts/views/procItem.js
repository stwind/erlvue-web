define([
  'backbone'
], function(Backbone) {

  return Backbone.View.extend({

    template: 'procItem',

    className: 'proc',

    bindings: {
      '.proc-pid': 'pid',
      '.proc-name': 'name',
      '.proc-mem': 'mem',
      '.proc-reds': 'reds',
      ':el': {
        observe: 'index',
        onGet: function(idx) { return idx * 50; },
        update: function($el, val) {
          $el.css({ top: val + 'px' });
        }
      }
    },

    afterRender: function() {
      this.stickit();
    },

    toState: function(state) {
      this.$el
        .removeClass('proc-entering proc-exiting')
        .addClass('proc-' + state);

      return this;
    }

  });

});
