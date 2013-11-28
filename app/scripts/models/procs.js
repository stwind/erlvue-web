define([
  'backbone',
  'URIjs/URI'
], function (Backbone, URI) {

  var Proc = Backbone.Model.extend({
    idAttribute: 'pid'

    //initialize: function(attrs, options) {
      //this.listenTo(this.collection, 'sort', this.updateIndex);
    //},

    //updateIndex: function() {
      //var idx = this.collection.sortedIndex(this, 'mem');

      //this.set('index', idx);

      //return this;
    //}
  });

  var Procs = Backbone.Collection.extend({
    model: Proc,

    comparator: function(p1, p2) {
      return (p2 && p2.get('mem') < p1.get('mem')) ? 1 : -1
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

      root
        .remoteOn('reset', function(ms) { root.set(ms); })
        .remoteOn('add', function(m) { root.add(m); })
        .remoteOn('remove', function(m) { root.remove(m); });
    }

  });

  return {
    Model: Proc,
    Collection: Procs
  };

});
