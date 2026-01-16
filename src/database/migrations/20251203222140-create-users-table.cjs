/** @type {import('sequelize-cli').Migration} */
module.exports = {
  
     // UP -> SUBIR, CONFIGURAR
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', { 
      id: {
        primaryKey: true, // IDENTIFICADOR ÚNICO DA LINHA
        allowNull: false, // VER SE ESSE COMPO PODE SER NULO OU NÃO
        type: Sequelize.UUID,// TIPO DE ID
        defaultValue: Sequelize.UUIDV4 // UUID = TIPO DE ID UNICO / UUIDV4 = GERAR ID AUTOMATICAMENTE
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // NÃO PODE TER EMAIL REPETIDO
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      admin: { // SE O USUÁRIO É ADMINISTRADOR OU NÃO
        type: Sequelize.BOOLEAN, // TIPO BOOLEANO (VERDADEIRO OU FALSO)
        defaultValue: false, // POR PADRÃO, NÃO É ADMINISTRADOR SOMENTE SE FOR DEFINIDO COMO VERDADEIRO
      },
      created_at: { // DATA DE CRIAÇÃO DO USUÁRIO
        type: Sequelize.DATE, // TIPO DATA
        allowNull: false,
      },
      updated_at: { // DATA DA ÚLTIMA ATUALIZAÇÃO DO USUÁRIO
        type: Sequelize.DATE, 
        allowNull: false,
      },
    });
  },

     // DOWN -> PARA BAIXO, DESFAZER
  async down (queryInterface) {
    await queryInterface.dropTable('users');
  }
};