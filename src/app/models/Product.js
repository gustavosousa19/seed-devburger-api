import Sequelize, { Model } from "sequelize";

class Product extends Model{
    static init(sequelize){
        super.init({
            name: Sequelize.STRING,
            price: Sequelize.INTEGER,
            path: Sequelize.STRING, // caminho da imagem do produto
            url: {
                type: Sequelize.VIRTUAL, // Campo Virtual, UM CAMPO QUE NÃO EXISTE NO BANCO DE DADOS, MAS QUE PODE SER USADO NA APLICAÇÃO
                get(){  // get -> produto -> SEQUELIZE BUSCA O PRODUTO -> MONTA CANPO VIRTUAL COM OS DADOS DO PRODUTO
                    return `http://localhost:3001/product-file/${this.path}`;
                },
            },
        },
        {
            sequelize,
            tableName: 'products',
        },
      );

      return this;
    }

    static associate(models){
        this.belongsTo(models.Category, { // Model de produto pertence a categoria
            foreignKey: 'category_id', // Chave estrangeira que liga o produto à categoria
            as: 'category', // tras as informações da categoria junto com o produto, e tras na propriedade chamada 'category'
        });
    }
}

export default Product;