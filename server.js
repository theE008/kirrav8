const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;
const http = require('http');
const { Server } = require('socket.io');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const server = http.createServer(app);
const io = new Server(server);

// Configuração do Socket.IO
io.on('connection', (socket) => {
    console.log('Um usuário conectou.');

    // Quando o usuário se desconecta
    socket.on('disconnect', () => {
        console.log('Um usuário desconectou.');
    });
});


// Rota para receber a mensagem e salvar
app.post('/add-message', (req, res) => {  
    const novaMensagem = req.body//['mensagem-f']; // Obter a mensagem do formulário
    
    // Caminho para o arquivo JSON
    const jsonFilePath = path.join(__dirname, 'public', 'data', 'servers.json');

  
    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo JSON:', err);
            return res.status(500).send('Erro ao ler o arquivo JSON.');
        }
       
        let servers;
        try {
            servers = JSON.parse(data); // Fazer parse do JSON
        } catch (parseErr) {
            console.error('Erro ao parsear o JSON:', parseErr);
            return res.status(500).send('Erro ao processar o arquivo JSON.');
        }
        
        // Adicionar a nova mensagem ao primeiro servidor
      
        //o servidor "7" existe?
        if (servers[novaMensagem.server] ) {
            const novoIndice = Object.keys(servers[novaMensagem.server].messages).length;
            servers[novaMensagem.server].messages[novoIndice] = {
                text: novaMensagem.text,
                avatar: novaMensagem.avatar, 
                username: novaMensagem.username,
                date:novaMensagem.date,
                time:novaMensagem.time
            };
        } else {
            /*
            //adiciona o servidor 7 como owner owner  
            fs.writeFile(jsonFilePath, JSON.stringify(servers, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Erro ao salvar o arquivo JSON:', writeErr);
                return res.status(500).send('Erro ao enviar mensagem.');
            }
            io.emit('novaMensagem', novaMensagem);
            });
            
            //cria a mensagem 
             const novoIndice = Object.keys(servers[novaMensagem.server].messages).length;
            servers[novaMensagem.server].messages[novoIndice] = {
                text: novaMensagem.text,
                avatar: novaMensagem.avatar, 
                username: novaMensagem.username,
                date:novaMensagem.date,
                time:novaMensagem.time
            };
            */
            console.error('Estrutura do JSON inválida.');
            return 
        }
        
        // Escrever o JSON atualizado no arquivo
        fs.writeFile(jsonFilePath, JSON.stringify(servers, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Erro ao salvar o arquivo JSON:', writeErr);
                return res.status(500).send('Erro ao enviar mensagem.');
            }
            io.emit('novaMensagem', novaMensagem);
        });
    });
});


/////////////////////////////////////////////


// Rota para criar um novo servidor
app.post('/create-server', (req, res) => 
{
    const { name, owner } = req.body;

    // Caminho para o arquivo JSON
    const jsonFilePath = path.join(__dirname, 'public', 'data', 'servers.json');

    fs.readFile(jsonFilePath, 'utf8', (err, data) => 
    {
        if (err) 
        {
            console.error('Erro ao ler o arquivo JSON:', err);
            return res.status(500).send('Erro ao ler o arquivo JSON.');
        }

        let servers;
        try  
        {
            servers = JSON.parse(data); // Fazer parse do JSON
        } 
        catch (parseErr) 
        {
            console.error('Erro ao parsear o JSON:', parseErr);
            return res.status(500).send('Erro ao processar o arquivo JSON.');
        }

        // Gera um novo ID de servidor se o ID não existir
        const serverId = `${Object.keys(servers).length}`;
        if (servers[serverId]) 
        {
            return res.status(400).send('Servidor já existe.');
        }

        // Cria o novo servidor com a estrutura adequada
        servers[serverId] = 
        {
            name: name,
            owner: owner,
            messages: {}
        };

        // Escrever o JSON atualizado no arquivo
        fs.writeFile(jsonFilePath, JSON.stringify(servers, null, 2), (writeErr) => 
        {
            if (writeErr) 
            {
                console.error('Erro ao salvar o arquivo JSON:', writeErr);
                return res.status(500).send('Erro ao criar servidor.');
            }

            console.log(`Servidor ${serverId} criado com sucesso.`);
            res.send({ success: true, serverId });
        });
    });
});

/////////////////////////////////////////////
// Interruptor, favor não apagar a luz

server.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

