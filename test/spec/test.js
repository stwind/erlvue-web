define([
  'test/helpers',
  'squire'
], function(helpers, Squire) {

  var injector = new Squire();

  injector.mock('views/nodeItem', { fuck: 'you' })
          .store('views/nodeItem');

  return helpers.withMocks(injector, [
    'views/content'
  ], function(ContentView) {

    describe('Content View', function () {

      it('should be includable', function() {
        expect(ContentView).to.exist;
      });

      after(function() { injector.clean(); });

    });

  });

});
