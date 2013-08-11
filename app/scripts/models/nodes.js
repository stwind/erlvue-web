define([
  'backbone'
], function(Backbone) {

  var Node = Backbone.Model.extend({
    idAttribute: 'name'
  });

  var Nodes = Backbone.Collection.extend({
    url: '/nodes',

    model: Node
  });

  return {
    Model: Node,
    Collection: Nodes
  };
});
