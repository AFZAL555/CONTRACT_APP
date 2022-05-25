const mongoose=require("mongoose");

const converstaionSchema=new mongoose.Schema({
    members: {
        type: Array,
    },
}, {timestamps: true});

const Converstaion=mongoose.model("Converstaions", converstaionSchema);
module.exports={Converstaion};