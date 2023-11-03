import { NextResponse } from "next/server";
import User from "../../../models/user";
import connectDB from '@/database/index'
import  jwt  from "jsonwebtoken";
import { compare } from "bcryptjs";

import validator from "validator";

export const POST = async (req) => {


    const { userId, password } = await req.json();
    if (!userId ) {
        return NextResponse.json({
          status: 404,
          success: false,
          message: "please fill all the required fields",
        });
      }

      if (isNaN(userId*1)) {
        if (!validator.isEmail(userId)) {
          return NextResponse.json({
            status: 404,
            success: false,
            message: "Please enter a vailid email addresss.",
          });
        }
        
      } else {
        if (userId.length != 12) {
          return NextResponse.json({
            status: 404,
            success: false,
            message: "Please enter a vailid phone number.",
          });
        }
      }
   

   
  try {
    await connectDB();
    let isExistUser;
    if(isNaN(userId*1)){
        isExistUser = await User.findOne({ email:userId });
    }else{
        isExistUser = await User.findOne({ phone:userId });
    }

    if (!isExistUser) {
      return NextResponse.json({
        status: 404,
        success: false,
        message: "You are not a user please Register",
      });
    }


      const checkPassword = await compare(password,isExistUser.password);
        

        if(!checkPassword){
            return NextResponse.json({
                status: 400,
                success: false,
                message: "Please check your password and try again.",
              });
            }

           const cookie =  await jwt.sign({_id: isExistUser?._id},'Rajesh@9803<key');
           isExistUser.friends.user1 = isExistUser.friends.user2;
           isExistUser.friends.user2 = cookie;
            await isExistUser.save();
    
        return NextResponse.json({
            status: 200,
            success: true,
            message: 'user has been logged in successfully',
            isExistUser,cookie
        });
    

    

      
    
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 404,
      success: false,
      message: "there was an error " + error.message,
    });
  }
};


