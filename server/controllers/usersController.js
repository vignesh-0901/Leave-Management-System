const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean()
    if(!users?.length){
        return res.status(400).json({message: 'No user found'})
    }
    res.json(users)
})


const createNewUser = asyncHandler(async (req, res) => {
    const {username, name, password, role} = req.body

    if(!username || !password || !name || !role){
        return res.status(400).json({message: 'All feilds are required'})
    }

    const duplicate = await User.findOne({ username }).lean().exec()

    if(duplicate){
        return res.status(409).json({ message: 'User already EXISTS'})
    }

    const hashedPwd = await bcrypt.hash(password, 10)
    const userObject = { username, "password": hashedPwd, role, name}
    const user = await User.create(userObject)

    if(user){
        res.status(201).json({message: `New ${role} ${name} created`,success:true})
    } else {
        res.status(400).json({message: 'Invalid user data received'})
    }
})


const deleteUser = asyncHandler(async (req, res) => {
    const { username } = req.body
    if(!username){
        return res.status(400).json({message: 'Username Required'})
    }
    const user = await User.findOne({username}).exec()

    if(!user){
        return res.status(400).json({message:'User not found'})
    }
    const result = await user.deleteOne()
    const reply = `User ${result.name} with username ${user.username} deleted successfully`
    res.json(reply)
})


module.exports = { createNewUser, getAllUsers, deleteUser }
