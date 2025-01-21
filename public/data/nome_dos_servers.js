const fs = require ('fs');

const dados = JSON.parse (fs.readFileSync ('servers.json', 'utf8'));    // Pega o jason
const serverNames = Object.values (dados).map (server => server.name); // puxa os nomes
console.log (serverNames); // printf
