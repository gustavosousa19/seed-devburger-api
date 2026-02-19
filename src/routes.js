import { Router } from 'express'; // IMPORTA O MÓDULO ROUTER DO EXPRESS
import multer from 'multer'; // IMPORTA O MULTER PARA UPLOAD DE ARQUIVOS
import ProductController from './app/controllers/ProductController.js'; // IMPORTA O CONTROLLER DE USUÁRIO
import SessionController from './app/controllers/SessionController.js';
import UserController from './app/controllers/UserController.js';
import multerConfig from './config/multer.cjs'; // IMPORTA A CONFIGURAÇÃO DO MULTER
import authMiddleware from './middlewares/auth.js';
import CategoryController from './app/controllers/CategoryController.js';
import adminMiddleware from './middlewares/admin.js';

const routes = new Router();

const upload = multer(multerConfig); // CONFIGURAÇÃO DO MULTER PARA UPLOAD DE ARQUIVOS

// MÉTODOS HTTP - POST -> CRIAR - GET -> LISTAR - PUT/PATCH -> ATUALIZAR - DELETE -> DELETAR
routes.post('/users', UserController.store); // ROTA DE EXEMPLO QUE CHAMA O MÉTODO STORE DO CONTROLLER
routes.post('/session', SessionController.store); // ROTA PARA CRIAR UMA SESSÃO DE USUÁRIO (LOGIN)

routes.use(authMiddleware); // APLICA O MIDDLEWARE DE AUTENTICAÇÃO PARA TODAS AS ROTAS DEFINIDAS APÓS ESSA LINHA
routes.post('/products', adminMiddleware, upload.single('file'), ProductController.store); // ROTA PARA CRIAR UM PRODUTO
routes.put('/products/:id', adminMiddleware, upload.single('file'), ProductController.update); // ROTA PARA ATUALIZAR UM PRODUTO
routes.get('/products', ProductController.index); // ROTA PARA LISTAR TODOS OS PRODUTOS

routes.post('/categories', adminMiddleware, upload.single('file'), CategoryController.store); // ROTA PARA CRIAR UMA CATEGORIA
routes.get('/categories', CategoryController.index); // ROTA PARA LISTAR TODAS AS CATEGORIAS

export default routes;