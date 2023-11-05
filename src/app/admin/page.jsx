'use client'
import Link from 'next/link'
import React, { useState ,useContext, useEffect} from 'react'
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";

import {BsArrowLeft} from 'react-icons/bs'
import {IoAddCircleOutline, IoAddCircleSharp } from 'react-icons/io5'
import {AiFillEye, AiFillEyeInvisible, AiFillHeart } from 'react-icons/ai'
import { FaRegCommentDots, FaRegEdit, FaShare } from 'react-icons/fa'
import { GlobalContext } from '@/context';
import { BeatLoader, ClockLoader, GridLoader } from 'react-spinners';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';



const page = () => {
    const [confirmState,setConfirmState] = useState(false);
    const [updateConfirmState,setUpdateConfirmState] = useState(false);
    const [updateShowConfirmState,setUpdateShowConfirmState] = useState(false);
    const [item,setItem] = useState({});
    const [loading,setLoading] = useState(true);

    const [allAppData,setAllAppData] = useState([]);

    const {isAdmin} = useContext(GlobalContext);

    const router = useRouter();

    const fetchAllUsers = async() =>{
      try {
        const {data} = await axios.get('/api/allapps')
      if(data.success){
        setLoading(false);
      setAllAppData(data.apps);
      }else{
        toast.error(data.message + 'try again later');
        router.push('/');
      }
      } catch (error) {
        toast.error(error.message + 'try again later');
        router.push('/');
      }
      
      
    }

    
    useEffect(()=>{
       fetchAllUsers();
      
    },[]);
  return (!isAdmin? <div className='min-h-[80vh] flex flex-col justify-center items-center text-3xl text-rose-500 space-y-5'><ClockLoader size={180} color="#F43F5E" /><h1>Sorry only Admin Can view This Page</h1><div className='flex justify-center items-center my-4 cursor-pointer  '><button onClick={()=> setConfirmState(true)} className="active:scale-105 duration-75 inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-r from-rose-600 to-violet-500 group-hover:from-rose-600 group-hover:to-violet-500 hover:text-white dark:text-white  focus:outline-none ">
  <span className="flex justify-center items-center px-8 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
    <BsArrowLeft className='mr-3 w-6 h-6' />
      Go Back Home
  </span>
</button>
        </div></div>:
    <div>

        <div className='bg-gradient-to-r from-rose-800 to-rose-400 rounded text-4xl w-[90%] m-auto py-3 my-3 text-center'>
          <h1>Your All Apps</h1>
        </div>
        
        
        
        {loading?<div className='h-[40vh] w-full flex flex-col items-center justify-center'> <GridLoader speedMultiplier={2} color='red' size={40} /> </div> :<><div className='flex justify-center items-center my-4 cursor-pointer  '><button onClick={()=> setConfirmState(true)} className="active:scale-105 duration-75 inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-r from-rose-600 to-violet-500 group-hover:from-rose-600 group-hover:to-violet-500 hover:text-white dark:text-white  focus:outline-none ">
  <span className="flex justify-center items-center px-8 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
    <IoAddCircleOutline className='mr-3 w-6 h-6' />
      Add App
  </span>
</button>
        </div>

<TheAddAppForm comfirmState={confirmState} setComfirmState={setConfirmState} runFunction={fetchAllUsers} />
 {updateConfirmState && <TheUpdateAppForm comfirmState={updateConfirmState} setComfirmState={setUpdateConfirmState} item={item} runFunction={fetchAllUsers} />}
 {updateShowConfirmState && <TheUpdateAppShow comfirmState={updateShowConfirmState} setComfirmState={setUpdateShowConfirmState} item={item} runFunction={fetchAllUsers} />}
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="align-middle inline-block min-w-full">
              <div className="shadow overflow-hidden">
                <table className="table-fixed min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-900">
                    <tr>
                      <th className="uppercase px-2 py-4 md:p-4">
                        name
                      </th>
                      <th className="uppercase p-4 hidden md:table-cell">
                        icon
                      </th>
                      <th className="uppercase px-2 py-4 md:p-4">
                        web
                      </th>
                      <th className="uppercase p-4 hidden md:table-cell">
                        Created
                      </th>
                      <th className="uppercase px-2 py-4 md:p-4">
                        Status
                      </th>
                      <th className="uppercase px-2 py-4 md:p-4">Edit
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-700 text-white divide-y divide-gray-200">

                    {
                      allAppData.map((item)=>{
                        const iconObj = {__html:item.icon};
                       return <AppsTableBody router={router} likes={item.liked} shares={item.shares} comments={item.comments} id={item.id} key={item._id} name={item.name} views={item.views} icon={<div className='w-8 h-8 ' dangerouslySetInnerHTML={iconObj} />} show={item.show} createdAt={item.date} handleEdit={()=>{setItem(item); setUpdateConfirmState(true)}} handleUpdate={()=> {setUpdateShowConfirmState(true); setItem(item)}}  />
})
                    }
                  
                  </tbody>
                </table>

              </div>
            </div>
          </div>
        </div></>}

    </div>
  )
}


