import Sequelize, { Model } from "sequelize";

class Product extends Model{
    static init(sequelize){
        Model.init({
            name: Sequelize.STRING,
            price: Sequelize.INTEGER,
            category: Sequelize.STRING,
            path: Sequelize.STRING, // caminho da imagem do produto
        },
        {
            sequelize,
            tableName: 'products',
        });
    } 
}

export default Product;