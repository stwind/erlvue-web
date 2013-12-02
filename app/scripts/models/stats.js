define([
  'backbone',
  'underscore',
  'URIjs/URI'
], function (Backbone, _, URI) {

  return Backbone.Model.extend({

    url: function() {
      var path = '/stats/' + URI.encode(this.get("node"));
      return new URI(path).href();
    },

    initialize: function(attrs, options) {
      var self = this;

      this
        .remoteOn("update", function(data) {
          self.set(self.parse(data), options);
        })
        .fetch();
    },

    parse: function(resp, options) {
      var mem = resp.memory;
      return _.extend(_.omit(resp, 'memory'), {
        mem_total: mem.total,
        mem_atom: mem.atom,
        mem_bin: mem.binary,
        mem_code: mem.code,
        mem_ets: mem.ets,
        mem_proc: mem.processes
      });
    }

  });

});
