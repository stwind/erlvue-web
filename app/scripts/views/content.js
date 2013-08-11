define([
  'backbone'
], function (Backbone) {

  var View = Backbone.View.extend({

    template: 'content',

    initialize: function (options) {
      this.model.on('change:current', this.show, this);
    },

    show: function (model, procs) {
      this.collection = procs;
      this.collection.iobind();
      this.collection.on('add', this.addProc, this);
      this.collection.on('remove', this.removeProc, this);
    },

    addProc: function (proc) {
      console.log("shit added");
    },

    removeProc: function (proc) {
      console.log("shit removed");
    }

  });

  return View;

});
