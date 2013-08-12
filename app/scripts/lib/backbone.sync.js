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

          options = options ? _.clone(options) : {};

          var url = _.result(this, 'url') || urlError();
          var object = this;

          this.isSyncing = true;

          session.subscribe(url, function(data) {
            if (object instanceof Backbone.Model) {
              if (object.set(object.parse(resp, options), options)) {
                object.trigger('sync', object, data, options);
              }
            } else if (object instanceof Backbone.Collection) {
              var method = options.reset ? 'reset' : 'set';
              object[method](data, options);
              object.trigger('sync', object, data, options);
            }
          });

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
