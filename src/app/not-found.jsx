'use client'
import Link from "next/link";
import { PacmanLoader } from "react-spinners";
import {BsArrowLeft} from 'react-icons/bs'

export default function Page() {
    return (
      <>
        {/*
          This example requires updating your template:
  
          ```
          <html class="h-full">
          <body class="h-full">
          ```
        */}
        <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
<PacmanLoader color="#F43F5E" />
          <div className="text-center">
            
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-rose-500 sm:text-5xl">Page not found</h1>
            <p className="mt-6 text-base leading-7 text-gray-400">Sorry, we couldn’t find the page you’re looking for.</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/"
              ><div className='flex justify-center items-center my-4 cursor-pointer  '>
                <button  className="active:scale-105 duration-75 inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-r from-rose-600 to-violet-500 group-hover:from-rose-600 group-hover:to-violet-500 hover:text-white dark:text-white  focus:outline-none ">
              <span className="flex justify-center items-center px-8 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                <BsArrowLeft className='mr-3 w-6 h-6' />
                  Go Back Home
              </span>
            </button>
            </div>
                
              </Link>
            </div>
          </div>
        </main>
      </>
    )
  }
  