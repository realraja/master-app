
import connectDB from '@/database/index'
import AllApps from "@/models/allApps";
import { NextResponse } from 'next/server';

export const PUT = async(req,{params}) =>{
    await connectDB();

    const id = params.id;
    const {password} = await req.json();
    console.log(id,password)
    try {
        const app = await AllApps.findById(id);
        if(!app){
            return NextResponse.json({
                status: 404,
                success : false,
                message:'app not found'
            })
        }

        if(password === 'updatepass'){
            app.show = !app.show;
        app.save();

        return NextResponse.json({stauts:200,success:true,message:'app fetch successfully',app:app});
        }else{
            return NextResponse.json({stauts:400,success:false,message:'Please check your password'});
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