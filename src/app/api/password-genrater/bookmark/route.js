import connectDB from "@/database";
import Bookmark from "@/models/PasswordGenrater/bookmarks";
import { NextResponse } from "next/server";




export const POST = async(req) =>{
    const {user, password} = await req.json();
    if(!user || !password){
        return NextResponse.json({
            success: false,
            message: "please fill username or password"
        })
    }

    try {
        await connectDB()
        const isBookmarked = await Bookmark.findOne({password});
        if(isBookmarked) {
            return NextResponse.json({
                success: false,
                message: 'already bookmarked same password'
            })
        }

        const newBookmark = await Bookmark.create({
            password,user,date:[new Date().getSeconds(),new Date().getMinutes(),new Date().getHours(),new Date().getDate(),new Date().getMonth(),new Date().getFullYear()]
        })

        return NextResponse.json({
            success:true,
            message: 'bookmarked successfully',
            bookmark: newBookmark
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success:true,
            message: error.message
        })
    }
}


export const GET = async(req) =>{
    try {
        connectDB();
        const bookmarks = await Bookmark.find();
        
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