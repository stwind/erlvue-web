define([
  'backbone',
  'URIjs/URI'
], function (Backbone, URI) {

  var Proc = Backbone.Model.extend({
    idAttribute: 'pid'
  });

  var Procs = Backbone.Collection.extend({
    model: Proc,

    comparator: function(p1, p2) {
      return p1.get('mem') > p2.get('mem') ? -1 : 1;
    },

    url: function() {
      var path = '/procs/' + URI.encode(this.node);
      var uri = new URI(path).addQuery({ num: this.num });
      return uri.href();
    },

    initialize: function(models, options) {
      var root = this;

      this.node = options.node;
      this.num = options.num || 20;

      root.remoteOn('reset', function(models) {
        root.set(models);
      });
    }

  });

  return {
    Model: Proc,
    Collection: Procs
  };

});
