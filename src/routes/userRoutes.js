const express = require('express')
const { createUser, getAllUsers } = require('../controllers/index.js')
const router = express.Router()

router.post('/api/users', createUser)
router.get('/api/users', getAllUsers)

module.exports = router
