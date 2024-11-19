const User = require('../../db/models/User.js')

const getAllUsers = async (req, res) => {
  const allUsers = await User.find({}).populate('blogs', {
    title: 1,
    url: 1,
    likes: 1,
  })
  res.send(allUsers)
}
module.exports = getAllUsers
