import bcrypt from 'bcrypt';
import * as Yup from 'yup';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import authConfig from './../../config/auth.js';

// VERIFICA SE OS DADOS DE LOGIN SÃO VÁLIDOS
class SessionController {
 async store(request, response) {
    const schema = Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().min(6).required(),
    });

    const isValid = await schema.isValid(request.body, { 
      abortEarly: false, 
      strict: true, 
    });

    const emailOrPasswordIncorrect = () => {
        return response
        .status(400)
        .json({ error: 'Email or password incorrect' });
    }
    
    if(!isValid){
        emailOrPasswordIncorrect();
    };
  
    const { email, password } = request.body;

    // VERIFICA SE O EMAIL EXISTE
    const existingUser = await User.findOne({ 
      where: {
        email, 
      },
    });

    if (!existingUser) {
      emailOrPasswordIncorrect();          
    };

    // VERIFICA SE A SENHA ESTÁ CORRETA
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password_hash,);

    if (!isPasswordCorrect) {
      emailOrPasswordIncorrect();           
    };

    const token = jwt.sign({ id: existingUser.id}, authConfig.secret,{
        expiresIn: authConfig.expiresIn,
      });

    // RETORNA OS DADOS DO USUÁRIO
    return response.status(200).json({ 
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        admin: existingUser.admin,
        token,
     });
 }
}

export default new SessionController();