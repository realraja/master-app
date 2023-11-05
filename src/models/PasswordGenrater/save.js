const { Schema, default: mongoose } = require("mongoose");


const saveSchema = new Schema({
    name: String,
    id: String,
    password:{
        type:String,
        required:true,
    },
    user:{
        type:String,
        required:true,
    },
    date:[String],
    createdAt:{
        type:Date,
        default : Date.now,
    }
})

const saved = mongoose.models.PG_saved || mongoose.model("PG_saved",saveSchema);

export default saved;