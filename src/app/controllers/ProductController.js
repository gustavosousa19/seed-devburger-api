import * as Yup from 'yup';
import Product from '../models/Product.js';
import Category from '../models/Category.js';

class ProductController {
    async store(request, response) {
        const schema = Yup.object({
            name: Yup.string().required(),
            price: Yup.number().required(),
            category_id: Yup.number().required(),
        });

        try {
          schema.validateSync(request.body, { abortEarly: false }); // VALIDATESYNC -> VALIDAÇÃO SINCRONA DOS DADOS RECEBIDOS NA REQUISIÇÃO, ABORTEARLY -> MOSTRA TODOS OS ERROS DE UMA VEZ, STRICT -> NÃO PERMITE CONVERSÕES AUTOMÁTICAS DE TIPOS  
        } catch (err){
          return response.status(400).json({ error: err.errors });
        }
        
        const { name, price, category_id } = request.body; // DESESTRUTURAÇÃO DOS DADOS RECEBIDOS NA REQUISIÇÃO
        const { filename } = request.file; // PEGANDO O NOME DO ARQUIVO ENVIADO
        
        const newProduct = await Product.create({ // CRIA UM NOVO PRODUTO NO BANCO DE DADOS
          name,
          price,
          category_id,
          path: filename,
        });

        return response.status(201).json(newProduct);
  }

  async index(_request, response) {
    const products = await Product.findAll({ // BUSCA TODOS OS PRODUTOS NO BANCO DE DADOS
      include: { // INCLUI A CATEGORIA ASSOCIADA A CADA PRODUTO
        model: Category, // QUAL MODEL QUE DEVE SER INCLUÍDA
        as: 'category', // QUAL O NOMDE DA PROPRIEDADE, TEM QUE ESTA DE ACORDO COM O NOME DEFINIDO NA MODELS
        attributes: ['id', 'name'], // SELECIONA APENAS OS CAMPOS ID E NAME DA CATEGORIA PARA SEREM RETORNADOS NA RESPOSTA
      },
    }); 
    
    return response.status(200).json(products);
  }
}

export default new ProductController(); 