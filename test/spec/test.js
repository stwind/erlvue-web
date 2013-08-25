define([
  'templates',
  'views/content'
], function(JST, Content) {

  describe('Content View', function () {

    it('should be includable', function () {

      expect(Content).to.exist;
      expect(JST).to.exist;

    });

  });

});
