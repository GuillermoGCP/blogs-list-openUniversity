const express = require('express')
const { resetDb } = require('../controllers/index.js')
const router = express.Router()

router.post('/reset', resetDb)

module.exports = router
