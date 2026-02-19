import * as Yup from 'yup';
import Category from '../models/Category.js';

  // CONTROLLER RESPONSÁVEL POR GERENCIAR AS CATEGORIAS DE PRODUTOS
class CategoryController {
    async store(request, response) {
        const schema = Yup.object({
            name: Yup.string().required(),
        });
        
  // VALIDAÇÃO DOS DADOS RECEBIDOS NA REQUISIÇÃO
        try {
          schema.validateSync(request.body, { abortEarly: false }); // VALIDATESYNC -> VALIDAÇÃO SINCRONA DOS DADOS RECEBIDOS NA REQUISIÇÃO, ABORTEARLY -> MOSTRA TODOS OS ERROS DE UMA VEZ, STRICT -> NÃO PERMITE CONVERSÕES AUTOMÁTICAS DE TIPOS  
        } catch (err){
          return response.status(400).json({ error: err.errors });
        }
        
  // DESESTRUTURAÇÃO DOS DADOS RECEBIDOS NA REQUISIÇÃO
        const { name } = request.body; // DESESTRUTURAÇÃO DOS DADOS RECEBIDOS NA REQUISIÇÃO
        const { filename } = request.file; 

        const existingCategory = await Category.findOne({ // BUSCA NO BANCO DE DADOS SE EXISTE UMA CATEGORIA COM O MESMO NOME
          where: {
            name,
          },
        });

        if (existingCategory) {
          return response.status(400).json({ error: "Category already exists" });
        }

  // CRIA UMA NOVA CATEGORIA NO BANCO DE DADOS
        const newCategory = await Category.create({ // CRIA UM NOVO PRODUTO NO BANCO DE DADOS
          name,
          path: filename,
        });

        return response.status(201).json(newCategory);
  }

  // MÉTODO PARA LISTAR TODAS AS CATEGORIAS
  async index(_request, response) {
    const categories = await Category.findAll(); // BUSCA TODOS OS PRODUTOS NO BANCO DE DADOS
    
    return response.status(200).json(categories);
  }
}

export default new CategoryController(); 