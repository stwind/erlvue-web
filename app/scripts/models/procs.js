define([
  'backbone',
  'URIjs/URI'
], function (Backbone, URI) {

  var Proc = Backbone.Model.extend({
    idAttribute: 'pid',

    url: function() {
      var path = '/proc/' + URI.encode(this.get('node')) + 
                 '/' + URI.encode(this.id);
      return new URI(path).href();
    },

    initialize: function(attrs, options) {

      var options = _.defaults(options || {}, { sync: false });
      if (options.sync) this.remoteSync();
    },

    remoteSync: function() {
      var self = this;

      this
        .remoteOn('update', function(data) { self.set(data); })
        .fetch();
    }

  });

  var Procs = Backbone.Collection.extend({
    model: Proc,

    comparator: function(p1, p2) {
      return (p2 && p2.get('mem') > p1.get('mem')) ? 1 : -1
    },

    url: function() {
      var path = '/procs/' + URI.encode(this.node);
      var uri = new URI(path).addQuery({ num: this.num });
      return uri.href();
    },

    initialize: function(models, options) {
      var self = this;

      this.node = options.node;
      this.num = options.num || 20;

      this
        .remoteOn('reset', function(ms) { self.set(ms); })
        .remoteOn('add', function(m) { self.add(m); })
        .remoteOn('remove', function(m) { self.remove(m); })
        .on('change:selected', this._modelSelected)
        .fetch();
    },

    selectProc: function(id) {
      var proc = this.get(id);
      return proc ? proc.set('selected', true) : proc;
    },

    _modelSelected: function(model, val) {
      if (val) {
        this.each(function(m) {
          if (m.id != model.id) {
            m.set('selected', false);
          }
        });
      }
    }

  });

  return {
    Model: Proc,
    Collection: Procs
  };

});
