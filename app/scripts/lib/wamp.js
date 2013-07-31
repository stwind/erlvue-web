define([
  'sockjs',
  'jquery',
  'underscore',
  'bacon'
], function (SockJS, $, _, Bacon) {

  function genCallId () {
    return Math.random().toString(36).substr(2, 9);
  };

  var parse = {
    0: function (sessionId, proto, server) {
      return { type: 'welcome', sessionId: sessionId, proto: proto, server: server };
    },
    3: function (callId, result) {
      return { type: 'callresult', callId: callId, result: result };
    },
    4: function (callId, uri, desc, detail) {
      return { type: 'callerror', callId: callId, uri: uri, desc: desc, detail: detail };
    },
    8: function (topic, event) {
      return { type: 'event', topic: topic, event: event };
    }
  };

  function msgBus () {
    var bus = new Bacon.Bus();

    return {
      callresult: function (callId) {
        return bus.filter(function (msg) {
          return msg.type == 'callresult' && msg.callId == callId;
        }).map('.result');
      },
      callerror: function (callId) {
        return bus.filter(function (msg) {
          return msg.type == 'callerror' && msg.callId == callId;
        }).map(function (error) {
          return _.pick(error, 'desc', 'detail');
        });
      },
      event: function (topic) {
        return bus.filter(function (msg) {
          return msg.type == 'event' && msg.topic == topic;
        });
      },
      push: function (data) {
        var msg = parse[data[0]].apply(null, data.slice(1));
        bus.push(msg);
      },
      end: function () {
        return bus.end();
      }
    };
  };

  var wampMsg = {
    call: function (callId, uri, args) {
      return JSON.stringify([2, callId, uri].concat(args));
    },
    sub: function (topic) {
      return JSON.stringify([5, topic]);
    },
    unsub: function (topic) {
      return JSON.stringify([6, topic]);
    },
    publish: function (topic, event, exclude, eligible) {
      return JSON.stringify([7, topic, event, exclude, eligible]);
    }
  };

  var Session = function (socket, bus) {
    this.socket = socket;
    this.bus = bus;
  };

  Session.prototype.call = function (uri) {
    var dfd = $.Deferred(),
        args = _.toArray(arguments).slice(1),
        callId = genCallId();

    this.socket.send(wampMsg.call(callId, uri, args));

    this.bus.callresult(callId).onValue(dfd.resolve);
    this.bus.callerror(callId).onValue(dfd.reject);

    return dfd;
  };

  Session.prototype.subscribe = function (topic, callback) {
    var topics = this.topics = this.topics || [], 
        stream = topics[topic] = this.bus.event(topic);

    stream.onValue(function (event) { callback(topic, event); });

    this.socket.send(wampMsg.sub(topic));
  };

  Session.prototype.unsubscribe = function (topic) {
    var topics = this.topics = this.topics || [];

    topics[topic] && topics[topic].end();

    this.socket.send(wampMsg.unsub(topic));
  };

  Session.prototype.publish = function (topic, event, exclude, elibigle) {
    var msg = wampMsg.publish(topic, event, !!exclude, elibigle || []);
    this.socket.send(msg);
  };

  var Wamp = {

    connect: function (url, opts) {

      var socket = new SockJS(url), bus = msgBus(),
          session = new Session(socket, bus),
          dfd = $.Deferred();

      socket.onopen = function() {
        console.log(' [*] Connected (using: '+socket.protocol+')');

        dfd.resolve(session);
      };

      socket.onclose = function(e) {
        console.log(' [*] Disconnected ('+e.status + ' ' + e.reason+ ')');

        bus.end();
      };

      socket.onmessage = function(e) {
        bus.push(JSON.parse(e.data));
      };

      return dfd;
    }

  };

  return Wamp;

});
