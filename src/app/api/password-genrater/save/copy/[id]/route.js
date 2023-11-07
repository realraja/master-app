import connectDB from "@/database";
import saved from "@/models/PasswordGenrater/save";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export const GET = async (req,{params})=>{
    const {id} = params;
    try {
        await connectDB();
        const save = await saved.findById(id);

        const password = jwt.verify(save.password,'Rajesh8875')
        return NextResponse.json({
            status: 200,
            success: true,
            message:'Saved password successfully fetched',
            password
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            status: 400,
            success: false,
            message: error.message,
        })
    }
}