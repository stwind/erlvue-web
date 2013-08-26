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

    function children() {
      return content.getViews('.container').value();
    }

    it('should show model\'s current collection', function() {
      expect(content.collection).to.equal(collection);
    });


    it('should add child when model was added', function(done) {
      expect(children()).to.be.empty;
      content.on('addItem', function(view){ 
        expect(children()).to.not.be.empty;
        done(); 
      });
      collection.add({id: 1});
    });

    it('should remove child when model was removed', function() {
      expect(children()).to.not.be.empty;
      collection.remove({id: 1});
      expect(children()).to.be.empty;
    });

  });

});
