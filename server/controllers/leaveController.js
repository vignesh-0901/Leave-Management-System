const User = require('../models/User')
const Leave = require('../models/Leave')
const asyncHandler = require('express-async-handler')

const getAllLeave = asyncHandler(async (req, res) => {
    const data = await Leave.find().lean()
    if(!data?.length){
        return res.status(400).json({message: 'No Leave Request Found'})
    }
    const leaveList = data.map( l =>{ return { id: l._id, ...l}})
    res.json(leaveList)
})

const createNewLeave = asyncHandler(async (req, res) => {
    const {studentId, facultyId, description, status} = req.body
    if(!studentId || !facultyId || !description ){
        return res.status(400).json({message: 'All feilds are required'})
    }
    const leaveObject = {studentId, facultyId, description, status}
    const leave = await Leave.create(leaveObject)

    if(leave){
        res.status(201).json({message: `New Leave Request created successfully`})
    } else {
        res.status(400).json({message: 'Invalid user data received'})
    }
})

const updateLeave = asyncHandler(async (req,res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    const id = req.params.id;
    Leave.findByIdAndUpdate(id,req.body,{useFindAndModify:false}).then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        } else res.send({ message: "Tutorial was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
    
})


module.exports = {createNewLeave, getAllLeave, updateLeave};