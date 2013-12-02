define([
  'backbone',
  'underscore',
  'jquery',
  'backgrid'
], function(Backbone, _, $, Backgrid) {

  var Row = Backgrid.Row;

  return Row.extend({

    initialize: function() {
      Row.prototype.initialize.apply(this, arguments);
      this.listenTo(this.model, 'change:selected', this._selected);
    },

    events: {
      'click': 'select'
    },

    select: function() {
      this.model.set('selected', true);
    },

    _selected: function() {
      if (this.model.get('selected')) {
        this.$el.addClass('selected');
      } else {
        this.$el.removeClass('selected');
      }
    },

    render: function() {
      this._selected();

      return Row.prototype.render.apply(this, arguments);
    }
  });

});
