"use client";
import { GlobalContext } from "@/context";
import axios from "axios";
import Link from "next/link";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { MdDelete} from "react-icons/md";
import { AiFillSave, AiFillStar } from "react-icons/ai";
import { ImExit } from "react-icons/im";
import { IoCopyOutline } from "react-icons/io5";
import { TheAddPassForm } from "./components/savePass";
import { PropagateLoader } from "react-spinners";

import './components/style.css';  
import { TheDeletePassForm } from "./components/deleteSavePass";
const page = () => {
  const [password, setPassword] = useState("");
  const [passLength, setPassLenght] = useState(12);
  const [isCaps, setIsCaps] = useState(true);
  const [isNumber, setIsNumber] = useState(true);
  const [isCharacter, setIsCharacter] = useState(true);

  const [confirmstate, setConfirmState] = useState(false);
  const [isBookmark, setIsBookmark] = useState(true);
  const [bookmarkList,setBookmarkList] = useState([])
  const [saveList,setSaveList] = useState([])
  const [loading, setLoading] = useState(true);

  const passwordRef = useRef(null);
  const {userId} = useContext(GlobalContext)

  const CopyClicked = useCallback(() => {
    passwordRef.current?.select();
    navigator.clipboard.writeText(password);
    toast.success("password copied");
  }, [password]);

  const setPasswordFun = () => {
    let pass = "";
    let char = "abcdefghijklmnopqrstuvwxyz";
    if (isCaps) char += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (isNumber) char += "1234567890";
    if (isCharacter) char += "!@#$%^&*()+=?.,;={}[]";

    for (let i = 0; i < passLength; i++) {
      pass += char[Math.floor(Math.random() * char.length)];
    }

    setPassword(pass);
  };

  const handleBookmark = async () =>{
    try {
      const {data} = await axios.post(`api/password-genrater/bookmark`,{
        password,user:userId
      })
      if(data.success){
        toast.success(data.message);        
        setPasswordFun()
        handleBookmarkList();
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const handleSaveList = async() =>{
    setIsBookmark(false)
    try {
      const {data} = await axios.get(`/api/password-genrater/save/${userId}`);
      console.log(data);
      if(data.success){
        setSaveList(data.saveData);
        setLoading(false);
      }else{
        toast.error('error while fetching saved password')
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleBookmarkList = async() =>{
    setIsBookmark(true)
    try {
      const {data} = await axios.get( `/api/password-genrater/bookmark/${userId}`)
      console.log(data)
      if(data.success){
        setBookmarkList(data.bookmarks);
        setLoading(false);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  

  useEffect(() => {
    if(userId){
      setPasswordFun();
      handleBookmarkList();
    }
  }, [passLength, isCaps, isNumber, isCharacter,userId]);
  return (<div className="password-genrater ">
    <div className=" flex flex-col  items-center text-black bg-gradient-to-r from-violet-800 to-violet-300 h-screen overflow-x-hidden overflow-y-auto">
      <TheAddPassForm  runFunction={!isBookmark && handleSaveList} savingPassword={password} comfirmState={confirmstate} setComfirmState={setConfirmState} />
      <div className="fixed left-0 p-3 m-3 text-white hover:text-rose-300 cursor-pointer">
        <Link href={"/"}>
          <ImExit size={40} className="hover:scale-110 duration-200" />
        </Link>
      </div>

      <div className="min-w-[90%] md:min-w-[70%] m-72 rounded-lg shadow p-3 bg-gradient-to-r text-center my-5 from-rose-800 to-rose-400">
        <h1 className="text-2xl">Password Genrater</h1>
        <div className="flex shadow rounded-lg overflow-hidden sm:mb-4">
          <input
            ref={passwordRef}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="text"
            className="w-full outline-none py-1 px-3"
          />
          <button
            onClick={CopyClicked}
            className="flex items-center gap-1 outline-none bg-violet-700 text-white px-3 py-0.5 shrink-0"
          >
            <IoCopyOutline />
            Copy
          </button>
        </div>
        <p className=" sm:hidden">Length : {passLength}</p>

        <div className="flex flex-col sm:flex-row m-auto w-fit sm:w-full   text-sm gap-x-2 overflow-hidden">
          <div className="flex items-center gap-x-1">
            <input
              value={passLength}
              onChange={(e) => setPassLenght(e.target.value)}
              type="range"
              min={6}
              max={40}
              className="cursor-pointer accent-violet-700"
            />
            <label className="hidden sm:block">Length : {passLength}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              defaultChecked={isCaps}
              onChange={() => setIsCaps((per) => !per)}
              className="accent-violet-700"
              type="checkbox"
              id="CapitalInput"
            />
            <label>Capital Letter</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              defaultChecked={isNumber}
              onChange={() => setIsNumber((per) => !per)}
              className="accent-violet-700"
              type="checkbox"
              id="numberInput"
            />
            <label>Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              defaultChecked={isCharacter}
              onChange={() => setIsCharacter((per) => !per)}
              className="accent-violet-700"
              type="checkbox"
              id="CharacterInput"
            />
            <label>Characters</label>
          </div>
        </div>

        <div className="flex justify-center space-x-5 ">

          <div className="flex justify-center items-center my-2 cursor-pointer ">
            <button
              onClick={ handleBookmark}
              className="active:scale-105 duration-75 inline-flex items-center justify-center text-white  overflow-hidden  font-medium  rounded-lg group bg-gradient-to-r from-rose-600 to-violet-500 group-hover:from-rose-600 group-hover:to-violet-500 hover:text-white  focus:outline-none "
            >
              <span className="flex justify-center items-center px-5 py-2 transition-all ease-in duration-75 bg-violet-700 hover:text-gray-300 rounded-md group-hover:bg-opacity-0">
                <AiFillStar className="w-6 h-6 mr-1" />
                <span>Bookmark</span>
              </span>
            </button>
          </div>
          <div className="flex justify-center items-center my-2 cursor-pointer ">
            <button
              onClick={()=> setConfirmState(true)}
              className="active:scale-105 duration-75 inline-flex items-center justify-center text-white  overflow-hidden  font-medium  rounded-lg group bg-gradient-to-r from-rose-600 to-violet-500 group-hover:from-rose-600 group-hover:to-violet-500 hover:text-white  focus:outline-none "
            >
              <span className="flex justify-center items-center px-5 py-2 transition-all ease-in duration-75 bg-violet-700 hover:text-gray-300 rounded-md group-hover:bg-opacity-0">
                <AiFillSave className="w-6 h-6 mr-1" />
                <span>Save</span>
              </span>
            </button>
          </div>

        </div>
      </div>

      <div className="flex gap-x-8">
      <div className="flex justify-center items-center my-2 cursor-pointer ">
            <button
              onClick={ handleBookmarkList}
              className={`text-white ${isBookmark && '!text-gray-400'} active:scale-105 duration-75 inline-flex items-center justify-center  overflow-hidden  font-medium  rounded-lg group bg-gradient-to-r from-rose-600 to-violet-500 group-hover:from-rose-600 group-hover:to-violet-500 hover:text-white  focus:outline-none `}
            >
              <span className="flex justify-center items-center px-5 py-2 transition-all ease-in duration-75 bg-violet-700 hover:text-gray-300 rounded-md group-hover:bg-opacity-0">
                <AiFillStar className="w-6 h-6 mr-1" />
                <span>Bookmarks</span>
              </span>
            </button>
          </div>
          <div className="flex justify-center items-center my-2 cursor-pointer ">
            <button
              onClick={()=>{handleSaveList(); saveList.length === 0 &&  setLoading(true);}}
              className={`${!isBookmark && '!text-gray-400'} active:scale-105 duration-75 inline-flex items-center justify-center text-white  overflow-hidden  font-medium  rounded-lg group bg-gradient-to-r from-rose-600 to-violet-500 group-hover:from-rose-600 group-hover:to-violet-500 hover:text-white  focus:outline-none `}
            >
              <span className="flex justify-center items-center px-5 py-2 transition-all ease-in duration-75 bg-violet-700 hover:text-gray-300 rounded-md group-hover:bg-opacity-0">
                <AiFillSave className="w-6 h-6 mr-1" />
                <span>Saved</span>
              </span>
            </button>
          </div>
      </div>

      <div className="flex flex-col w-full  overflow-y-auto">

        {loading ? <div className="flex justify-center items-center h-60">
          <PropagateLoader />
        </div> :
          isBookmark?(
            bookmarkList.map((item)=>{ 
              return <BookmarkListComponent key={item._id} id={item._id} password={item.password} date={item.date} setConfirmState={setConfirmState} setPassword={setPassword} runFetchBookmarks={handleBookmarkList} />
            })
          ):(
            
            
              <SaveListComponent saveList={saveList} refreshSaveList={handleSaveList}  />
             
           
          )
        }
        {/* <BookmarkListComponent  password={'item.password'} date={'item.date'} /> */}

      </div>
    </div></div>
  );
};

const BookmarkListComponent = ({id,password,date,setConfirmState,setPassword,runFetchBookmarks}) =>{

  const handleSave = () =>{
    setPassword(password);
    setConfirmState(true);
  }
  const handleCopy = () =>{
    navigator.clipboard.writeText(password);
    toast.success('password copied successfully')
  }
  const handleDelete = async() =>{
    try {
      const {data} = await axios.delete(`/api/password-genrater/bookmark/${id}`)
      if(data.success){
        toast.success(data.message);
        runFetchBookmarks();
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return <div className="flex justify-between p-3 hover:bg-black/25">
    <p className="w-[10.5rem]">{password.slice(0,15)}{password.length > 20 && '...'}</p>
    <p>{date[3]}-{date[4]}<span className="hidden sm:inline-flex">-{date[5]}</span> </p>
    <div className="flex gap-2 sm:gap-x-5">
      <AiFillSave onClick={handleSave} className="cursor-pointer text-2xl text-violet-600 hover:text-violet-900" />
      <IoCopyOutline onClick={handleCopy} className="cursor-pointer text-2xl text-violet-600 hover:text-violet-900" />
      <MdDelete onClick={handleDelete} className="cursor-pointer text-2xl text-rose-500 hover:text-rose-700" />
    </div>
  </div>
}

const SaveListComponent = ({saveList,refreshSaveList}) =>{

  const [confirmState, setConfirmState] = useState(false);
  const [deleteName, setDeleteName] = useState('');
  const [deleteId, setDeleteId] = useState('');

  const handlePassMenu = async(name,id) =>{
    setDeleteName(name);
    setDeleteId(id);
    setConfirmState(true);
  }
  const DeleteSavePass = async() =>{
    console.log(`/api/password-genrater/save/${deleteId}`)
    try {
      const {data} = await axios.delete(`/api/password-genrater/save/${deleteId}`)
      if(data.success){
        toast.success(data.message)
        refreshSaveList()
      }else{
        data.error(data.message)
      }
     } catch (error) {
      console.log(error);
      toast.error('something went wrong')
    }
  }
  const handleCopyId = async(id) =>{
    navigator.clipboard.writeText(id);
    toast.success('Id copied successfully')
  }
  const handleCopyPass = async(_id) =>{
    try {
      const {data} = await axios.get(`/api/password-genrater/save/copy/${_id}`);
      if(data.success){
        navigator.clipboard.writeText(data.password);
        toast.success('password copied successfully')
      }else{
        toast.error('Error copying password')
      }
    } catch (error) {
      console.log(error);
    }
  }

  return(
    <div className="flex flex-wrap justify-around items-center gap-3"> 
    <TheDeletePassForm comfirmState={confirmState} setComfirmState={setConfirmState} nameId={deleteName} runFunction={DeleteSavePass}  />
    {
            saveList.map((item)=>{ 

    return <div onContextMenu={(ev)=> {handlePassMenu(item.name,item._id); ev.preventDefault();}} key={item._id} className=" flex flex-col justify-center items-center text-center border-2 rounded-xl p-3   space-y-3 bg-black/5 hover:bg-black/10">
      <h1  className="mb-3 text-rose-600 min-w-[80%] border-b-2 border-gray-50 text-2xl">{item.name}</h1>

      
        
        {item.id &&<div onClick={() => handleCopyId(item.id)} className=" flex justify-around p-1 border-[1px] rounded cursor-pointer text-2xl  hover:text-violet-700 gap-1">
          <span>{item.id}</span>
          {/* <marquee truespeed>{id} </marquee> */}
        <IoCopyOutline  className="m-auto" />
          </div>}
      
      
      <button  onClick={()=>handleCopyPass(item._id)} className="flex justify-around p-1 items-center border-[1px] rounded cursor-pointer text-2xl  hover:text-violet-700 gap-1"> <span>Password</span>
      <IoCopyOutline  className="m-auto" />
      </button>
      <p className="flex">{item.date[3]}-{item.date[4]}-{item.date[5]}
      <MdDelete onClick={()=> {handlePassMenu(item.name,item._id);}} className="cursor-pointer m-auto text-rose-500 hover:text-rose-700" />
      </p>
    </div>
     })
    }
     </div>
  )
}
export default page;
