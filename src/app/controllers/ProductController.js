import * as Yup from 'yup';
import Category from '../models/Category.js';
import Product from '../models/Product.js';


class ProductController {
  // CRIAÇÃO DE PRODUTO
    async store(request, response) {
        const schema = Yup.object({
            name: Yup.string().required(),
            price: Yup.number().required(),
            category_id: Yup.number().required(),
            offer: Yup.boolean(),
        });

        try {
          schema.validateSync(request.body, { abortEarly: false }); // VALIDATESYNC -> VALIDAÇÃO SINCRONA DOS DADOS RECEBIDOS NA REQUISIÇÃO, ABORTEARLY -> MOSTRA TODOS OS ERROS DE UMA VEZ, STRICT -> NÃO PERMITE CONVERSÕES AUTOMÁTICAS DE TIPOS  
        } catch (err){
          return response.status(400).json({ error: err.errors });
        }
        
        const { name, price, category_id, offer } = request.body; // DESESTRUTURAÇÃO DOS DADOS RECEBIDOS NA REQUISIÇÃO
        const { filename } = request.file; // PEGANDO O NOME DO ARQUIVO ENVIADO
        
        const newProduct = await Product.create({ // CRIA UM NOVO PRODUTO NO BANCO DE DADOS
          name,
          price,
          category_id,
          path: filename,
          offer,
        });

        return response.status(201).json(newProduct);
  }

      // ATUALIZAÇÃO DE PRODUTO
    async update(request, response) {
        const schema = Yup.object({
            name: Yup.string(),
            price: Yup.number(),
            category_id: Yup.number(),
            offer: Yup.boolean(),
        });

        try {
          schema.validateSync(request.body, { abortEarly: false });
        } catch (err){
          return response.status(400).json({ error: err.errors });
        }
        
        const { name, price, category_id, offer } = request.body;
        const { id } = request.params; // PEGANDO O ID DO PRODUTO A SER ATUALIZADO ATRAVÉS DOS PARÂMETROS DA ROTA

        let path
        if (request.file) {
          const { filename } = request.file;
          path = filename;
        }
  
        
      await Product.update(
        {
          name,
          price,
          category_id,
          path,
          offer,
        }, 
        {
          where: {
            id,
          },
        },
      );

        return response.status(200).json();
  }

    // LISTAGEM DE PRODUTOS
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