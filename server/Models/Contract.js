const mongoose = require( "mongoose" );

const contractSchema = new mongoose.Schema( {
    projectname: {
        type: String,
        required: [ true, 'Please Enter Project Name !' ],
        trim: true,
    },
    description1: {
        type: String,
        required: [ true, 'Please Enter Project Description !' ]
    },
    description2: {
        type: String,
        required: [ true, 'Please Enter Project Description !' ]
    },
    description3: {
        type: String,
        required: [ true, 'Please Enter Project Description !' ]
    },
    description4: {
        type: String,
        required: [ true, 'Please Enter Project Description !' ]
    },
    description5: {
        type: String,
        required: [ true, 'Please Enter Project Description !' ]
    },
    userId: {
        type: String,
        required: true,
    },
    biduserId: {
        type: String,
        default: "",
    },
    userName: {
        type: String,
        required: true,
    },
    contractoruserName: {
        type: String,
        required: true,
    },
    usermobileNumber: {
        type: String,
        required: true
    },
    contractormobileNumber: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: [ true, 'Please Enter Budget Amunt !' ],
    },
    bidAmount: {
        type: Number,
        default: 0,
    },
    projectImage: {
        type: Array,
        required: [ true, 'Please Add Project Image !' ],
    },
    userprofilephoto: {
        type: Array,
        required: [ true ],
    },
    contractorprofilephoto: {
        type: Array,
        required: [ true ],
    },
    postcreatedAt: {
        type: Date,
        required: [ true ],
    },
    createdAt:
    {
        type: Date,
        default: Date.now
    }
} );
const Contract = mongoose.model( "Contracts", contractSchema );
module.exports = { Contract };