const express = require('express')
const router = express.Router()
const leaveController = require('../controllers/leaveController')
const verifyJWT = require('../middleware/verifyJWT')

router.route('/')
    .get(leaveController.getAllLeave)
    .post(leaveController.createNewLeave)
router.route('/:id').put(leaveController.updateLeave)

module.exports = router