const AppsTableBody = ({router,id,name,icon,show,views,likes,comments,shares,createdAt,handleUpdate,handleEdit}) =>(
    
    <tr className="hover:bg-gray-900">
        
       

        

        <td onClick={() => router.push(`/${id}`)} className="p-2 md:p-4 text-center  hover:scale-125  duration-300 cursor-pointer text-base font-medium text-gray-50"> {name}</td>
        <td onClick={() => router.push(`/${id}`)} className="p-4 hover:scale-125 duration-150 cursor-pointer text-center hidden md:table-cell  text-base font-medium text-rose-500">
          <div className='flex justify-center items-center'>{icon}</div>
          </td>
        <td className="pp-2 md:p-4   text-base font-medium text-gray-50">
        <div className='flex items-center justify-around space-x-1'>
            <span  className='text-center justify-center'>
              <AiFillEye className='hover:text-blue-800 text-xl cursor-pointer hover:scale-125 m-auto duration-150' />
              <p className='text-sm'>{views?.length || 0}</p>
            </span>
             <span  className='text-center justify-center'>
              <AiFillHeart className='hover:text-rose-500 text-xl cursor-pointer hover:scale-125 m-auto duration-150' />
              <p className='text-sm'>{likes?.length || 0}</p>
            </span>
             <span  className='text-center justify-center hidden sm:table-cell'>
              <FaRegCommentDots className='hover:text-gray-300 text-xl cursor-pointer m-auto hover:scale-125 duration-150' />
              <p className='text-sm'>{comments || 0}</p>
            </span>
             <span  className='text-center justify-center hidden sm:table-cell'>
              <FaShare className='hover:text-violet-700 text-xl cursor-pointer hover:scale-125 m-auto duration-150' />
              <p className='text-sm'>{shares?.length || 0}</p>
            </span>

          </div>
        </td>
        <td className="p-4 text-center hidden md:table-cell  text-base font-medium text-gray-50">{createdAt[3]}-{createdAt[4]}-{createdAt[5]}</td>
        <td className="p-2 md:p-4 text-center  text-base font-medium text-gray-50">
         {
          show ?(
              <AiFillEye className="h-6 w-6 text-green-400 m-auto " />
          ):(
              <AiFillEyeInvisible className="h-6 w-6  text-red-500 m-auto" />
          )
         } 
        </td>
        <td className="p-2 md:p-4  ">
          <div className="flex justify-around">
            {
              !show?(
                <button type="button" onClick={handleUpdate} data-modal-toggle="user-modal"
                  className="text-white m-1 bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-green-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center ">
                  <AiFillEye className="h-5 w-5 mx-2 hover:scale-125 duration-300" />
            <span className="hidden md:block">show</span>
                  
                  
                </button>
              ):(
                <button type="button" onClick={handleUpdate} data-modal-toggle="user-modal"
                  className="text-white m-1 bg-violet-600 hover:bg-violet-800 focus:ring-4 focus:ring-violet-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center ">
                  <AiFillEyeInvisible className="h-5 w-5 mx-2 hover:scale-125 duration-300" />
            <span className="hidden md:block">hide</span>
                  
                </button>
              )
            }

            <button type="button" onClick={handleEdit} data-modal-toggle="delete-user-modal"
            className="text-white m-1 bg-rose-600 hover:bg-rose-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center ">
            <FaRegEdit className="h-5 w-5 mx-2 hover:scale-125 duration-300"/>
            <span className="hidden md:block">Edit</span>
          </button>
          </div>
        </td>
      </tr>
)


