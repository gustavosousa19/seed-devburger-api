const multer = require('multer');
const { resolve } = require('node:path');
const { v4 } = require('uuid');

module.exports = {
    storage: multer.diskStorage({  // Configuração de onde e como o arquivo será salvo
        destination: resolve(__dirname, '..', '..', 'uploads'), // Pasta onde os arquivos enviados serão guardados
        filename: (_request , file, callback) => { // Define o nome do arquivo ao salvar
            const uniqueName = v4().concat(`-${file.originalname}`) // Cria um nome único para evitar arquivos duplicados
            return callback(null, uniqueName); // Salva o arquivo com esse nome ↑
        },
    }),
};