'use client'
import {AiFillHeart,AiFillEye} from 'react-icons/ai'
import {FaRegCommentDots,FaShare} from 'react-icons/fa'
import {  useRouter } from 'next/navigation'
import {elementArray} from '@/utils/allelements'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useEffect,useState,useContext } from 'react'
import { HashLoader } from 'react-spinners'
import { GlobalContext } from '@/context'
import { useUrl } from 'nextjs-current-url';

export default function Home() {
  const [loading,setLoading] = useState(true)
  const [allApps,setAllApps] = useState([])
  const router = useRouter();
  const url = useUrl();

  // console.log(pathName,url)

  const {token,userId} = useContext(GlobalContext)
// console.log(userId)
  const AddView = async(id) =>{
     await axios.put('/api/allapps/view',{
      id,userId:userId || 'unKnown'
    })
  }
  const AddLike = async(id) =>{
    if(!token){
      router.push('/login')
    }
     await axios.put('/api/allapps/like',{
      id,token
    })
    fetchAllApps();
  }
  const AddComment = async(id) =>{    
     router.push(`/api/comments/${id}`)
  }
  const AddShare = async(id,linkId) =>{
     await axios.put('/api/allapps/share',{
      id,userId:userId || 'unKnown'
    })
    fetchAllApps();
    navigator.clipboard.writeText(url.href+linkId);
    toast.success('link is copied now you can share anywhere!')
  }

  const fetchAllApps = async() =>{
    try {
      const {data} = await axios.get('/api/allapps')
      if(data.success){
        setLoading(false);
        setAllApps(data.apps)
      }else{
        toast.error(data.message);
        setAllApps(elementArray)
      }

    } catch (error) {
      toast.error(error.message);
      setAllApps(elementArray)
    }
  }

  useEffect(()=>{
    fetchAllApps();
  },[]);
  return (loading?<div className='h-[40vh] w-full flex flex-col items-center justify-center'> <HashLoader speedMultiplier={2} color='red' size={80} /> </div> :
    <div>
      <div className='bg-gradient-to-r text-4xl from-rose-800 to-rose-300 w-[90%] m-auto py-3 my-3 text-center'>
          <h1>All Apps</h1>
        </div>
      <div className='flex flex-wrap justify-around space-x-5 space-y-5'>

   {
    allApps.map((item) =>{
      const iconObj = {__html:item.icon};

      function isLikeFind(id){
        return id.userId === userId
      }
// console.log(item.liked.find(isLikeFind))
      return item.show &&  <GetANewApp isLiked={item.liked.find(isLikeFind)?.userId === userId}  AddShare={()=>AddShare(item._id,item.id)} AddComment={()=> AddComment(item._id)} AddLike={()=>AddLike(item._id)}  AddView={()=>AddView(item._id)} name={item.name} id={item.id} like={item.liked} view={item.views} comment={item.comments} share={item.shares} router={router}  key={item.id} icon={<div className='w-120 h-120 hover:scale-125 hover:text-rose-300 duration-500 cursor-pointer ' dangerouslySetInnerHTML={iconObj} />}  />
    })
   }
        
      </div>    
    </div>
  )
}


const GetANewApp = ({router,id,icon,name,view,like,share,comment,AddView,AddShare,AddComment,AddLike,isLiked}) =>(
  <div className='bg-gray-500 w-fit rounded-lg text-center'>
          <div onClick={() => {AddView(); router.push(id);}}  className='p-5'>
           {/* <RiLockPasswordFill className="hover:scale-125 hover:text-gray-300 duration-500 cursor-pointer" size={120}/> */}
          {icon}
          </div>

          <div className='max-w-[80%] m-auto text-center text-rose-400'>
            <p className='text-xl font-sans w-full '>{name}</p>
          </div>
          <div className='flex p-5 items-center justify-around space-x-2'>
            <span  className='text-center justify-center'>
              <AiFillEye className='hover:text-blue-800 text-xl cursor-pointer hover:scale-125 m-auto duration-150' />
              <p className='text-sm'>{view.length || 0}</p>
            </span>
             <span onClick={AddLike} className='text-center justify-center'>
              <AiFillHeart className={`${isLiked ? 'text-rose-500':null} hover:text-rose-700 focus:text-rose-500 text-xl cursor-pointer hover:scale-125 m-auto duration-150`} />
              <p className='text-sm'>{like.length || 0}</p>
            </span>
             <span onClick={AddComment} className='text-center justify-center'>
              <FaRegCommentDots className='hover:text-gray-300 text-xl cursor-pointer m-auto hover:scale-125 duration-150' />
              <p className='text-sm'>{comment || 0}</p>
            </span>
             <span onClick={AddShare} className='text-center justify-center'>
              <FaShare className='hover:text-violet-700 text-xl cursor-pointer hover:scale-125 m-auto duration-150' />
              <p className='text-sm'>{share.length || 0}</p>
            </span>

          </div>
        </div>
)