const CustomAPIError = require('../errors/custom-error')
const jwt = require('jsonwebtoken')

const authenticatoniMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new CustomAPIError('no token provided :/ ', 401)
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const { id, username } = decoded
        req.user = { id, username }
        next()
    } catch (err) {
        throw new CustomAPIError(
            'token was not correct, authorization not allowed',
            401
        )
    }

    next()
}

module.exports = authenticatoniMiddleware
