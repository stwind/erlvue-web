define([
  'backbone'
], function (Backbone) {

  return {
    init: function (session) {

      _.each([Backbone.Model, Backbone.Collection], function (Proto) {

        _.extend(Proto, {

          iobind: function (options) {
            if (!this.isSyncing) {
              var url = _.result(this, 'url') || urlError();

              this.isSyncing = true;

              session.subscribe(url, function(data) {
                if (this instanceof Backbone.Model) {
                  this.set(this.parse(data, options), options);
                } else if (this instanceof Backbone.Collection) {
                  this.set(data, options);
                }
              }, this);
            }

            return this;
          },

          iostop:  function (options) {
            if (this.isSyncing) {
              var url = _.result(this, 'url') || urlError();
              session.unsubscribe(url);
            }

            return this;
          }

        });

      });

      Backbone.sync = function (method, model, options) {
        var url = _.result(model, 'url') || urlError(),
            data = model.toJSON();

        return session.call(url, method, data).then(function (result) {
          options.success(result);
        });
      }
    }
  };
  
});
