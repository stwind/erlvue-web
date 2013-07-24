define([
  'bacon',
  'underscore'
], function(Bacon, _) {

  var Event = {

    stream: function(object) {

      return {

        trigger: _.bind(object.trigger, object),

        stream: function(name) {
          var bus = new Bacon.Bus();
          object.on(name, function() {
            bus.push(_.toArray(arguments));
          });
          return bus;
        }

      };
    }

  };

  return Event;
});
