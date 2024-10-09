import jwt from 'jsonwebtoken';

const autgMiddleware = (req, res, next) =>{
    const token = req.header('Authorization').replace('Bearer ', '');
    if(!token){
        return res.status(401).json({error: 'Accesso dengenado mi rey'});
    }
    try{
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        req.user = verified;
        next();
    }catch(error){
        res.status(400).json({error: 'Token invalido'});
    }
};

export default autgMiddleware;