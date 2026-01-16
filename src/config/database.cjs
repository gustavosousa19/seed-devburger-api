// usar a syntaxe de module.exports do CommonJS pois o sequelize não indende o import export do ES6
module.exports = {
    dialect: 'postgres', // qual banco de dados estamos usando
    host: 'localhost', // onde o banco de dados está hospedado
    port: 5432,
    username: 'admin',
    password: '123456',
    database: 'dev-burguer-db', // nome do banco de dados
    define: { // configurações padrões do banco
        timestamps: true, // vai criar a data de criação e data de atualização caso o usuario troque algum dado
        underscored: true, // estou dizendo como que eu quero que os nomes das colunas sejam criadas no banco de dados
        underscoredAll: true,  // estou dizendo como que eu quero que os nomes das tabelas sejam criados no banco de dados
    },
};