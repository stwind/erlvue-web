define([
  'squire',
  'jquery',
  'underscore'
], function(Squire, $, _) {

  var helpers = {
    describeWithMocks: function (topic, mocks, deps, callback) {
      var def = $.Deferred(),
          injector = new Squire();

      injector
        .mock(mocks)
        .store(_.keys(mocks))
        .require(deps, function() {
          var args = arguments;

          describe(topic, function() {
            callback.apply(null, args);
            after(function() { injector.clean(); });
          });

          def.resolve();
        });

      return def;
    }
  };

  return helpers;

});
