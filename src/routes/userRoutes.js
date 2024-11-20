const express = require('express')
const { createUser, getAllUsers, login } = require('../controllers/index.js')
const router = express.Router()

router.post('/', createUser)
router.get('/', getAllUsers)
router.post('/login', login)

module.exports = router
