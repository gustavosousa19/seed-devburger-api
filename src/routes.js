import { Router } from 'express'; // IMPORTA O MÓDULO ROUTER DO EXPRESS
import UserController from './app/controllers/UserController.js'; // IMPORTA O CONTROLLER DE USUÁRIO
import SessionController from './app/controllers/SessionController.js';
import ProductController from './app/controllers/ProductController.js';

const routes = new Router();

// MÉTODOS HTTP - POST -> CRIAR - GET -> LISTAR - PUT/PATCH -> ATUALIZAR - DELETE -> DELETAR
routes.post('/users', UserController.store); // ROTA DE EXEMPLO QUE CHAMA O MÉTODO STORE DO CONTROLLER
routes.post('/session', SessionController.store);
routes.post('/products', ProductController.store);
export default routes;