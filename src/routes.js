import { Router } from 'express'; // IMPORTA O MÓDULO ROUTER DO EXPRESS
import multer from 'multer'; // IMPORTA O MULTER PARA UPLOAD DE ARQUIVOS
import CategoryController from './app/controllers/CategoryController.js';
import OrderController from './app/controllers/OrderController.js';
import ProductController from './app/controllers/ProductController.js'; // IMPORTA O CONTROLLER DE USUÁRIO
import SessionController from './app/controllers/SessionController.js';
import CreatPaymentIntentController from './app/controllers/stripe/CreatPaymentIntentController.js'; // IMPORTA O CONTROLLER PARA CRIAR UM INTENTO DE PAGAMENTO COM O STRIPE
import UserController from './app/controllers/UserController.js';
import adminMiddleware from './app/middlewares/admin.js';
import authMiddleware from './app/middlewares/auth.js';
import multerConfig from './config/multer.cjs'; // IMPORTA A CONFIGURAÇÃO DO MULTER

const routes = new Router();

const upload = multer(multerConfig); // CONFIGURAÇÃO DO MULTER PARA UPLOAD DE ARQUIVOS

// MÉTODOS HTTP - POST -> CRIAR - GET -> LISTAR - PUT/PATCH -> ATUALIZAR - DELETE -> DELETAR
routes.post('/users', UserController.store); // ROTA DE EXEMPLO QUE CHAMA O MÉTODO STORE DO CONTROLLER
routes.post('/sessions', SessionController.store); // ROTA PARA CRIAR UMA SESSÃO DE USUÁRIO (LOGIN)

routes.use(authMiddleware); // APLICA O MIDDLEWARE DE AUTENTICAÇÃO PARA TODAS AS ROTAS DEFINIDAS APÓS ESSA LINHA
routes.post('/products', adminMiddleware, upload.single('file'), ProductController.store); // ROTA PARA CRIAR UM PRODUTO
routes.put('/products/:id', adminMiddleware, upload.single('file'), ProductController.update); // ROTA PARA ATUALIZAR UM PRODUTO
routes.get('/products', ProductController.index); // ROTA PARA LISTAR TODOS OS PRODUTOS

routes.post('/categories', adminMiddleware, upload.single('file'), CategoryController.store); // ROTA PARA CRIAR UMA CATEGORIA
routes.put('/categories/:id', adminMiddleware, upload.single('file'), CategoryController.update); // ROTA PARA ATUALIZAR UMA CATEGORIA
routes.get('/categories', CategoryController.index); // ROTA PARA LISTAR TODAS AS CATEGORIAS

routes.post('/orders', OrderController.store); // ROTA PARA CRIAR UM PEDIDO
routes.get('/orders', OrderController.index); // ROTA PARA LISTAR TODOS OS PEDIDOS
routes.put('/orders/:id', adminMiddleware, OrderController.update); // ROTA PARA ATUALIZAR O STATUS DE UM PEDIDO

routes.post("/create-payment-intent", CreatPaymentIntentController.store); // ROTA PARA CRIAR UM INTENTO DE PAGAMENTO COM O STRIPE
export default routes;