// esse codigo é o script do index.html, eu so tirei ele do html para testar se rodaria como node e eu pudesse dar require
//oq não deu certo mas pelo menos é facil de ler assim

var serverid; 
var contador = 0;

function alterarIcone (url)
{
    let link = document.querySelector("link[rel='icon']") || document.createElement("link");
    link.rel = "icon";
    link.href = url;
    document.head.appendChild(link);
}

function scrollar ()
{
      window.scrollTo(0, document.body.scrollHeight);
}

var estah_em_server_vazio = false;

function atualizar()
{
  function update(elemento, conteudo)
  {
      let label = document.getElementById(elemento);
      if (conteudo) label.innerHTML = conteudo;
  }
  
  fetch('./data/servers.json')
    .then(response => response.json())
    .then(data => {
      let server = data[JSON.stringify(serverid)]
      
      if (server == undefined)
      {
        estah_em_server_vazio = true;
        
        console.log ("Servidor não claimado encontrado");
        
        update ("chat", localStorage.getItem ("chat"));
        update ("autoria", "ninguém, mande uma mensagem para tomar posse deste chat!");
        
        exibir_alerta_info ("Mande uma mensagem para conjurá-lo a existência!", "Este chat não existe.");
      }
      else
      {        
        //definindo nome do server
        update("chat",  server.name);

        //definindo nome do criador
        update("autoria",  server.owner);

        // criando o chat 
        var msgs ="";
        //var atualizou = false;

        //if (0 < Object.keys(server.messages).length) atualizou = true;

        for(let i = 0; i < Object.keys(server.messages).length; i++)
        {
          msgs +=`
          <div class="textual" style="display: flex; ">
            <img class="user-image" src="${ server.messages[JSON.stringify(i)].avatar}" style="height: 90px; width: 90px; border-radius: 50px;  align-self: left;">
            <div style="display: inline; width: 100%; padding-left: 10px;">
              <h1 class="user-name" style="display: inline;"> ${ server.messages[JSON.stringify(i)].username}</h1> <span class="datahora" style="align-text: right; display: inline; float: right; top: 5px; right: 5px;">${server.messages[JSON.stringify(i)].date} as ${server.messages[JSON.stringify(i)].time}</span>
              <p style="display: block;"> ${ server.messages[JSON.stringify(i)].text}</p>
            </div>
          </div>
          <br class="break-message">
          `
        }

        /*if (atualizou)*/ setTimeout (scrollar, 500);

        update("tempchat", msgs); // era tempchat, coloquei coloque-aqui. Nâo funcionou
      }
    })
    .catch(error => console.error('Erro ao carregar o JSON:', error));
    console.log(contador++ + "ticks");
    
}

fetch('./data/servers.json')
    .then(response => response.json())
    .then(data => {
      for(let i = 0; i < Object.keys(data).length; i++){
        if(data[i].name.toLowerCase() == localStorage.getItem("chat").toLowerCase()){
          serverid = i
        } 
      }
    })
    .catch(error => console.error('Erro ao carregar o JSON:', error));
atualizar();

//eu so existo para limpar tua mensagem
const form = document.getElementById('enviar');
form.addEventListener('submit', function (event) {
  setTimeout(() => {
    document.getElementById('mensagem-f').value = '';
  }, 100);
});

//o bglh que recebe a mensagegm
const socket = io();
socket.on('novaMensagem', (mensagem) => {
  if (serverid== mensagem.server) // adiciona aqui a verificação se é o server ILBACK
  {
    const chat = document.getElementById('tempchat');
    const novoElemento = document.createElement('div');
    novoElemento.className = 'textual';
    novoElemento.style.display = 'flex';
    novoElemento.style.marginBottom = '20px';
    novoElemento.innerHTML = `
        <img src="${mensagem.avatar}" style="height: 90px; width: 90px; border-radius: 50px; align-self: left;">
        <div style="display: inline; width: 100%; padding-left: 10px;">
          <h1 style="display: inline;">${mensagem.username}</h1> 
          <span class="datahora" style="align-text: right; display: inline; float: right; top: 5px; right: 5px;">${mensagem.date} às ${mensagem.time}</span>
          <p style="display: block;">${mensagem.text}</p>
        </div>
      `;
    chat.appendChild(novoElemento);
    chat.appendChild(document.createElement('br'));

    if (document.visibilityState === 'hidden')
    {
      alterarIcone('https://cdn.glitch.global/30d43f34-a9a5-44e7-938e-be372afcfde1/icon.png?v=1736979129882');
      var audio = new Audio('https://cdn.glitch.global/30d43f34-a9a5-44e7-938e-be372afcfde1/g4.wav?v=1736978703543');
    }
    else
    {
      alterarIcone('https://cdn.glitch.global/30d43f34-a9a5-44e7-938e-be372afcfde1/icon.jpeg?v=1735647332626');
      var audio = new Audio('https://cdn.glitch.global/30d43f34-a9a5-44e7-938e-be372afcfde1/notificacao_insite.mp3?v=1736980581027');
    }
    
    audio.play();
    scrollar ()
  }    
});

