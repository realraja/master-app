
import connectDB from '@/database/index'
import AllApps from "@/models/allApps";
import { NextResponse } from 'next/server';
import jwt from "jsonwebtoken";

export const PUT = async(req) =>{
    await connectDB();

    
    const {id,token} = await req.json();

    if(!id || !token){
        return NextResponse.json({
            status: 404,
            success : false,
            message:'please login to like'
        })
    }
    const userId = jwt.verify(token,'Rajesh@9803<key');
    try {
        const app = await AllApps.findById(id);
        if(!app){
            return NextResponse.json({
                status: 404,
                success : false,
                message:'app not found'
            })
        }

        function checkUserId(ids) {
            return ids.userId === userId._id;
        }
        function filterUserId(ids) {
            return ids.userId !== userId._id;
        }

        if(app.liked.find(checkUserId) === undefined){
            app.liked.push({userId:userId._id,
                date:[new Date().getSeconds(),new Date().getMinutes(),new Date().getHours(),new Date().getDate(),new Date().getMonth(),new Date().getFullYear()]});
            app.save();
            return NextResponse.json({stauts:200,success:true,message:'liked successfully',app:app});
        }else{
            // console.log(app.liked.filter(filterUserId));
            app.liked = app.liked.filter(filterUserId);
            app.save();
            return NextResponse.json({stauts:200,success:true,message:'liked removed successfully',app:app});
        }
        
        

        
    } catch (error) {
        console.log("error===>",error);
        return NextResponse.json({
            status: 404,
            success : false,
            message:error
        })
    }
}