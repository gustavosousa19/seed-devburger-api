'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.addColumn('products', 'category_id', {
      type: Sequelize.INTEGER,
      references: { // REFERENCIA OUTRA TABELA
        model: 'categories', // NOME DA TABELA QUE ESTAMOS REFERENCIANDO
        key: 'id', // COLUNA DA TABELA QUE ESTAMOS REFERENCIANDO
      },
      onUpdate: 'CASCADE', // SE A CHAVE PRIMÁRIA FOR ATUALIZADA, ATUALIZA TAMBÉM A ESTRANGEIRA
      onDelete: 'SET NULL', // SE A CHAVE PRIMÁRIA FOR DELETADA, SETA A ESTRANGEIRA COMO NULL
     });
  },

  async down (queryInterface) {
     await queryInterface.removeColumn('products', 'category_id');
  },
};
