define([
  'jquery'
], function($) {

  var helpers = {
    withMocks: function (injector, deps, callback) {
      var def = $.Deferred();

      injector.require(deps, function() {
        callback.apply(null, arguments);
        def.resolve();
      });

      return def;
    }
  };

  return helpers;

});
