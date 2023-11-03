"use client";

import React, { useState,useContext } from "react";
import PhoneInput from "react-phone-input-2";
import { CgSpinner } from "react-icons/cg";

import "react-phone-input-2/lib/style.css";
import axios from "axios";
import {toast} from "react-hot-toast";
import { useRouter } from "next/navigation";
import { GlobalContext } from "@/context";

const initialForm = {
  name: "",
  email: "",
  password: "",
  Cpassword: "",
};

const page = () => {
  const [loading, setLoading] = useState(false);
  const [ph, setPh] = useState('');
  const [formData, setFormData] = useState(initialForm);
  const [msg,setMsg] = useState('Please fill all required fields');

  const {fetchAuthUserData} = useContext(GlobalContext);

  const router = useRouter();
  function isFormValid() {

    if(formData &&
        formData.name &&
        formData.name.trim() !== "" &&
        ph &&
        ph.trim() !== "" &&
        formData.email &&
        formData.email.trim() !== "" &&
        formData.password &&
        formData.password.trim() !== ""&&
        formData.Cpassword &&
        formData.Cpassword.trim() !== ""){
            if(formData.Cpassword === formData.password){
            msg !== 'Everything is good register now.' && setMsg('Everything is good register now.')
            return true;
            }else{
                msg !== 'Passwords are not same.' && setMsg('Passwords are not same.')
                return false;
            }
        }else{
            msg !== 'Please fill all required fields' && setMsg('Please fill all required fields')
            return false;
        }
  }



  const handleRegister = async () => {
    setLoading(true)
    try {
        const {data} = await axios.post('/api/register?id=new',{
            ...formData,phone:ph
        })
        if(data.success) {
            toast.success(data.message);
            setLoading(false);
            fetchAuthUserData()
            router.push('/login');
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

  return  (
    <div className="w-80 md:w-[50%] m-auto bg-gray-700 my-10 p-10 space-y-5 rounded">
        
      <div className="text-2xl text-center -mt-5 text-rose-500">
        <h1>Register Now</h1>
      </div>

      <section className="flex flex-col space-y-4" >
        <div className="flex flex-col  ">
          <label className="text-lg">Your Name</label>
          <input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="text-black rounded p-1  focus:outline-none "
            required
            type="text"
            placeholder="Raja"
          />
        </div>
        <div className="flex flex-col  ">
          <label className="text-lg">Your Email</label>
          <input
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="text-black rounded p-1 focus:outline-none"
            required
            type="email"
            placeholder="raja@gmail.com"
          />
        </div>
        <div className="flex flex-col  ">
          <label className="text-lg">Your Phone No.</label>
          <PhoneInput
            className="phoneInput text-black"
            country={"in"}
            value={ph}
            onChange={setPh}
          />
        </div>
        <div className="flex flex-col  ">
          <label className="text-lg">Password</label>
          <input
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="text-black rounded p-1 focus:outline-none"
            required
            type="password"
            placeholder="*******"
          />
        </div>
        <div className="flex flex-col  ">
          <label className="text-lg">Confirm Password</label>
          <input
            value={formData.Cpassword}
            onChange={(e) =>
              setFormData({ ...formData, Cpassword: e.target.value })
            }
            className="text-black rounded p-1 focus:outline-none"
            required
            type="password"
            placeholder="*******"
          />
        </div>

        <div className={`flex flex-col text-sm font-light text-rose-500 text-center`}>
          <p className={`${msg === 'Everything is good register now.' && 'text-green-500' }`}>{msg}</p>
        </div>


        <div className="flex flex-col  ">
        
          <button className="disabled:opacity-50 flex bg-rose-500 self-center text-xl rounded px-5 py-2 hover:bg-rose-600" disabled={!isFormValid()} onClick={handleRegister}>
          {loading ?<> <CgSpinner size={20} className="mt-1 animate-spin" /> <span>Verifing</span></>:<span>Verify Now</span>}            
          </button>

        </div>
      </section>
    </div>
  ) 
};

export default page;
