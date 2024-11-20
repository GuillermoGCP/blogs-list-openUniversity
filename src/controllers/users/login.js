const User = require('../../db/models/User.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const login = async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password',
    })
  }

  const payload = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(payload, process.env.SECRET)

  res.status(200).send({ token, username: user.username, name: user.name })
}
module.exports = login
