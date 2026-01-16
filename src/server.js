// RESPONSAVEL POR INICIAR O SERVIDOR
import app from './app.js'
import './database/index.js' // IMPORTA A MODEL E INICIA A CONEXÃO COM O BANCO DE DADOS

app.listen(3001, () => console.log('Server running on port 3001')) // INICIA O SERVIDOR NA PORTA 3001 E EXIBE UMA MENSAGEM NO CONSOLE