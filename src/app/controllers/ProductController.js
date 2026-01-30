import * as Yup from 'yup';

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
        
        return response.status(201).json({ ok: true });
    }
}

export default new ProductController(); 