
import connectDB from '@/database/index'
import AllApps from "@/models/allApps";
import { NextResponse } from 'next/server';

export const PUT = async(req) =>{
    await connectDB();

    
    const {id,userId} = await req.json();
    try {
        const app = await AllApps.findById(id);
        if(!app){
            return NextResponse.json({
                status: 404,
                success : false,
                message:'app not found'
            })
        }

        app.shares.push({userId:userId,
            date:[new Date().getSeconds(),new Date().getMinutes(),new Date().getHours(),new Date().getDate(),new Date().getMonth(),new Date().getFullYear()]});
        app.save();
        return NextResponse.json({stauts:200,success:true,message:'app fetch successfully',app:app});
        

        
    } catch (error) {
        console.log("error===>",error);
        return NextResponse.json({
            status: 404,
            success : false,
            message:error
        })
    }
}