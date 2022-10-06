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
    const luckyNumber = Math.floor(Math.random() * 100)
    res.status(200).json({
        msg: `hello ${req.user.username}`,
        secret: `here is your data ${req.user.username}, ie your lucky number ${luckyNumber}`,
    })
}

module.exports = {
    login,
    dashboard,
}
