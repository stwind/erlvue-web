define([
  'backbone',
  './etop',
  './stats'
], function (Backbone, Etop, Stats) {
  
  var View = Backbone.View.extend({

    manage: true,

    template: 'main',

    initialize: function () {
      var model = this.model,
          self = this;

      this.listenTo(model, 'change:node', this.showProcs);

      this.$el.addClass("grid");
    },

    showProcs: function(model) {
      var etop = new Etop({ procs: model.get('procs')}),
          stats = new Stats({ model: model.get('stats') });

      this.setViews({ 
        '.etop': etop,
        '.stats': stats
      }).render();
    }

  });

  return View;

});
