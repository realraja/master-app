'use client'

import { Dialog, Transition } from "@headlessui/react";
import toast from "react-hot-toast";
import { MdDelete} from "react-icons/md";
const { useState, useRef, Fragment } = require("react");

export const TheDeletePassForm = ({
    comfirmState,
    setComfirmState,
    nameId,
    runFunction
  }) => {
  
      const [name,setName] = useState('');
  
      
  
      const handleAddPass = async() =>{
        if(name == nameId){
            runFunction()
            setComfirmState(false);
        }else{
            toast.error(`'${name}' name is wrong`)
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
                        <MdDelete className='h-8 w-8 hover:scale-150 duration-300 ' />
                      </div>
                      <div className="mt-3 text-center">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Enter "{nameId}" for delete this
                        </Dialog.Title>
                        <div className="m-5 text-sm text-black">
                          <p className=' text-black  bg-gray-200 px-2  absolute z-0 -mt-3 ml-1 rounded'>Name</p>
                          <input value={name} onChange={(e)=> setName(e.target.value)} className='w-full  border focus:outline-none focus:border-white p-2 m-0  text-base block border-gray-700 rounded-md' type="text" placeholder='enter here app name' />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-300 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={handleAddPass}
                    >
                      Delete This
                      
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