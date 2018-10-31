// SERVER-SIDE

var io = require('socket.io')(); // server-side socket.io server

// LISTEN for messages ('socket' = param that represents 'client' that is connecting)
io.on('connection', function(socket){ // callback runs whenever a client connects to server
    socket.on('add-circle', function(data) { // for this client connecting @ this point in time, we're now listening to 'add-circle' from them (data), then run cb
        io.emit('add-circle', data); // forwards the message (data) to EVERYONE that's connected
    });
    // added this to get the 'clear' functionality sent to BOTH
    socket.on('clear-display', function() { // NO PARAM b/c no data being sent
        io.emit('clear-display');
    });
});

module.exports = io;

// BIG PICTURE:
    // 1) CLIENT: click handler (client clicks > sends 'clear display' message)
    // 2) SERVER: listens for 'click' (aka 'clear display' message)
    // 3) SERVER: emits 'clear display' message to client 
    // 4) CLIENT: listens for 'clear display' (from server) & runs the cb function > clears innerHTML