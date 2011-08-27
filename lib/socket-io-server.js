module.exports = function Server(expressInstance, sessionStore) {
	var parseCookie = require('connect').utils.parseCookie;
	var io = require('socket.io').listen(expressInstance);
  var bindings = {};

	io.configure(function () {
		io.set('log level', 0);
	});

	io.set('authorization', function(handshakeData, ack) {
		var cookies = parseCookie(handshakeData.headers.cookie);
		sessionStore.get(cookies['connect.sid'], function(err, sessionData) {
			handshakeData.session = sessionData || {};
			handshakeData.sid = cookies['connect.sid']|| null;
			ack(err, err ? false : true);
		});
	});

	io.sockets.on('connection', function(client) {
		var user = client.handshake.session.user ? client.handshake.session.user.name : 'UID: '+(client.handshake.session.uid || 'has no UID');

		client.join(client.handshake.sid);

		client.on('deck-identify', function(msg) {
      bindings[msg.id] = {slides:client}
      console.log("connected slides for " + msg.id);
		});
    client.on('remote-identify', function(slideData){
      console.log("connected remote for " + slideData.id);
      bindings[slideData.id].remote = client;
      client.on('next', function(){
        console.log('remote sent next');
        bindings[slideData.id].slides.emit('next');
      });
      client.on('prev', function(){
        bindings[slideData.id].slides.emit('prev');
      });
      
    });

		client.on('disconnect', function() { console.log('disconnect'); });
	});

	io.sockets.on('error', function(){ console.log(arguments); });

	return io;
};

function sendMessage(number, message){
  var smsified = require ('smsified');

  var sms = new SMSified('jamescarr', 'tekblade99');

  var options = {senderAddress: '2892050108', address: number, message: message};
  sms.sendMessage(options, function(result) {
    console.log(result)
  });

}
