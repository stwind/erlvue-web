define([
  'backbone',
  'underscore.string'
], function (Backbone, _s) {

  var Proc = Backbone.Model.extend({
    idAttribute: 'pid'
  });

  var Procs = Backbone.Collection.extend({
    model: Proc,

    comparator: function(p1, p2) {
      if (p1.get('mem') > p2.get('mem')) {
        return -1;
      } else {
        return 1;
      }
    },

    url: function() {
      return '/procs/' + encodeURIComponent(this.node);
    },

    initialize: function(models, options) {
      this.node = options.node;
      this.iobind();
    }

  });

  return {
    Model: Proc,
    Collection: Procs
  };

});
