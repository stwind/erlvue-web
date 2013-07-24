define([
  'router'
], function (Router) {

  var router = new Router();

  var mediator = {

    init: function() {
      var index = router.event.stream('index');
      index.onValues(function (f) {
        console.log(f);
      });
    }

  };

  return mediator;
});
