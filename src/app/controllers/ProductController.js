import * as Yup from 'yup';
import Product from '../models/Product.js';

class ProductController {
    async store(request, response) {
        const schema = Yup.object({
            name: Yup.string().required(),
            price: Yup.number().required(),
            category: Yup.string().required(),
        });

        try {
          schema.validateSync(request.body, { abortEarly: false }); // VALIDATESYNC -> VALIDAÇÃO SINCRONA DOS DADOS RECEBIDOS NA REQUISIÇÃO, ABORTEARLY -> MOSTRA TODOS OS ERROS DE UMA VEZ, STRICT -> NÃO PERMITE CONVERSÕES AUTOMÁTICAS DE TIPOS  
        } catch (err){
          return response.status(400).json({ error: err.errors });
        }
        
        const { name, price, category } = request.body; // DESESTRUTURAÇÃO DOS DADOS RECEBIDOS NA REQUISIÇÃO
        const { filename } = request.file; // PEGANDO O NOME DO ARQUIVO ENVIADO
        
        const newProduct = await Product.create({ // CRIA UM NOVO PRODUTO NO BANCO DE DADOS
          name,
          price,
          category,
          path: filename,
        });

        return response.status(201).json(newProduct);
  }

  async index(_request, response) {
    const products = await Product.findAll(); // BUSCA TODOS OS PRODUTOS NO BANCO DE DADOS
    
    return response.status(200).json(products);
  }
}

export default new ProductController(); 