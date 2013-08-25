define([
  'test/helpers'
], function(helpers) {

  var mocks = {
    'views/nodeItem': {
      fuck: 'you'
    }
  };

  return helpers.describeWithMocks('Content View', mocks, [
    'views/content'
  ], function(ContentView) {

    it('should be includable', function() {
      expect(ContentView).to.exist;
    });

  });

});
