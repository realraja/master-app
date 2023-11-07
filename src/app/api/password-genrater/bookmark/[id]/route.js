import connectDB from "@/database";
import Bookmark from "@/models/PasswordGenrater/bookmarks";
import { NextResponse } from "next/server";


export const DELETE = async(req,{params}) =>{
    const {id} = params;
    if(!id){
        return NextResponse.json({
            status: 404,
            success: false,
            message:'Id not entered'
        })
    }
    console.log(id)
    try {
        connectDB();
        await Bookmark.deleteOne({_id:id});
        
        return NextResponse.json({
            status: 200,
            success : true,
            message: 'Bookmarks deleted successfully'
        })
    } catch (error) {
        console.log('error=>',error);
        return NextResponse.json({
            status: 200,
            success : false,
            message: 'Bookmarks fetched Unsuccessfully =>' + error.message
        })
    }
}

export const GET = async(req,{params}) =>{
    const {id} = params;
    try {
        connectDB();
        const bookmarks = await Bookmark.find({user:id});
        
        return NextResponse.json({
            status: 200,
            success : true,
            message: 'Bookmarks fetched successfully',
            bookmarks
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            status: 200,
            success : false,
            message: 'Bookmarks fetched Unsuccessfully =>' + error.message
        })
    }
}