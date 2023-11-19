const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const verifyJWT = require('../middleware/verifyJWT')
// .get([verifyJWT],usersController.getAllUsers)
router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser)
    .delete(usersController.deleteUser)

module.exports = router