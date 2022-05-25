const mongoose = require( "mongoose" );

const planSchema = new mongoose.Schema( {
    planName: {
        type: String,
        required: true,
        trim: true,
    },
    planrate: {
        type: Number,
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
    premium: {
        type: Boolean,
        default: true
    },
    createdAt:
    {
        type: Date,
    },
    expireAt: {
        type: Date,
        expires: 0,
    },
} );

const Plan = mongoose.model( "Plans", planSchema );
module.exports = { Plan };