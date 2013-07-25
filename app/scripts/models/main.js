define([
  'backbone'
], function (Backbone) {
  
  var Model = Backbone.Model.extend({

    defaults: {
      name: 'I am app model'
    }

  });

  return Model;

});
