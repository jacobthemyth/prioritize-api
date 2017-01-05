// for phoenix_html support, including form and button helpers
// copy the following scripts into your javascript bundle:
// * https://raw.githubusercontent.com/phoenixframework/phoenix_html/v2.3.0/priv/static/phoenix_html.js
//

var pushButton = document.getElementById('push');

window.socket = new Phoenix.Socket("/socket", {params: {userToken: '123'}});
socket.connect();
var channel = socket.channel('rooms:lobby', {});

channel.on('pong', function(payload) { console.log('got a pong:', payload) });

pushButton.onclick = function() { channel.push('ping', {body: 'data'}) };

channel.join()
  .receive('ok', function(resp) { console.log('got an OK response', resp) })
  .receive('error', function(resp) { console.log('got an error response', resp) });

// ***********

var newTopicText = document.getElementById('newtopic');
var submitButton = document.getElementById('submitnewtopic');

var topicsChannel = socket.channel('topics:suggest', {});
// var rankChannel = socket.channel('topics:rank', {});
// var discussChannel = socket.channel('topics:discuss', {});

submitButton.onclick = function() {
  topicsChannel.push('addTopic', {
    body: newTopicText.value
  });
};

topicsChannel.on('newTopic', function(payload) {
  console.log('someone created a new topic:', payload);
});

topicsChannel.join()
  .receive('ok', function(resp) { console.log('got an OK response', resp) })
  .receive('error', function(resp) { console.log('got an error response', resp) });
