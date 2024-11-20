const express = require('express')
const { createUser, getAllUsers, login } = require('../controllers/index.js')
const router = express.Router()

router.post('/api/users', createUser)
router.get('/api/users', getAllUsers)
router.post('/api/users/login', login)

module.exports = router
