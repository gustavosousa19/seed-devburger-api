import Sequelize, { Model } from "sequelize";

class User extends Model {  // class user se extender a Model de sequelize, isso faz com que a classe User herde todas as funcionalidades do Model do sequelize
    static init(sequelize){ // com o static não precisamos instanciar a classe para usar o método init
        super.init({ // o super é uma classe que referencia a classe pai, nesse caso o Model do sequelize
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password_hash: Sequelize.STRING,
            admin: Sequelize.BOOLEAN,
        },
        {
            sequelize,
            tableName: 'users', // nome da tabela no banco de dados 
        });
    }
} // created at e updated at são criados automaticamente pelo sequelize, e o id também é criado automaticamente como chave primária
  // primaryKey = true, não precisa declarar!

export default User;