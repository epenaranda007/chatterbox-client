var url = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';
var rooms = {};
var roomFilter, refreshPage;
var friends = {};
var app = {
  init: function() {   
    $('#chats').on('click', '.username', function() {
      $(this).addClass('friend');
      var temp = $(this).text();
      var username = temp.substring(0, temp.length - 1);
      friends[username] = username;

    });

    $('#send').on('click', '.submit', app.handleSubmit);

    //change username
    $('.userNameContainer').on('click', '.userName', function() {
      var $inputField = $('<input type="text" class="userNameInput">');
      $('.userName').remove();
      $('.userNameContainer').append($inputField);
    });
     
    $('.userNameContainer').on('keypress', '.userNameInput', function(event) {
      // 13 means enter key
      if (event.which === 13) {
        var $username = $('<div class="userName">' + $('.userNameInput').val() + '</div>');
        $('.userNameInput').remove();
        $('.userNameContainer').append($username);
      }
    });

    $('.rooms').change(function() {
      var $selectedRoom = $('.rooms').val();
      roomFilter = $selectedRoom;
      app.fetch();
    });
    
    $('#roomSelect').on('click', function() {

      var $addRoomInput = $('#addRoomInput').val();
      roomFilter = $addRoomInput;
      $('#addRoomInput').val('');
      app.send({'roomname': $addRoomInput});
      app.fetch();
    });



  },

  send: function(message) {
    $.ajax({
      url: url,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },

  fetch: function() {

    $.ajax({
      url: url + '?limit=20&&order=-createdAt',
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        app.clearMessages();
        if (roomFilter) { 
          app.renderRoom(data);
        } else {
          _.each(data.results, function(obj) {
            rooms[obj.roomname] = obj.roomname;
            app.renderMessage(obj);
          });
        }
        reloadRoomsOption();
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });

  },

  hasEscapeCharacters: function(string) {
    var pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/); 
    if (pattern.test(string)) {
      return true;
    }
    return false;
  },

  clearMessages: function() {
    $('#chats').empty();
  },

  renderMessage: function(message) {

    var $message;
    if (!app.hasEscapeCharacters(message.username) && 
        !app.hasEscapeCharacters(message.text) &&
        message.username && message.text) {
      if (friends[message.username]) { 
        $message = $('<div class="messageContainer"><div class="username"><strong>' + message.username + '</strong>:</div><div class="message">' + message.text + '</div></div>');
      } else {
        $message = $('<div class="messageContainer"><div class="username">' + message.username + ':</div><div class="message">' + message.text + '</div></div>'); 
      } 
      $('#chats').append($message); 
    }
  },

  renderRoom: function(data) {
    _.filter(data.results, function(obj) {
      if (obj.roomname === roomFilter) {
        app.renderMessage(obj);
      }
    });
  },


  handleSubmit: function() {
    var $message = $('#message').val();
    var $username = $('.userName').text();
    var $roomname = $('.rooms').val();
    var $text = $('#textBox').val();

    var submitObject = {
      'username': $username,
      'text': $text,
      'roomname': $roomname
    };
    app.send(submitObject);
    $('#textBox').val('');
    app.fetch();
  }, 

};

$(document).ready(function( ) {
  app.init();  
  app.fetch();

  
  // displaying username
  var bar = window.location.href.split('?');
  var username = bar[1].split('=')[1];
  $('.userName').text(username);

  //refreshes the page
  refreshPage = function() {
    console.log('refreshed');
    app.fetch(roomFilter);
    setTimeout(refreshPage, 5000);
  };
  refreshPage();

});

var reloadRoomsOption = function() {
  $('.rooms').empty();
  for (var key in rooms) { 
    var $room = $('<option>', {value: key, text: key});
    $('.rooms').append($room);
  }
  if (roomFilter) { 
    $('.rooms').val(roomFilter);
  }
};


























