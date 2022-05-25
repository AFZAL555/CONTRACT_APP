const mongoose = require( "mongoose" );

const bidSchema = new mongoose.Schema( {

    projectname: {
        type: String,
        required: [ true, 'Please Enter Project Name !' ],
        trim: true,
        maxLength: [ 20, "Project name cannot exceed 100 charecters !" ]
    },
    postId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: [ true, 'Please Enter Budget Amunt !' ],
        maxLength: [ 10, "Budget Amount  cannot exceed 10 charecters !" ]
    },
    bidAmount: {
        type: Number,
        default: 0,
    },
    biduser: {
        type: String,
        default: "",
    },
    projectImage: {
        type: Array,
        required: [ true, 'Please Add Project Image !' ],
    },
    profilephoto: {
        type: Array,
        required: [ true ],
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    createdAt:
    {
        type: Date,
        default: Date.now
    }
} );

const Bid = mongoose.model( "Bids", bidSchema );
module.exports = { Bid };