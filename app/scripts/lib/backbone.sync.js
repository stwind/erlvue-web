define([
  'backbone'
], function (Backbone) {

  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };

  return {
    init: function (session) {

      var io = {
        iobind: function iobind (options) {
          if (this.isSyncing) return this;

          var url = _.result(this, 'url') || urlError();

          this.isSyncing = true;

          session.subscribe(url, function(data) {
            if (this instanceof Backbone.Model) {
              this.set(this.parse(data, options), options);
            } else if (this instanceof Backbone.Collection) {
              this.set(data, options);
            }
          }, this);

          return this;
        },

        iostop: function iostop (options) {
          if (!this.isSyncing) return this;

          var url = _.result(this, 'url') || urlError();
          session.unsubscribe(url);
          this.isSyncing = false;

          return this;
        }
      };

      _.extend(Backbone.Model.prototype, io);
      _.extend(Backbone.Collection.prototype, io);

      Backbone.sync = function (method, model, options) {
        var url = _.result(model, 'url') || urlError(),
            data = model.toJSON(),
            args = method == 'create' || method == 'update' ? 
              [url, method, data] : [url, method];

        return session.call.apply(session, args).then(options.success);
      }
    }
  };
  
});
