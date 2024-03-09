import React, { useEffect, useState } from 'react'
import { SigninformValidations, SignupformValidations, handleFormData } from '../../utils/functions';
import { SigninUser, registerUser } from '../../apicalls/users';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Loader from '../../components/Loader';
import { Alert } from '@mui/material';
function Signin() {
    const navigate = useNavigate();
    const [formObj,setFormObj] = useState({email:'', password:''});
    const [passwordShow,setPasswordShow] = useState(false);
    const [loading,setLoading] = useState(false);
    const [showEmailText,setShowEmailText] = useState(false);

    useEffect(()=>{
        if(localStorage.getItem("token"))
        navigate("/")
    },[])

    const handleChange=(e)=>{
    const {name,value} = e.target;
     setFormObj((prev)=> ({...prev,[name]:value}));
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        let res= SigninformValidations(formObj);
        if(res!=='true'){
            toast.error(res);
            return;
        }
       setLoading(true)
      const response= await SigninUser(formObj);
      setLoading(false);
      if(response?.success && !(response?.user)){
        setShowEmailText(true);
        setFormObj({email:'', password:''});
        setPasswordShow(false);
      }
      else if(response?.success){
        const token = response?.token;
        const refreshToken = response?.refreshToken
        localStorage.setItem("token",token);
        localStorage.setItem("refreshToken",refreshToken)
        setFormObj({email:'', password:''});
        setPasswordShow(false);
        toast.success('Signed In Successfully');
        navigate("/");
      }
      else{
        if(response?.response?.data?.message)
        toast.error(response?.response?.data?.message)
        else
        toast.error(response?.response?.data)
      }
    }
  return (
    <>
    {loading ? <Loader/> : 
        <div className='flex justify-center min-h-screen bg-[#1d9bf0]'>
            <div className='bg-white p-10 my-auto mx-4 rounded-md shadow-slate-500 sm:min-w-[400px]'>
              <h1 className='text-black font-bold text-3xl'>Sign In</h1>
                <div className='mt-8'>
                {showEmailText && 
                 <>
                        <Alert className='my-5' variant='filled' severity='success'>
                        An Email has been sent to your account, please verify.
                       </Alert>
                 </>
                 }
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                        <label className='text-[gray] mb-2'>Email</label>
                         <input name='email' value={formObj.email} placeholder='Enter email' onChange={handleChange} className='w-full text-sm py-2 px-2 border border-stroke focus:outline-gray-300 rounded-md' type="text" />
                        </div>

                        <div className='mb-3'>
                        <label className='text-[gray] mb-2'>Password</label>
                         <div className='flex justify-between'>
                         <input name='password' value={formObj.password} placeholder='Enter password' onChange={handleChange} className='w-[96%] text-sm py-2 px-2 border border-stroke border-r-0 focus:outline-none rounded-md rounded-r-none' type={(!passwordShow)?"password": "text"} />
                          <span onClick={()=>setPasswordShow(!passwordShow)} className='cursor-pointer border border-stroke border-l-0 rounded-md rounded-l-none pr-2 pt-1'>{(passwordShow)? <VisibilityIcon sx={{fontSize:'1.3rem'}}/> : <VisibilityOffIcon sx={{fontSize:'1.3rem'}}/>}</span>
                         </div>
                        </div>

                        <button type='submit' className='bg-[#1d9bf0] text-white font-bold text-lg px-3 py-2 mt-5 w-full rounded-md hover:bg-[blue] transition duration-300 focus:ring'>Sign In</button>
                        <p className='text-sm mt-1'>Don't have an account? <span onClick={()=>navigate('/signup')} className='underline cursor-pointer text-blue-600'>Signup</span></p>    
                    </form>
                </div>
            </div>
        </div>
    }
    </>
  )
}

export default Signin