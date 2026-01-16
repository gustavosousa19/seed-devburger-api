// CONFIGURAR A CONEXÃO DO SEQUELIZE COM O BANCO DE DADOS E PASSAR AS CONFIGURAÇÕES DAS MODELS

import { Sequelize } from "sequelize";
import databaseConfig from "../config/database.cjs"; // IMPORTANDO AS CONFIGURAÇÕES DO BANCO DE DADOS
import User from "../app/models/User.js"; // IMPORTANDO A MODEL USER

const models = [User]; // ADICIONANDO AS MODELS EM UM ARRAY

class Database {
    constructor() { // CONTRUCTOR = FUNÇÃO QUE É EXECUTADA AUTOMATICAMENTE QUANDO A CLASSE É INICIALIZADA
        this.init(); // THIS = REFERENCIA A PRÓPRIA CLASSE
    }

    init() {
        this.connection = new Sequelize(databaseConfig); // CRIANDO A CONEXÃO COM O BANCO DE DADOS USANDO AS CONFIGURAÇÕES IMPORTADAS
        models.map((model) => model.init(this.connection)); // INICIALIZANDO AS MODELS E PASSANDO A CONEXÃO COM O BANCO
    }
}

export default new Database(); // EXPORTANDO CLASSE DATABASE JÁ INSTANCIADA