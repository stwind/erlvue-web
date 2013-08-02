define([
  'backbone'
], function (Backbone) {
  
  var Model = Backbone.Model.extend({

    url: '/',

    defaults: {
      name: 'I am app model'
    }

  });

  return Model;

});
