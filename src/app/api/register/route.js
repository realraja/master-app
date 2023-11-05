import { NextResponse } from "next/server";
import connectDB from "../../../database";
import User from '../../../models/user'

import validator from "validator";
import jwt from "jsonwebtoken";
import { hash } from "bcryptjs";


export const POST = async(req)=>{



  

    const {name,email,phone,password} = await req.json();

    if(!name || !email || !phone || !password){
        return NextResponse.json({
            status: 404,
            success : false,
            message : 'please fill all the required fields'
        })
    }
    if(!validator.isEmail(email)){
        return NextResponse.json({
            status: 404,
            success : false,
            message : 'Please enter a vailid email addresss.'
        })
    }

    if(phone.length != 12){
        return NextResponse.json({
            status: 404,
            success : false,
            message : 'Please enter a vailid phone number.'
        }) 
    }

    if(password.length <= 5){
        return NextResponse.json({
            status: 404,
            success : false,
            message : 'Your password must be at least 6 characters.'
        })
    }

    
    try {
        await connectDB();
        const isExistEmail = await User.findOne({ email });
        const isExistPhone = await User.findOne({ phone });

        if(isExistEmail || isExistPhone) {
            return NextResponse.json({
                status: 404,
                success:false,
                message : 'You are already a user please login'
            });
        }

     

            const cookieCheck = await jwt.sign(password,'Rajesh@9803<key');
            const hashPassword = await hash(password,10);

            const NewUser = await User.create({
                name,email,password:hashPassword,phone,cookieCheck,date:[new Date().getSeconds(),new Date().getMinutes(),new Date().getHours(),new Date().getDate(),new Date().getMonth(),new Date().getFullYear()]
            }) 

            return NextResponse.json({
                status: 201,
                success: true,
                message : 'Your are registered successfully!',
                user:NewUser
            })
        

        
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 404,
            success:false,
            message : 'there was an error'+ error.message
        });
    }
}





/*
export const PUT = async(request) =>{
    const {id,cookie} = await request.json();
    console.log(id,cookie);

    if(!cookie || !id){
        return NextResponse.json({
            status: 404,
            success : false,
            message : 'please fill all the required fields'
        })
    }
    try {
        await connectDB();
        const user = await User.findById(id);
        if(!user){
            return NextResponse.json({
                status: 404,
                success : false,
                post:'user not found'
            })
        }

        user.friends.user1 = cookie;
        const NewUser2 = await user.save();
     
        return NextResponse.json({stauts:200,success:true,message:'User successfully registerd',user,NewUser2});
    } catch (error) {
        console.log("error===>",error);
        return NextResponse.json({
            status: 404,
            success : false,
            message:error.message
        })
    }
}

*/