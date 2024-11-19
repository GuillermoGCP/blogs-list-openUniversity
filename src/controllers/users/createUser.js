const User = require('../../db/models/User.js')
const bcrypt = require('bcryptjs')
const generateError = require('../../utils/generateError.js')

const createUser = async (req, res) => {
  const { username, name, password } = req.body

  if (!password) {
    return generateError('Password is required', 400)
  }

  if (password.length < 3) {
    return generateError('Password must be at least 3 characters long', 400)
  }

  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(password, salt)

  const user = new User({
    username: username,
    name: name,
    passwordHash: hashedPassword,
  })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
}
module.exports = createUser
