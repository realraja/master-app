"use client";

import React, { useState,useContext } from "react";
import { CgSpinner } from "react-icons/cg";

import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { GlobalContext } from "@/context";

const page = () => {
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const {fetchAuthUserData} = useContext(GlobalContext);
  const router = useRouter();


  function isFormValid() {
    if (id && id.trim() !== "" && id && id.trim() !== "") {
        if(password.trim() !== "" ){ return true;}else{ return false}
    }
    return false;
  }

 

  const handleLogin = async () => {
    setLoading(true);
    try {

      const {data} = await axios.post('/api/login',{
        userId:isNaN(id*1)?id:`91${id}`
          ,password
      })
      console.log(data);
      if(data.success) {
        setLoading(false);
        toast.success(data.message);            
        Cookies.set("token", data.cookie,{ expires: 365 });
        fetchAuthUserData()
        router.push("/");
      }else{
          toast.error(data.message);
          setLoading(false)
      }
    } catch (error) {
        console.log(error);
        toast.error(error.message);
        setLoading(false);
    }
  };



  return (
    <div className="w-80 md:w-[50%] m-auto bg-gray-700 my-10 p-10 space-y-5 rounded">
      <div className="text-2xl text-center -mt-5 text-rose-500">
        <h1>LogIn Now</h1>
      </div>

      <section className="flex flex-col space-y-4">
        <div className="flex flex-col  ">
          <label className="text-lg">Your Email/Phone No.</label>
          <input
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="text-black rounded p-1 focus:outline-none"
            required
            type="text"
          />
        </div>

            <div className="flex flex-col  ">
              <label className="text-lg">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-black rounded p-1 focus:outline-none"
                required
                type="password"
                placeholder="*******"
              />
            </div>
            <div className="flex flex-col  ">
              <button
                className="disabled:opacity-50 flex bg-rose-500 self-center text-xl rounded px-5 py-2 hover:bg-rose-600"
                disabled={!isFormValid()}
                onClick={handleLogin}
              >
                {loading ? (
                  <>
                    {" "}
                    <CgSpinner size={20} className="mt-1 animate-spin" />{" "}
                    <span>Verifing</span>
                  </>
                ) : (
                  <span>Verify Now</span>
                )}
              </button>
            </div>
    


 
      </section>
    </div>
  );
};

export default page;
