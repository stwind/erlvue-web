define([
  'backbone',
  './etop',
  './stats',
  './procinfo'
], function (Backbone, Etop, Stats, ProcInfo) {
  
  var View = Backbone.View.extend({

    manage: true,

    template: 'main',

    initialize: function () {
      var model = this.model;

      this.listenTo(model, 'change:node', this.showProcs);

      this.$el.addClass("grid");
    },

    showProcs: function(model) {
      var procs = model.get('procs');

      var etop = new Etop({ collection: procs }),
          stats = new Stats({ model: model.get('stats') }),
          profInfo = new ProcInfo({ model: model.get('stats') });

      this.setViews({ 
        '.etop': etop,
        '.stats': stats,
        '.proc-info': profInfo
      }).render();
    }

  });

  return View;

});
