import connectDB from "@/database";
import saved from "@/models/PasswordGenrater/save";
import { NextResponse } from "next/server";

export const GET = async (req,{params})=>{
    const {id} = params;
    if(!id){
        return NextResponse.json({
            status: 404,
            success: false,
            message:'Id not entered'
        })
    }
    try {
        await connectDB();
        const save = await saved.find({user:id});
        return NextResponse.json({
            status: 200,
            success: true,
            message:'Saved password successfully fetched',
            saveData: save
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
export const DELETE = async (req,{params})=>{
    const {id} = params;
    if(!id){
        return NextResponse.json({
            status: 404,
            success: false,
            message:'Id not entered'
        })
    }
    try {
        await connectDB();
        await saved.deleteOne({_id:id});
        
        return NextResponse.json({
            status: 200,
            success : true,
            message: 'deleted password successfully'
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