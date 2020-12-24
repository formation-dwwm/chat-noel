window.addEventListener("load", function () {
    let psdeo = prompt("Saisir votre pseudo :");
    var socket = io();
    const $form = document.querySelector('form');
    const $m = document.querySelector("#m");
    const $psd = psdeo;
    const $messageList = document.querySelector("#messages");

    socket.emit("user join", { username: $psd, avatar: "anon.png" });

    $form.addEventListener("submit", function(e){
      e.preventDefault(); // empeche la page de se recharger
      socket.emit('chat message', { content: $m.value });
      $m.value = "";
      return false;
    });

    // data est un objet avec clefs author et content
    socket.on('chat message', function(data){
      displayChatMessage(data);
    });
    
    // msgs est un string
    socket.on('message bvn', function(msgs){
        displayNotificationMessage(msgs);
    });
    // msgs est un string
    socket.on('message str', function(msgs){
      displayNotificationMessage(msgs);
    });

    // Fonctions d'affichage
    function displayChatMessage(messageData){
        const msg = messageData.author.username + ": " + messageData.content;
      
        const $li = document.createElement('li');
        const $br = document.createElement('br');
        $li.innerText = msg;
        $messageList.appendChild($li);
        $messageList.appendChild($br);
    }

    function displayNotificationMessage(message) {
        const $li = document.createElement('li');
        const $br = document.createElement('br');
        $li.innerText = message;
        $messageList.appendChild($li);
        $messageList.appendChild($br);
    }
});