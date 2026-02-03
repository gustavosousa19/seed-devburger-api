const { resolve } = require('node:path');
const express = require('express');

const uploadPath = resolve(__dirname, '..', '..', 'uploads'); // CAMINHO ONDE OS ARQUIVOS SERÃO SALVOS

const fileRouteConfig = express.static(uploadPath); // SERVE OS ARQUIVOS ESTÁTICOS DA PASTA DE UPLOADS

module.exports = fileRouteConfig;