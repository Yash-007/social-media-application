import React, { useEffect, useState } from 'react'
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import LocationOnOutlined from '@mui/icons-material/LocationOn';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import InfiniteScroll from 'react-infinite-scroll-component'
import Loader from '../components/Loader';
import { getPosts } from '../apicalls/posts';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import BasicModal from '../components/Modal';
import ResetPasswordFormjs from './ResetPasswordForm.js';


function Home({currentUser}) {
    const navigate = useNavigate();
    const [items,setItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page,setPage]= useState(1);
    const [isRotate, setIsRotate] = useState(false);
    const [openPasswordForm,setOpenPasswordForm] = useState(false);


    useEffect(()=>{
     fetchMoreData();
      },[]);

  const fetchMoreData=async()=>{
    const data = await getPosts(page);
    if(data.success){
      if(items.length)
      setItems((prevItems)=> [...prevItems, ...data.posts])
      else
      setItems(data.posts);
    (data?.posts.length > 0) ? setHasMore(true) : setHasMore(false);
      }
    else{
      toast.error(data?.response?.data?.message)
    }
  setPage((prev)=> prev+1);
  }

  const logoutFunc=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    toast.success("Logged out successfully")
    navigate('/signin');
  }

  return (
    <>
   <ResetPasswordFormjs show={openPasswordForm} unShow={setOpenPasswordForm}/>

        <div className='flex' >
            <div className='max-w-[350px] hidden lg:block'>
            <div className='bg-[#f7f9f9] p-5 rounded-xl m-10'>
                <h1 className='font-bold text-black text-xl'>Subscribe to Premium</h1>
                <p className='text-[#5e6265] my-3'>Unlock a world of possibilities with our Premium subscription! Subscribe today to enjoy 
                a host of exclusive features designed to elevate your experience. Access advanced tools,
                 enjoy an ad-free environment, and discover new dimensions in functionality. As a token of appreciation,
                  eligible Premium subscribers may even qualify to receive a share of the revenue generated from advertisements.
             Embrace the full potential of our platform, subscribe to Premium, and embark on a premium journey with us</p>

             <button className='bg-black text-white font-[600] text-md p-1 px-3 mt-2 rounded-full'>Subscribe</button>
            </div>
            </div>

            <div className='w-full md:min-w-[600px] border border-stroke'>
            <div className='flex justify-end rounded-md p-2 md:hidden'>
              <img className='w-14 h-14 rounded-full' src={`${process.env.REACT_APP_IMG_PATH}${currentUser?.profilePic}`} alt="profile" />
                <div className='mx-2 flex-1 sm:flex-none'>  
                    <h1 className='text-black font-[700] text-md '>{currentUser?.name}</h1>
                    <h1 className='text-[#5e6265] text-sm'>{currentUser?.userName}</h1>
                </div>
                <span onClick={()=>setIsRotate(!isRotate)} className='p-1 cursor-pointer'><ExpandMoreIcon className={`transform ${isRotate ? 'rotate-90' : 'rotate-0'}`}/></span>
               {isRotate &&
                <div>
                <h1><LockOutlinedIcon onClick={()=> setOpenPasswordForm(true)} className='cursor-pointer text-[#1d9bf0]'/></h1>
                <h1><LogoutOutlinedIcon onClick={()=>logoutFunc()} className='cursor-pointer text-[#1d9bf0]'/></h1>
                </div>
                }
              </div>

            <div className='border border-stroke border-x-0 border-t-0 p-6'>
            <div className='flex align-items-center '>
            <img className='w-10 h-10 rounded-full mt-2' src={`${process.env.REACT_APP_IMG_PATH}${currentUser?.profilePic}`} alt="profile" />
            <input className='w-full h-14 align-middle p-2 text-xl border-none focus:outline-none placeholder-[#55585c]' type="text"  placeholder="What is happening?"/>
            </div>

         <div className='flex justify-between mt-2'>
          <div className='flex align-middle space-x-2'>
         <CollectionsOutlinedIcon sx={{color:'blue',cursor:'pointer'}}></CollectionsOutlinedIcon>
         <GifBoxOutlinedIcon sx={{color:'blue',cursor:'pointer'}}></GifBoxOutlinedIcon>
         <SentimentSatisfiedAltIcon sx={{color:'blue',cursor:'pointer'}}></SentimentSatisfiedAltIcon>
         <LocationOnOutlined sx={{color:'blue',cursor:'pointer'}}></LocationOnOutlined>
           </div>
         <button className='text-white bg-[#1d9bf0] p-1 px-4 rounded-2xl text-md'>Post</button>
            </div>
            </div>

   <InfiniteScroll
   dataLength={items.length}
   next={fetchMoreData}
   hasMore={hasMore}
   loader={<Loader></Loader>}
   >
            <div className='pb-5 w-full'>
                {items && items.map((item)=>(
                  <>
                <div className='flex p-2 border border-stroke w-full'>
                 <img className='max-w-10 md:w-10 h-10 rounded-full' src={`${item?.profilePic}`} alt="profile-pic" />
                 <div className='px-2 w-full'>
                    <h1 className='text-2xl md:text-lg text-black font-bold'>{item?.name}  <span  className='text-lg md:text-sm font-[500] text-[#5e6265] ml-1'>{item?.userName}</span></h1>
                    <p className='text-lg md:text-sm'>{item?.description}</p>

               <img className='max-w-[250px] sm:max-w-[500px] max-h-[400px] rounded-xl mt-2' src={`${item?.image}`} alt="image" />

               <div className='flex justify-between mt-3 text-[#5e6265] text-sm'>
               <span><FavoriteBorderOutlinedIcon sx={{fontSize:'1.3rem',cursor:'pointer'}}/> <span className='text-sm'>{item?.likes}</span></span>
               <span><CommentOutlinedIcon sx={{fontSize:'1.3rem',cursor:'pointer'}}/> <span className='text-sm'>{item?.comments}</span></span>
               <span><ShareOutlinedIcon sx={{fontSize:'1.3rem',cursor:'pointer'}}/> <span className='text-sm'>{item?.share}</span></span>
               <span><FileDownloadOutlinedIcon sx={{fontSize:'1.3rem',cursor:'pointer'}}/> <span className='text-sm'>{item?.downloads}</span></span>
               </div>
                 </div>
                </div>
                  </>
                ))}
            </div>
   </InfiniteScroll>
            </div>
            <div className='min-w-[350px] items-center p-5 mx-8 hidden md:block'>
              <div className='flex border-2 rounded-md p-1'>
              <img className='w-14 h-14 rounded-full' src={`${process.env.REACT_APP_IMG_PATH}${currentUser.profilePic}`} alt="" />
                <div className='mx-2 flex-1'>
                    <h1 className='text-black font-[700] text-md '>{currentUser?.name}</h1>
                    <h1 className='text-[#5e6265] text-sm'>{currentUser?.userName}</h1>
                </div>
                <span onClick={()=>setIsRotate(!isRotate)} className='p-1 cursor-pointer'><ExpandMoreIcon className={`transform ${isRotate ? 'rotate-90' : 'rotate-0'}`}/></span>
               {isRotate &&
                <div>
                <h1><LockOutlinedIcon onClick={()=> setOpenPasswordForm(true)} className='cursor-pointer text-[#1d9bf0]'/></h1>
                <h1><LogoutOutlinedIcon onClick={()=>logoutFunc()} className='cursor-pointer text-[#1d9bf0]'/></h1>
                </div>
                } 
              </div>
    

              <div className='bg-[#f7f9f9]  p-5 rounded-xl m-5'>
                <h1 className='font-bold text-black text-xl mb-5 '>What's happening</h1>

                <div className='my-3'>  
                <h1 className='text-black text-md font-[650]'>Paris Fashion Week Fall 2024</h1>
                <p className='text-[#5e6265] text-sm'>Fashion Live</p>
                </div>

                <div className='my-3'> 
                <h1 className='text-black text-md font-[650] '>Election Commission</h1>
                <p className='text-[#5e6265] text-sm'>12.1k Posts</p>
                </div>

                <div className='my-3'> 
                <h1 className='text-black text-md font-[650] '>Water Crises</h1>
                <p className='text-[#5e6265] text-sm'>9.4k Posts</p>
                </div>

                <div className='my-3'> 
                <h1 className='text-black text-md font-[650]'>WHSIWYG</h1>
                <p className='text-[#5e6265] text-sm'>5.5k Posts</p>
                </div>

                <div className='my-3'> 
                <h1 className='text-black text-md font-[650]'>Covid is back</h1>
                <p className='text-[#5e6265] text-sm'>2.5k Posts</p>
                </div>
                
                <div className='my-3'> 
                <h1 className='text-black text-md font-[650]'>Save Plants</h1>
                <p className='text-[#5e6265] text-sm'>1.8k Posts</p>
                </div>

              </div>


            </div>
        </div>
    </>

  )
}

export default Home