import connectDB from "@/database"
import User from "@/models/user";
import { compare } from "bcryptjs";
import mongoose from "mongoose";


export const checkPassword = async(user, password) =>{
    mongoose.connection.close();
    await connectDB();
    const user2 = await User.findById(user);

    console.log(user2,user,password)
    const checkPassword = await compare(password,user2.password);
    console.log(checkPassword)

    return checkPassword;
}