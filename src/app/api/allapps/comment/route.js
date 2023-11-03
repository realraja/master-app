
import connectDB from '@/database/index'
import AllApps from "@/models/allApps";
import { NextResponse } from 'next/server';

export const PUT = async(req) =>{
    await connectDB();

    
    const {id} = await req.json();
    try {
        const app = await AllApps.findById(id);
        if(!app){
            return NextResponse.json({
                status: 404,
                success : false,
                message:'app not found'
            })
        }

        app.comments += 1;
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