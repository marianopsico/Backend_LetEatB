import jwt from 'jwt-simple';
import moment from 'moment';

const checkToken = (req, res, next) => {

    if(!req.headers['user-token']) {
        return res.json( { error: 'Se necesita incluir un token'} )
    }

    const userToken = req.headers['user-token'];
    let payload = {}

    try {
        payload = jwt.decode(userToken, 'frase secreta')
    } catch(err) {
        return res.json( { error: 'EL token es incorrecto'} )
    }

    if(payload.expiredAt < moment().unix()){
        return res.json( { error: 'El token ha expirado' })
    }

    req.usuarioID = payload.usuarioID;

    next();
}

export default  checkToken;