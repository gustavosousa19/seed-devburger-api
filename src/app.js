// AONDE DECLARA A VARIAVEL PRA UTILIZAR DE TODOAS AS FUNCIONALIDADES DO EXPRESS
import express from 'express';
import fileRouteConfig from './config/fileRoutes.cjs';
import cors from 'cors';

import routes from './routes.js'; // IMPORTA AS ROTAS DO ARQUIVO ROUTES.JS

const app = express(); // DECLARA A VARIAVEL APP COMO UMA INSTANCIA DO EXPRESS

app.use(express.json()); // PERMITE QUE O EXPRESS ENTENDA REQUISIÇÕES COM JSON
app.use(cors()); // HABILITA O CORS PARA PERMITIR REQUISIÇÕES DE ORIGENS DIFERENTES
app.use(express.urlencoded({ extended: true })); // PADRÃO DE URL PRA UTILIZAR O BODY
app.use('/product-file', fileRouteConfig); // ROTA PARA SERVIR OS ARQUIVOS ESTÁTICOS DE PRODUTOS
app.use('/category-file', fileRouteConfig);

app.use(routes); // UTILIZA AS ROTAS DECLARADAS NO ARQUIVO ROUTES.JS

export default app; // EXPORTA A VARIAVEL APP PARA SER UTILIZADA EM OUTROS ARQUIVOS