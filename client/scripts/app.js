var url = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';
var rooms = {};
var roomFilter, refreshPage;
var app = {
  init: function() {   

    $('#main').on('click', '.username', app.handleUsernameClick);

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
      //get the value from the input field
      //add it to the server
      //Add the value to the drop down menu
      //Make the value the selected 
      //should refresh all of the messages for that room
      //should filter the data of that room




      var $addRoomInput = $('#addRoomInput').val();
      roomFilter = $addRoomInput;
      $('#addRoomInput').val('');
      app.send({'roomname': $addRoomInput});
      app.fetch();
      // var $selected = $('.rooms');
      // $($selected).val($addRoomInput).change();

    });
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
        console.log(data);
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
      url: url + '?limit=10&&order=-createdAt',
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        console.log('app.fetch method worked.');
        console.log(data);
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
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });

  },

  // security: function(string) {
  //   if (string)
  // },

  clearMessages: function() {
    $('#chats').empty();
  },

  renderMessage: function(message) {
    // if (message.username.contains('</script>')) {
    //   message.username = 'filter';
    // }
    var $message = $('<div class="messageContainer"><div class= "username"><strong>' + message.username + '</strong>:</div><div class="message"><strong>' + message.text + '</strong></div></div>');   
    $('#chats').append($message);
  },

  renderRoom: function(data) {
    _.filter(data.results, function(obj) {
      if (obj.roomname === roomFilter) {
        app.renderMessage(obj);
      }
    });
    //var $room = $('<div class="testPls">' + message.text + '</div>');
    //$('#roomSelect').append($room);
  },

  handleUsernameClick: function() {
    
  },

  handleSubmit: function() {
    var $message = $('#message').val();
    var $username = $('.userName').text();
    var $roomname = $('.rooms').val();
    var $text = $('#textBox').val();
    console.log($username);

    var submitObject = {
      'username': $username,
      'text': $text,
      'roomname': $roomname
    };
    app.send(submitObject);
    $('#textBox').val('');
  }, 





};

$(document).ready(function( ) {
  app.init();  
  app.fetch();

  
  // displaying username
  var bar = window.location.href.split('?');
  var username = bar[1].split('=')[1];
  //console.log(username);
  $('.userName').text(username);

  //refreshes the page
  refreshPage = function() {
    console.log('refreshed');
    app.fetch(roomFilter);
    setTimeout(refreshPage, 15000);
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


























