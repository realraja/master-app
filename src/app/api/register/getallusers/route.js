import connectDB from "@/database"
import User from "@/models/user";
import { NextResponse } from "next/server";


export const GET = async() =>{
    try {
        await connectDB();
        const user = await User.find();

        return NextResponse.json({
            status: 200,
            success:true,
            user: user
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 400,
            success:false,
            user: error.message
        })
    }
}