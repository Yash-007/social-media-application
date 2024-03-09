import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { verifyemailurl } from '../apicalls/users';
import toast from 'react-hot-toast';

function VerifyEmailUrl() {
    const [invalidUrl,setInvalidUrl] = useState(false);
    const param = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
    const verifyEmail=async()=>{
        const data= await verifyemailurl(param);
        if(data.success){
            toast.success("Email verified successfully");
            const token = data?.token;
            const refreshToken = data?.refreshToken
            localStorage.setItem("token",token);
            localStorage.setItem("refreshToken",refreshToken)
            navigate('/');
        }
        else{
         setInvalidUrl(true);
        }
    }
    verifyEmail();
    },[param])
  return (
    <>
      <div className='flex justify-center align-middle h-screen text-3xl font-bold'>{invalidUrl && (
        <h1 className='my-auto'>404 Not Found</h1>
      )}</div>  
    </>
  )
}

export default VerifyEmailUrl