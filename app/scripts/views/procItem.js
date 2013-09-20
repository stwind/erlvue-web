define([
  'backbone'
], function(Backbone) {

  return Backbone.View.extend({

    manage: true,

    template: 'procItem',

    className: 'proc',

    bindings: {
      '.proc-pid': 'pid',
      '.proc-name': 'name',
      '.proc-mem': 'mem',
      '.proc-reds': 'reds',
      ':el': {
        observe: 'index',
        //onGet: function(idx) { return idx * this.options.factor; },
        update: function($el, val) {
          var height = $el.height();
          $el.css({ top: val * height }, 800);
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
