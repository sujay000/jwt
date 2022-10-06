const CustomAPIError = require('../errors/custom-error')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        throw new CustomAPIError('please provide email and password', 404)
    }
    //just for demo, generally provided by DB
    const id = new Date().getDate()

    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })

    res.status(200).json({ msg: 'success heehe', token: token })
}

const dashboard = async (req, res) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new CustomAPIError('no token provided :/ ', 401)
    }

    const token = authHeader.split(' ')[1]
    try {
        var decoded = jwt.verify(token, process.env.JWT_SECRET)
        const luckyNumber = Math.floor(Math.random() * 100)
        res.status(200).json({
            msg: 'hello walla',
            secret: `here is your data ${decoded.username}, ie your lucky number ${luckyNumber}`,
        })
    } catch (err) {
        throw new CustomAPIError(
            'token was not correct, authorization not allowed',
            401
        )
    }
}

module.exports = {
    login,
    dashboard,
}
