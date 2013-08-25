define([
  'test/helpers',
  'backbone',
  'lib/backbone.layout'
], function(helpers, Backbone) {

  var mocks = {
    'views/nodeItem': sinon.stub().returns(Backbone.View)
  };

  return helpers.describeWithMocks('Content View', mocks, [
    'lib/backbone.layout',
    'views/content'
  ], function(Layout, ContentView) {

    var model = new Backbone.Model(),
        collection = new Backbone.Collection();

    collection.iobind = function() { return this; };

    var content = new ContentView({ model: model });

    model.set('current', collection);

    it('should show model\'s current collection', function() {
      expect(content.collection).to.equal(collection);
    });


    it('should render new child', function(done) {
      content.on('addItem', function(view){
        done();
      });
      collection.add([{id: 1}]);
    });

  });

});
