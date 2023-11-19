const mongoose = require('mongoose')

const leaveSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true,
        ref: 'User'
    },
    facultyId: {
        type: String,
        required: true,
        ref: 'User'
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
}
)

module.exports = mongoose.model('Leave', leaveSchema)