/*global define */
define([
  'mediator'
], function (mediator) {
  'use strict';

  mediator.init();

  Backbone.history.start({ pushState: true, root: '/' });

  return 'hoho';
});