/*//
//request :D
document.getElementById('enviar').addEventListener('submit', async (event) => {
  let data = new Date()
  event.preventDefault(); // Impede o envio padrão
  const mensagem = document.getElementById('mensagem-f').value;
    const response = await fetch('/add-message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        text: mensagem,
        avatar: localStorage.getItem("pfp"),
        username: localStorage.getItem("nome"),
        date: `${data.getDate().toString().padStart(2, '0')}/${(data.getMonth() + 1).toString().padStart(2, '0')}/${data.getFullYear()}`,
        time: `${data.getHours().toString().padStart(2, '0')}:${data.getMinutes().toString().padStart(2, '0')}`,
        server: serverid
      })
    });
    const result = await response.text();
    //alert(result); // Mostra a resposta do servidor
});

/*/
document.getElementById('enviar').addEventListener('submit', async (event) => {
  let data = new Date();
  event.preventDefault(); // Impede o envio padrão
  const mensagem = document.getElementById('mensagem-f').value;

  // Verifica se o servidor está vazio
  if (estah_em_server_vazio) 
  { // ----------------------------- SE SERVER NÃO EXISTIR --------------------------------------
    // Se o servidor está vazio, cria um novo servidor e envia a mensagem inicial
    // Se o servidor está vazio, cria um novo servidor e envia a mensagem inicial
      console.log("server sendo criado");

      const response = await fetch('/create-server', 
      {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
          {
              name: localStorage.getItem("chat"),
              owner: localStorage.getItem("nome")
          })
      });

      if (response.ok) 
      {
          const serverId = (await response.json()).serverId;
          console.log(`Servidor criado com ID: ${serverId}`);

          // Envia a mensagem inicial ao servidor recém-criado
          const mensagemInicial = 
          {
              text: mensagem,
              avatar: localStorage.getItem ("pfp"),
              username: "Criador do chat, " + localStorage.getItem ("nome"),
              date: `${data.getDate().toString().padStart(2, '0')}/${(data.getMonth() + 1).toString().padStart(2, '0')}/${data.getFullYear()}`,
              time: `${data.getHours().toString().padStart(2, '0')}:${data.getMinutes().toString().padStart(2, '0')}`
          };
          
          fetch('/add-message', 
          {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ...mensagemInicial, server: serverId })
          });
        
        
          setTimeout(() => 
          {
            location.reload();
          }, 400);
      }
      else 
      {
          console.error("Erro ao criar o servidor:", await response.text());
      }
  }  
  else // ----------------------- PONTO DE VIRADA -------------------------------------------
  {
    // Se o servidor não está vazio, apenas envia a mensagem
    await enviarMensagem();
  }

  // Função para enviar a mensagem
  async function enviarMensagem() 
  {
    const response = await fetch('/add-message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: mensagem,
        avatar: localStorage.getItem("pfp"),
        username: localStorage.getItem("nome"),
        date: `${data.getDate().toString().padStart(2, '0')}/${(data.getMonth() + 1).toString().padStart(2, '0')}/${data.getFullYear()}`,
        time: `${data.getHours().toString().padStart(2, '0')}:${data.getMinutes().toString().padStart(2, '0')}`,
        server: serverid
      })
    });

    const result = await response.text();
    //console.log("Resposta do server sobre json: " + result); // Mos////////////////////////////////////////////////////////////////////////////////////////////////////////////tra a resposta do servidor
  }
});