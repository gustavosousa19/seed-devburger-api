import * as Yup from 'yup';
import Category from '../models/Category.js';

class CategoryController {
    async store(request, response) {
        const schema = Yup.object({
            name: Yup.string().required(),
        });

        try {
          schema.validateSync(request.body, { abortEarly: false }); // VALIDATESYNC -> VALIDAÇÃO SINCRONA DOS DADOS RECEBIDOS NA REQUISIÇÃO, ABORTEARLY -> MOSTRA TODOS OS ERROS DE UMA VEZ, STRICT -> NÃO PERMITE CONVERSÕES AUTOMÁTICAS DE TIPOS  
        } catch (err){
          return response.status(400).json({ error: err.errors });
        }
        
        const { name } = request.body; // DESESTRUTURAÇÃO DOS DADOS RECEBIDOS NA REQUISIÇÃO
        
        const newCategory = await Category.create({ // CRIA UM NOVO PRODUTO NO BANCO DE DADOS
          name,
        });

        return response.status(201).json(newCategory);
  }

  async index(_request, response) {
    const categories = await Category.findAll(); // BUSCA TODOS OS PRODUTOS NO BANCO DE DADOS
    
    return response.status(200).json(categories);
  }
}

export default new CategoryController(); 