define([
  'backbone',
  './nodes',
  './procs',
  './stats'
], function (Backbone, Nodes, Procs, Stats) {
  
  var Model = Backbone.Model.extend({

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
          stats = this.get("stats");

      if (!procs || (procs.node != name)) {
        this.set('procs', new Procs.Collection(null, { node: name }));
      }

      if (!stats || (stats.node != name)) {
        this.set('stats', new Stats({ node: name }));
      }

      this.set('node', name);
    }

  });

  return Model;

});
