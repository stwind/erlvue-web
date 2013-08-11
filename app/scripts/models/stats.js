define([
  'backbone'
], function (Backbone) {

  var Stats = Backbone.Model.extend({

    urlRoot: '/stats'

  });

  return Stats;

});
