import jwt from 'jsonwebtoken';
import authConfig from './../config/auth.js';

// o authMiddleware verificar se o usuário está autenticado antes de permitir o acesso a rotas protegidas.
const authMiddleware = (request, response, next) => {
    const authToken = request.headers.authorization; // Pega o token de autenticação do cabeçalho da requisição
    
    if (!authToken){
        return response.status(401).json({ error: "Token not provided" });
    }

    const token = authToken.split(' ')[1]; // split( ) é usado para dividir a string do token em partes, geralmente separadas por um espaço.

    try {
        jwt.verify(token, authConfig.secret, (error, decoded) => { // verify( ) verifica se o token é válido - decoded contém as informações do token decodificado
            if (error) {
                throw Error()
            }

            request.userId = decoded.id;
            request.userName = decoded.name;
            request.userIsAdmin = decoded.admin;
        });
    } catch (_error) {
       return response.status(401).json({ error: "Token not valid" }); 
    }
    return next(); // Se o token for válido, a função next( ) é chamada para passar o controle para a próxima função de middleware ou rota.
};

export default authMiddleware;