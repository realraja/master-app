const { Schema, default: mongoose } = require("mongoose");


const BookmarkSchema = new Schema({
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

const Bookmark = mongoose.models.PG_Bookmark || mongoose.model("PG_Bookmark",BookmarkSchema);

export default Bookmark;