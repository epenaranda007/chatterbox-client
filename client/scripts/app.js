var app = {
  init: function() {   
    
    // $('.submit').on('click', function( ) {
    //   // debugger;
    //   var $chats = $('#chats');
    //   var $text = $('#textBox').val();
    //   var $message = $('<div><p>' + $text + '</p></div>');
    //   $($chats).append($message);
    // });

    $('#main').on('click', '.username', this.handleUsernameClick);

    // $('#send').on('click', '.submit', this.handleSubmit);
    $('#send .submit').on('click', this.handleSubmit);

  },

  send: function(message) {
    $.ajax({
  // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('app.send method worked.');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },

  fetch: function(message) {
    $.ajax({
  // This is the url you should use to communicate with the parse API server.
      //url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
      type: 'GET',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('app.fetch method worked.');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },

  clearMessages: function() {
    $('#chats').empty();
  },

  renderMessage: function(message) {
    var $message = $('<div class="messageContainer"><div class= "username">' + message.username + '</div><div class="message">' + message.text + '</div></div>');
    $('#chats').append($message);
  },

  renderRoom: function(room) {
    var $room = $('<div class="testPls">' + message.text + '</div>');
    $('#roomSelect').append($room);
  },

  handleUsernameClick: function() {
  
  },

  handleSubmit: function() {
    var $message = $('#message').val();
    this.send(message);
    console.log('handleSubmit');
  }


};

$(document).ready(function( ) {
  app.init();    
});

// var User = function() {
//   this.username = '';
//   this.friends = {};
// };

// var Room = function() {

// };
























