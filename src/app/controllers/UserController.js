/*
 REGRAS DOS METODOS DE CONTROLLER

 1- STORE -> CRIA DADO
 2- INDEX -> LISTA TODOS OS DADOS
 3- SHOW -> LISTA UM DADO ESPECIFICO
 4- UPDATE -> ATUALIZA DADO
 5- DELETE -> DELETA DADO
*/

import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import * as Yup from 'yup';
import User from '../models/User.js'; 


class UserController {
    async store(request, response) {
        const schema = Yup.object({
            name: Yup.string().required(), // VALIDAÇÃO DE NOME
            email: Yup.string().email().required(), // VALIDAÇÃO DE EMAIL
            password: Yup.string().min(6).required(), // SENHA COM MÍNIMO DE 6 CARACTERES
            admin: Yup.boolean(), // VALIDAÇÃO DE BOOLEANO (VERDADEIRO OU FALSO)
        });

        try {
          schema.validateSync(request.body, { abortEarly: false, strict: true }); // VALIDATESYNC -> VALIDAÇÃO SINCRONA DOS DADOS RECEBIDOS NA REQUISIÇÃO, ABORTEARLY -> MOSTRA TODOS OS ERROS DE UMA VEZ, STRICT -> NÃO PERMITE CONVERSÕES AUTOMÁTICAS DE TIPOS  
        } catch (err){
          return response.status(400).json({ error: err.errors });
        }
        

        const {name, email, password, admin} = request.body; // desestruturação da request para pegar os dados enviados pelo cliente

        const existingUser = await User.findOne({ // findOne = procura um registro no banco de dados
            where: { // where = Filtro da busca (condição)
                email, // procura um usuário com o email igual ao email enviado na requisição
            },
        });

        if (existingUser) {
            return response.status(409).json({ message: 'Email already taken!'})            
        };

        const password_hash = await bcrypt.hash(password, 10); // hash = criptografa a senha, 10 = número de rodadas de criptografia

        const user = await User.create({ 
            id: v4(),
            name,
            email,
            password_hash,
            admin,
        });

        return response.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
        });
        }
    }

export default new UserController();