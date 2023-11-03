'use client'

import axios from "axios"
import Cookies from "js-cookie"
import { useCallback, createContext, useState,useEffect } from "react"


export const GlobalContext = createContext()

export default function GlobalState({children}){
    const [isAuthUser,setIsAuthUser] = useState()
    
  const [isAdmin,setIsAdmin] = useState(false);
  const [isAuthLoading,setIsAuthLoading] = useState(true);
    const [token,setToken] = useState()
    const [userId,setUserId] = useState('');


    // console.log(token)
    const fetchAuthUserData = useCallback(async() =>{
        const tokken = Cookies.get('token');
        
        if(tokken !== undefined){
            // console.log(tokken)
            setToken(tokken) 
            axios.post('/api/login/checkuser',{
                token:tokken
            })
            .then(function (response) {                
                setIsAuthUser(response.data.success);
                // console.log(response.data)
                setUserId(response.data.isExistUser._id);
                if(response.data.isExistUser._id === '654516c5beeb6dce478e7dda') {
                    setIsAdmin(true);
                  }
                  setIsAuthLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setIsAuthUser(false);
                setIsAuthLoading(false);
            })


        }else{
            setIsAuthUser(false);
            setIsAuthLoading(false);
        }
    },[setIsAuthUser])

    useEffect(()=>{        
       fetchAuthUserData();
    },[isAuthUser,Cookies])
    return(
        <GlobalContext.Provider value={{fetchAuthUserData,isAuthUser,token,isAdmin,isAuthLoading,userId}}>
            {children}
        </GlobalContext.Provider>
    )
}