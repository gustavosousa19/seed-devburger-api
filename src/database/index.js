// CONFIGURAR A CONEXÃO DO SEQUELIZE COM O BANCO DE DADOS E PASSAR AS CONFIGURAÇÕES DAS MODELS

import { Sequelize } from "sequelize";
import Category from "../app/models/Category.js";
import Product from "../app/models/Product.js"; // IMPORTANDO A MODEL PRODUCT
import User from "../app/models/User.js"; // IMPORTANDO A MODEL USER
import databaseConfig from "../config/database.cjs"; // IMPORTANDO AS CONFIGURAÇÕES DO BANCO DE DADOS


const models = [User, Product, Category]; // ADICIONANDO AS MODELS EM UM ARRAY

class Database {
    constructor() { // CONTRUCTOR = FUNÇÃO QUE É EXECUTADA AUTOMATICAMENTE QUANDO A CLASSE É INICIALIZADA
        this.init(); // THIS = REFERENCIA A PRÓPRIA CLASSE
    }

    init() {
        this.connection = new Sequelize(databaseConfig); // CRIANDO A CONEXÃO COM O BANCO DE DADOS USANDO AS CONFIGURAÇÕES IMPORTADAS
        models
          .map((model) => model.init(this.connection)) // INICIALIZANDO AS MODELS E PASSANDO A CONEXÃO COM O BANCO
          .map(
            (model) => model.associate && model.associate(this.connection.models), // SE O MODEL TIVER O MÉTODO ASSOCIATE, ELE VAI CHAMAR ESSE MÉTODO E PASSAR AS MODELS COMO PARÂMETRO PARA QUE AS ASSOCIAÇÕES SEJAM CRIADAS
        );
    }
}

export default new Database(); // EXPORTANDO CLASSE DATABASE JÁ INSTANCIADA