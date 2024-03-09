import React, { useEffect, useState } from 'react'
import { SignupformValidations, handleFormData } from '../../utils/functions';
import { registerUser } from '../../apicalls/users';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Loader from '../../components/Loader';
import { Alert } from '@mui/material';
function Signup() {
    const navigate = useNavigate();
    const [formObj,setFormObj] = useState({name:'',userName:'', email:'', password:'',confirmPassword:'', profilePic:''})
    const [profilePicSrc, setProfilePicSrc] = useState('');
    const [checkbox,setCheckbox] = useState(false);
    const [passwordShow,setPasswordShow] = useState(false);
    const [confirmPasswordShow,setConfirmPasswordShow] = useState(false);
    const [loading,setLoading] = useState(false);
    const [showEmailText,setShowEmailText] = useState(false);

    useEffect(()=>{
    if(localStorage.getItem("token"))
    navigate("/")
    },[])
    const handleChange=(e)=>{
    const {name} = e.target;
    if(e.target.files && e.target.files[0]){
        setProfilePicSrc(URL.createObjectURL(e.target.files[0]))
        setFormObj((prev)=>({...prev,[name]: e.target.files[0]}));
    }
    else{
    const {value} = e.target;
     setFormObj((prev)=> ({...prev,[name]:value}));
    }
    }

    const handleCheckbox=()=>{
        setCheckbox(!checkbox);
    }


    const handleSubmit=async(e)=>{
        e.preventDefault();
        let res= SignupformValidations(formObj);
        if(res!=='true'){
            toast.error(res);
            return;
        }
        if(!checkbox){
        toast.error("Please accept terms and conditions");
        return;
        }
        let formData= handleFormData(formObj);
       setLoading(true)
      const response= await registerUser(formData);
      setLoading(false);
      if(response.success){
        setShowEmailText(true);
          setFormObj({name:'',userName:'', email:'', password:'',confirmPassword:'', profilePic:''});
          setPasswordShow(false);
          setConfirmPasswordShow(false);
          setProfilePicSrc('');
          setCheckbox(false)
      }
      else{
        toast.error(response?.response?.data?.message);
      }
    }
  return (
    <>
    {loading ? <Loader/> : 
        <div className='flex justify-center min-h-screen bg-[#1d9bf0]'>
            <div className='bg-white p-6 px-10 my-6 mx-4 rounded-md shadow-slate-500'>
              <h1 className='text-black font-bold text-3xl'>Sign Up</h1>
                <div className='mt-8'>
                {showEmailText && 
                        <Alert className='my-5' variant='filled' severity='success'>
                        An Email has been sent to your account, please verify.
                       </Alert>
                 }
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col md:flex-row justify-between w-full mb-3'>
                        <div className='md:mr-2 w-full md:w-1/2 mb-3 md:mb-0'>
                         <label className='text-[gray] mb-2'>Name</label>
                         <input name='name' value={formObj.name} placeholder='Enter name' onChange={handleChange} className='w-full text-sm py-2 px-2 border border-stroke focus:outline-gray-300 rounded-md' type="text" />
                        </div>
                        <div className='md:ml-2 w-full md:w-1/2'>
                        <label className='text-[gray] mb-2'>Username</label>
                         <input name='userName' value={formObj.userName} placeholder='Enter username' onChange={handleChange} className='w-full text-sm py-2 px-2 border border-stroke focus:outline-gray-300 rounded-md' type="text" />
                        </div>   
                         </div>

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

                        <div className='mb-3'>
                        <label className='text-[gray] mb-2'>Confirm Password</label>
                        <div className='flex justify-between'>
                         <input name='confirmPassword' value={formObj.confirmPassword} placeholder='Confirm password' onChange={handleChange} className='w-[96%] text-sm py-2 px-2 border border-stroke border-r-0 focus:outline-none rounded-md rounded-r-none' type={(!confirmPasswordShow)?"password": "text"} />
                          <span onClick={()=>setConfirmPasswordShow(!confirmPasswordShow)} className='cursor-pointer border border-stroke border-l-0 rounded-md rounded-l-none pr-2 pt-1'>{(confirmPasswordShow)? <VisibilityIcon sx={{fontSize:'1.3rem'}}/> : <VisibilityOffIcon sx={{fontSize:'1.3rem'}} />}</span>
                         </div>
                        </div>
                        
                         <div className='mb-3'>
                         <label  className='text-[gray] mb-2'>Profile Pic</label>
                         <input
                          type="file"
                          name='profilePic'
                          onChange={handleChange}
                          className="w-full text-sm cursor-pointer rounded-md border border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-2 file:px-2 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary"
                         />
                          {profilePicSrc!=='' && <img className='w-[80px] h-20 m-auto mt-2 mb-4 rounded-lg' src={`${profilePicSrc}`}  alt="image" />}
                         </div>

                           <div className='flex align-middle'>
                           <input className='' type="checkbox" checked={checkbox} onChange={handleCheckbox}/>
                           <span className='ml-1 text-sm'>I agree with term and conditions.</span> 
                           </div>

  
                        <button type='submit' className='bg-[#1d9bf0] text-white font-bold text-lg px-3 py-2 mt-5 w-full rounded-md hover:bg-[blue] transition duration-300 focus:ring'>Sign Up</button>
                        <p className='text-sm mt-1'>Already have an account? <span onClick={()=>navigate('/signin')} className='underline cursor-pointer text-blue-600'>Signin</span></p>    

                        
                    </form>
                </div>
            </div>
        </div>
    }
    </>
  )
}

export default Signup