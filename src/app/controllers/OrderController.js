import * as Yup from 'yup';
import Category from '../models/Category.js';
import Product from '../models/Product.js';


class OrderController {
    async store(request, response) {
        const schema = Yup.object({
            products: Yup.array().required().of(
                Yup.object({
                    id: Yup.number().required(),
                    quantity: Yup.number().required(),
                }),
            ),
        });

        try {
          schema.validateSync(request.body, { abortEarly: false, strict: true });
        } catch (err){
          return response.status(400).json({ error: err.errors });
        }
        
        const { userId, userName } = request; // Pega o id e nome do usuário logado
        const { products } = request.body; // Pega os produtos do corpo da requisição

        // Pega os ids dos produtos
        const productsIds = products.map(product => product.id);

        // Busca os produtos no banco de dados
        const findedProducts = await Product.findAll({
            where: {
                id: productsIds,
            },
            include: {
                model: Category,
                as: 'category',
                attributes: ['name'],
            },
        });

        // Mapeia os produtos para retornar apenas as informações necessárias
        const mapedProducts = findedProducts.map(product => {

        const quantity = products.find(p => p.id === product.id).quantity; // Pega a quantidade do produto
            const newProduct = {
                id: product.id,
                name: product.name,
                price: product.price,
                url: product.url,
                category: product.category.name,
                quantity,
            };
            return newProduct;
        });

        // Verifica se os produtos existem
        const order = {
           user: {
            id: userId,
            name: userName,
           },
           products: mapedProducts,
           status: "Pedido realizado",
        };

        return response.status(201).json(order);
  }
}

export default new OrderController(); 