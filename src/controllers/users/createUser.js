const User = require('../../db/models/User.js')
const bcrypt = require('bcryptjs')

const createUser = async (req, res) => {
  const { username, name, password } = req.body

  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(password, salt)

  const user = new User({
    username: username,
    name: name,
    password: hashedPassword,
  })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
}
module.exports = createUser
