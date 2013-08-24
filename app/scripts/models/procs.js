define([
  'backbone',
  'underscore.string'
], function (Backbone, _s) {

  var Proc = Backbone.Model.extend({
    idAttribute: 'pid'
  });

  var Procs = Backbone.Collection.extend({
    model: Proc,

    comparator: 'mem',

    url: function() {
      return '/procs/' + encodeURIComponent(this.node);
    },

    initialize: function(models, options) {
      this.node = options.node;
    }

  });

  return {
    Model: Proc,
    Collection: Procs
  };

});
