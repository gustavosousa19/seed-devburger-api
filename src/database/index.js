// CONFIGURAR A CONEXÃO DO SEQUELIZE COM O BANCO DE DADOS E PASSAR AS CONFIGURAÇÕES DAS MODELS

import { Sequelize } from "sequelize";
import mongoose  from "mongoose"; // IMPORTANDO O MONGOOSE PARA CONECTAR COM O MONGODB
import Category from "../app/models/Category.js";
import Product from "../app/models/Product.js"; // IMPORTANDO A MODEL PRODUCT
import User from "../app/models/User.js"; // IMPORTANDO A MODEL USER
import databaseConfig from "../config/database.cjs"; // IMPORTANDO AS CONFIGURAÇÕES DO BANCO DE DADOS
import 'dotenv/config'; // Garante que o arquivo consiga ler o seu .env

const models = [User, Product, Category]; // ADICIONANDO AS MODELS EM UM ARRAY

class Database {
    constructor() { // CONTRUCTOR = FUNÇÃO QUE É EXECUTADA AUTOMATICAMENTE QUANDO A CLASSE É INICIALIZADA
        this.init(); // THIS = REFERENCIA A PRÓPRIA CLASSE
        this.mongo(); // CHAMANDO O MÉTODO MONGO PARA CONECTAR COM O MONGODB
    }

  init() {
        // SE TIVER DATABASE_URL NO .ENV (NEON), USA ELA. CASO CONTRÁRIO, USA A CONFIGURAÇÃO LOCAL DO .CJS
        if (process.env.DATABASE_URL) {
            this.connection = new Sequelize(process.env.DATABASE_URL, {
                dialect: 'postgres',
                dialectOptions: {
                    ssl: {
                        require: true,
                        rejectUnauthorized: false // Necessário para funcionar com o Neon e instâncias na nuvem
                    }
                }
            });
        } else {
            this.connection = new Sequelize(databaseConfig);
        }

        models
          .map((model) => model.init(this.connection)) // INICIALIZANDO AS MODELS E PASSANDO A CONEXÃO COM O BANCO
          .map(
            (model) => model.associate && model.associate(this.connection.models), // SE O MODEL TIVER O MÉTODO ASSOCIATE, ELE VAI CHAMAR ESSE MÉTODO E PASSAR AS MODELS COMO PARÂMETRO PARA QUE AS ASSOCIAÇÕES SEJAM CRIADAS
        );
    }

 // CONECTANDO COM O MONGODB USANDO O MONGOOSE E PASSANDO A URL DE CONEXÃO DO BANCO DE DADOS MONGODB
    mongo() {
        this.mongooseConnection = mongoose.connect(
            'mongodb://localhost:27017/devburguer'
        ); 
    }
}

export default new Database(); // EXPORTANDO CLASSE DATABASE JÁ INSTANCIADA