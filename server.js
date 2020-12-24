const express = require('express');
let app = express();
let http = require('http').createServer(app);
let io = require('socket.io')(http);


app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
    console.log('connected');

    const user = {
      username: "Anon",
      avatar: "anon.png",
    };

    socket.on("user join", data => {
      user.username = data.username;
      user.avatar = data.avatar;
      socket.broadcast.emit("message bvn", user.username + " s'est connecté");
      console.log("message bvn", user.username + " s'est connecté");
    });
    

    socket.on('chat message', (data) => {
      console.log('message: ' + data.content);
      io.emit('chat message', { author: user, content: data.content });
    });
    
    socket.on('disconnect', () => {
      console.log(' disconnected');

      socket.broadcast.emit("message str", user.username + " s'est déconnecté");
      console.log("message str", user.username + " s'est déconnecté");
    });
      
  });

http.listen(3000, () => {
    console.log('écoute sur *: 3000'); 
});
