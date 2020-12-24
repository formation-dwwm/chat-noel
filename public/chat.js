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
        appendHTML(`
            <li>
                <span style="font-weight: bold">${messageData.author.username}</span>
                ${messageData.content}
            </li>
        `);
    }

    function displayNotificationMessage(message) {
        appendHTML(`
            <li>
                ${message}
            </li>
        `);
    }

    function appendHTML(html){
        const $dummyEl = document.createElement("div");
        $dummyEl.innerHTML = html;
        for(let $child of $dummyEl.children){
            $messageList.appendChild($child);
        }
    }
});