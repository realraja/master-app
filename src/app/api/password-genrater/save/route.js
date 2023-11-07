
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import User from "@/models/user";
import connectDB from "@/database";
import { compare } from "bcryptjs";
import saved from "@/models/PasswordGenrater/save";



export const POST = async(req) =>{
    const {user, password,name,id,checkPass} = await req.json();
    if(!user || !password  || !checkPass){
        return NextResponse.json({
            success: false,
            message: "please fill id and password"
        })
    }

    try {
        await connectDB();
        const isUser = await User.findById(user);
        if(!isUser){
            return NextResponse.json({
                success:false,
                message: 'Your are not user please login!'
            })
        }

        const isPassRight = await compare(checkPass,isUser.password);

        if(!isPassRight){
            return NextResponse.json({
                success:false,
                message: 'Please Check your password'
            })
        }

        const hashPass = await jwt.sign(password,'Rajesh8875')

        const newSave = await saved.create({
            password:hashPass,user,name,id,date:[new Date().getSeconds(),new Date().getMinutes(),new Date().getHours(),new Date().getDate(),new Date().getMonth(),new Date().getFullYear()]
        })

        return NextResponse.json({
            success:true,
            message: 'Save successfully',
            saved: newSave
        })
    } catch (error) {
        console.log('error ==>',error);
        return NextResponse.json({
            success:true,
            message: error.message
        })
    }
}