const TheUpdateAppShow = (
 { comfirmState,setComfirmState,runFunction,item}
) => {
    const [password,setPassword] = useState('');
    const [loading,setLoading] = useState(false);

    const handleUpdateApp = async() =>{
setLoading(true);

try {
    const {data} = await axios.put(`/api/allapps/${item._id}`,{
        password
    })

    if(data.success){
      // console.log(data.app)
        setLoading(false);
        setComfirmState(false);
        runFunction()
    }else{
        toast.error(data.message);
        setLoading(false);
    }
} catch (error) {
    console.log(error);
    toast.error(error.message);
    setLoading(false);
}

    }

  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={comfirmState || false} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => setComfirmState(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray-200 text-left shadow-xl transition-all sm:my-8 w-full  sm:max-w-lg">
                <div className="bg-gray-200 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="">
                    <div className="mx-auto flex h-16 w-16 text-rose-500 flex-shrink-0 items-center justify-center rounded-full bg-red-100 ">
                      {item.show?<AiFillEyeInvisible className='h-8 w-8 hover:scale-150 duration-300 ' />:<AiFillEye className='h-8 w-8 hover:scale-150 duration-300 ' />}
                      
                    </div>
                    <div className="mt-3 text-center">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Update Show
                      </Dialog.Title>
                      <div className="m-5 text-sm text-black">
                        <p className=' text-black  bg-gray-200 px-2  absolute z-0 -mt-3 ml-1 rounded'>Password</p>
                        <input value={password} onChange={(e)=> setPassword(e.target.value)} className='w-full  border focus:outline-none focus:border-white p-2 m-0  text-base block border-gray-700 rounded-md' type="text" placeholder='enter here update password' />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-300 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={handleUpdateApp}
                  >
                    <div className='flex justify-center items-center'>
                    {loading? <BeatLoader className=' self-center' color="white" />: item.show?'Hide App':'Show App'}

                    </div>
                    
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => {
                        setComfirmState(false);
                      }}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
const TheUpdateAppForm = (
 { comfirmState,setComfirmState,runFunction,
  item}
) => {
    const [name,setName] = useState(item.name);
    const [id,setId] = useState(item.id);
    const [icon,setIcon] = useState(item.icon);
    const [loading,setLoading] = useState(false);

    const {token} = useContext(GlobalContext);

    // console.log(item)

    const handleUpdateApp = async() =>{
// console.log(token,id,icon,name)
setLoading(true);

try {
    const {data} = await axios.put('/api/allapps',{
        name,id,icon,userId:token,_id:item._id
    })

    if(data.success){
      console.log(data.isExistApp)
        toast.success(data.message);
        setLoading(false);
        setComfirmState(false);
        runFunction()
    }else{
        toast.error(data.message);
        setLoading(false);
    }
} catch (error) {
    console.log(error);
    toast.error(error.message);
    setLoading(false);
}

    }

  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={comfirmState || false} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => setComfirmState(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray-200 text-left shadow-xl transition-all sm:my-8 w-full  sm:max-w-lg">
                <div className="bg-gray-200 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="">
                    <div className="mx-auto flex h-16 w-16 text-rose-500 flex-shrink-0 items-center justify-center rounded-full bg-red-100 ">
                      <FaRegEdit className='h-8 w-8 hover:scale-150 duration-300 ' />
                    </div>
                    <div className="mt-3 text-center">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Update App
                      </Dialog.Title>
                      <div className="m-5 text-sm text-black">
                        <p className=' text-black  bg-gray-200 px-2  absolute z-0 -mt-3 ml-1 rounded'>Name</p>
                        <input value={name} onChange={(e)=> setName(e.target.value)} className='w-full  border focus:outline-none focus:border-white p-2 m-0  text-base block border-gray-700 rounded-md' type="text" placeholder='enter here app name' />
                      </div>
                      <div className="m-5 text-sm text-black">
                        <p className=' text-black  bg-gray-200 px-2  absolute z-0 -mt-3 ml-1 rounded'>App Id</p>
                        <input value={id} onChange={(e)=> setId(e.target.value.toLowerCase().replaceAll(' ', '-'))} className='w-full  border focus:outline-none focus:border-white p-2 m-0  text-base block border-gray-700 rounded-md' type="text" placeholder='enter here app Id' />
                      </div>
                      <div className="m-5 text-sm text-black">
                        <p className=' text-black  bg-gray-200 px-2  absolute z-0 -mt-3 ml-1 rounded'>App icon code:</p>
                        <textarea value={icon} onChange={(e)=> setIcon(e.target.value.replaceAll('class="w-6 h-6"', '').replaceAll('width="16" height="16"', ''))} rows="6" className="block p-2.5 w-full text-sm  rounded-lg shadow-sm border  focus:ring-primary-500 focus:border-primary-500 bg-gray-800 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500" placeholder="Leave a comment..."></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-300 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={handleUpdateApp}
                  >
                    <div className='flex justify-center items-center'>
                    {loading? <BeatLoader className=' self-center' color="white" />:'Update App'}

                    </div>
                    
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => {
                        setComfirmState(false);
                      }}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};



const TheAddAppForm = ({
  comfirmState,
  setComfirmState,
  runFunction
}) => {

    const [name,setName] = useState('');
    const [id,setId] = useState('');
    const [icon,setIcon] = useState('');
    const [loading,setLoading] = useState(false);

    const {token} = useContext(GlobalContext);

    

    const handleAddApp = async() =>{
// console.log(token,id,icon,name)
setLoading(true);

try {
    const {data} = await axios.post('/api/allapps',{
        name,id,icon,userId:token
    })

    if(data.success){
        toast.success(data.message);
        setLoading(false);
        setComfirmState(false);
        runFunction()
    }else{
        toast.error(data.message);
        setLoading(false);
    }
} catch (error) {
    console.log(error);
    toast.error(error.message);
    setLoading(false);
}

    }

  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={comfirmState} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => setComfirmState(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray-200 text-left shadow-xl transition-all sm:my-8 w-full  sm:max-w-lg">
                <div className="bg-gray-200 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="">
                    <div className="mx-auto flex h-16 w-16 text-rose-500 flex-shrink-0 items-center justify-center rounded-full bg-red-100 ">
                      <IoAddCircleSharp className='h-8 w-8 hover:scale-150 duration-300 ' />
                    </div>
                    <div className="mt-3 text-center">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Add A New App
                      </Dialog.Title>
                      <div className="m-5 text-sm text-black">
                        <p className=' text-black  bg-gray-200 px-2  absolute z-0 -mt-3 ml-1 rounded'>Name</p>
                        <input value={name} onChange={(e)=> setName(e.target.value)} className='w-full  border focus:outline-none focus:border-white p-2 m-0  text-base block border-gray-700 rounded-md' type="text" placeholder='enter here app name' />
                      </div>
                      <div className="m-5 text-sm text-black">
                        <p className=' text-black  bg-gray-200 px-2  absolute z-0 -mt-3 ml-1 rounded'>App Id</p>
                        <input value={id} onChange={(e)=> setId(e.target.value.toLowerCase().replaceAll(' ', '-'))} className='w-full  border focus:outline-none focus:border-white p-2 m-0  text-base block border-gray-700 rounded-md' type="text" placeholder='enter here app Id' />
                      </div>
                      <div className="m-5 text-sm text-black">
                        <p className=' text-black  bg-gray-200 px-2  absolute z-0 -mt-3 ml-1 rounded'>App icon code:</p>
                        <textarea value={icon} onChange={(e)=> setIcon(e.target.value.replaceAll('class="w-6 h-6"', '').replaceAll('width="16" height="16"', ''))} rows="10" className="block p-2.5 w-full text-sm  rounded-lg shadow-sm border  focus:ring-primary-500 focus:border-primary-500 bg-gray-800 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500" placeholder="Leave a comment..."></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-300 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={handleAddApp}
                  >
                    <div className='flex justify-center items-center'>
                    {loading? <BeatLoader className=' self-center' color="white" />:'Add App'}

                    </div>
                    
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => {
                        setComfirmState(false);
                      }}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

  

export default page
