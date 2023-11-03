import { NextResponse } from "next/server";
import connectDB from '@/database/index'
import AllApps from "../../../models/allApps";
import  jwt  from "jsonwebtoken";

export const POST = async (req) => {

    const { name,id,icon,userId} = await req.json();
    if (!name || !id || !icon || !userId ) {
        return NextResponse.json({
          status: 404,
          success: false,
          message: "please fill all the required fields",
        });
      }

      let tokenData = jwt.verify(userId,'Rajesh@9803<key');

  try {
    await connectDB();

    const isExistApp = await AllApps.findOne({id})
    

    if (isExistApp) {
      return NextResponse.json({
        status: 404,
        success: false,
        message: "This id is already in use please try another id.",
      });
    }


    const NewApp = await AllApps.create({
        name,id,icon,userId:tokenData._id,date:[new Date().getSeconds(),new Date().getMinutes(),new Date().getHours(),new Date().getDate(),new Date().getMonth(),new Date().getFullYear()]
    })

    
    

    return NextResponse.json({
        status: 201,
        success: true,
        message : 'Your app successfully added!',
         NewApp
    })
    

      
    
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 404,
      success: false,
      message: "there was an error " + error.message,
    });
  }
};

export const PUT = async (req) => {

  const { name,id,icon,userId,_id} = await req.json();
  if (!name || !id || !icon || !userId || !_id ) {
      return NextResponse.json({
        status: 404,
        success: false,
        message: "please fill all the required fields",
      });
    }

    let tokenData = jwt.verify(userId,'Rajesh@9803<key');

try {
  await connectDB();

  const isExistApp = await AllApps.findById(_id)
  

  if (!isExistApp) {
    return NextResponse.json({
      status: 404,
      success: false,
      message: "this app does not exist.",
    });
  }

  if(isExistApp.name === name && isExistApp.id === id && isExistApp.icon === icon  ){
    return NextResponse.json({
      status: 404,
      success: false,
      message: "please change something to update.",
    });
  }

 if(isExistApp.userId !== tokenData._id){
  return NextResponse.json({
    status: 404,
    success: false,
    message: "only uploader can update this app.",
  });
 }

 isExistApp.name = name;
 isExistApp.id = id;
 isExistApp.icon = icon;
 isExistApp.show = false;

 await isExistApp.save();

  
  

  return NextResponse.json({
      status: 201,
      success: true,
      message : 'Your app updated successfully!',
      isExistApp
  })
  

    
  
} catch (error) {
  console.log(error);
  return NextResponse.json({
    status: 404,
    success: false,
    message: "there was an error " + error.message,
  });
}
};

export const GET = async(req) =>{
    
    try {
        await connectDB();
        const allApps = await AllApps.find();
        return NextResponse.json({
            status: 200,
            success: true,
            message: 'apps fetched successfully',
            apps: allApps
        })
    } catch (error) {
        console.log('all users error ==>',error);
        return NextResponse.json({
            status:400,
            success: false,
            message: 'Error fetching App data',
            data: error
        })
    }
}


