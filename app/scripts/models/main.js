define([
  'backbone',
  './nodes',
  './procs',
  './stats'
], function (Backbone, Nodes, Procs, Stats) {
  
  return Backbone.Model.extend({

    initialize: function () {
      var nodes = new Nodes.Collection(),
          model = this;

      this.set('nodes', nodes);

      nodes.fetch().then(function(){
        model.selectNode(nodes.at(0).id);
      });
    },

    selectNode: function (name) {
      var procs = this.get('procs'),
          stats = this.get("stats"),
          self = this;

      if (!procs || (procs.node != name)) {
        var collection = new Procs.Collection(null, { node: name });
        this.set('procs', collection);

        this.listenTo(collection, 'change:selected', function(model, val) {
          val && self.set('proc', model);
        });
      }

      if (!stats || (stats.node != name)) {
        this.set('stats', new Stats({ node: name }));
      }

      this.set('node', name);

      return this;
    },

    selectProc: function(id) {
      var proc = this.get('procs').selectProc(id);
      proc && this.set('proc', proc);
      return this;
    }

  });

});
