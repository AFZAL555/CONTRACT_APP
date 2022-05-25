const mongoose = require( "mongoose" );

const postSchema = new mongoose.Schema( {
    projectname: {
        type: String,
        required: [ true, 'Please Enter Project Name !' ],
        trim: true,
        maxLength: [ 20, "Project name cannot exceed 100 charecters !" ]
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
    likeusers: {
        type: Array,
    },
     likes: {
        type: Number,
        default: 0,
    },
    createdAt:
    {
        type: Date,
        default: Date.now
    }
} );

const Post = mongoose.model( "Posts", postSchema );
module.exports = { Post };
