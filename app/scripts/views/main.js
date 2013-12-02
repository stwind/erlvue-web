define([
  'backbone',
  './etop',
  './stats',
  './procinfo',
  'models/procs'
], function (Backbone, Etop, Stats, ProcInfo, Procs) {
  
  var View = Backbone.View.extend({

    manage: true,

    template: 'main',

    initialize: function () {
      var model = this.model;

      this.listenTo(model, 'change:node', this.showProcs);
      this.listenTo(model, 'change:proc', this.showProc);
    },

    showProcs: function(model) {
      var procs = model.get('procs');

      var etop = new Etop({ collection: procs }),
          stats = new Stats({ model: model.get('stats') }),
          profInfo = new ProcInfo();

      this.setViews({ 
        '.etop': etop,
        '.stats': stats,
        '.proc-info': profInfo
      }).render();
    },

    showProc: function(_m, proc) {
      var procInfo = this.getView('.proc-info'),
          model = new Procs.Model(proc.attributes, { sync: true });

      procInfo.show(model);
    }

  });

  return View;

});
