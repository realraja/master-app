import mongoose from "mongoose";


const connectDB = async() =>{

    try{
        const {connection} = await mongoose.connect('mongodb+srv://realllraja0:PJfrderdIKFIBevQ@cluster0.qxoyqkr.mongodb.net/',{

        });
        console.log("MongoDB Connected local",connection.host)
    }catch(err){
        console.log('error=>',err)
    }
}

export default connectDB;