define([
  'backbone',
  'underscore',
  'URIjs/URI'
], function (Backbone, _, URI) {

  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };

  return {
    init: function (session, opts) {
      var opts = _.defaults(opts || {}, {
        topic: function(model, name) {
          var url = _.result(model, 'url') || urlError();

          return new URI(url).path() + '?type=' + name;
        }
      });

      var io = {
        remoteOn: function (name, callback, context) {
          var object = this, topic = opts.topic(object, name);

          session.on(topic, function(data) {
            object.trigger(topic, data, object);
          });

          this.on(topic, callback, context);

          return this;
        },

        remoteOff: function (name, callback, context) {
          var topic = opts.topic(this, name);

          this.off(topic, callback, context);

          if (!this._events[topic]) session.off(topic); 

          return this;
        }
      };

      _.extend(Backbone.Model.prototype, io);
      _.extend(Backbone.Collection.prototype, io);

      Backbone.sync = function (method, model, options) {
        var url = _.result(model, 'url') || urlError(),
            data = options.attrs || model.toJSON(options),
            args = method == 'create' || method == 'update' || method == 'patch' ? 
              [url, method, data] : [url, method];

        return session.call.apply(session, args).then(options.success);
      }
    }
  };
  
});
