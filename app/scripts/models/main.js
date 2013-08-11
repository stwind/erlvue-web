define([
  'backbone',
  './nodes',
  './procs'
], function (Backbone, Nodes, Procs) {
  
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
      var current = this.get('current');
      if (!current || (current.node != name)) {
        var collection = new Procs.Collection(null, { node: name });
        this.set('current', collection);
      }
    }

  });

  return Model;

});
