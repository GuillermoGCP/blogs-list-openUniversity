const User = require('../../db/models/User.js')

const getAllUsers = async (req, res) => {
  const allUsers = await User.find({})
  res.send(allUsers)
}
module.exports = getAllUsers
