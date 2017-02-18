var url = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';
var app = {
  init: function() {   
    $('.submit').on('click', function( ) {
      var $chats = $('#chats');
      var $text = $('#textBox').val();
      var $message = $('<div><p>' + $text + '</p></div>');
      $($chats).append($message);
    });

    $('#main').on('click', '.username', this.handleUsernameClick);

    $('#send').on('click', '.submit', this.handleSubmit);
     
  
  },

  send: function(message) {
    $.ajax({
  // This is the url you should use to communicate with the parse API server.
      url: url,
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

  fetch: function() {

    $.ajax({
  // This is the url you should use to communicate with the parse API server.
      url: url + '?limit=500&&order=createdAt',
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        console.log('app.fetch method worked.');
        console.log(data);
        app.clearMessages;
        _.each(data.results, function(obj) {
          app.renderMessage(obj);
        });

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
    var $message = $('<div class="messageContainer"><div class= "username"><strong>' + message.username + '</strong>:</div><div class="message">' + message.text + '</div></div>');
    $('#chats').prepend($message);
  },

  renderRoom: function(room) {
    var $room = $('<div class="testPls">' + message.text + '</div>');
    $('#roomSelect').append($room);
  },

  handleUsernameClick: function() {
    
  },

  handleSubmit: function() {
    var $message = $('#message').val();
    // this.send($message);
    console.log('trigger');
  }, 





};

$(document).ready(function( ) {
  app.init();  
  app.fetch();
  // refreshPage();
  // var refreshPage = function() {
  //   console.log('refreshed');
  //   app.fetch();
  //   setTimeout(refreshPage, 5000);
  // };
  
  

});

























