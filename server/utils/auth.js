const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;
const expiration = '2h';

module.exports = {
    signToken(data) {
        return jwt.sign({ ...data }, secret, { expiresIn: expiration })
    },
    authMiddleware(req) {
        // token can be sent via body or header
        let token = req.body.token || req.headers.authorization;
        if (req.headers.authorization) {
            token = token
                .split(' ')
                .pop()
                .trim();
        }
        // if there is not any token
        if(!token) {
            return null
        }
        try {
            return jwt.verify(token, secret, {maxAge: expiration})
        }
        catch {
            console.log('Invalid token');
        }
    }
}