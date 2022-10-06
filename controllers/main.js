const login = async (req, res) => {
    res.send('fake login/register and other stuff')
}

const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100)
    res.status(200).json({
        msg: 'hello walla',
        secret: `here is your data, ie your lucky number ${luckyNumber}`,
    })
}

module.exports = {
    login,
    dashboard,
}
