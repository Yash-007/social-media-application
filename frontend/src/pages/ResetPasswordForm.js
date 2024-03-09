import React, { useState } from 'react'
import BasicModal from '../components/Modal'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { resetPassword } from '../apicalls/users';
import toast from 'react-hot-toast';
import { ResetPasswordFormValidations } from '../utils/functions';
import Loader from '../components/Loader';

function ResetPasswordFormjs({show,unShow}) {
    const [loading,setLoading] = useState(false);
    const [curPassShow,setCurPassShow] = useState(false);
    const [newPassShow,setNewPassShow] = useState(false);
    const [confNewPassShow,setConfNewPassShow] = useState(false);  
    const [formObj,setFormObj] = useState({currentPassword:'', newPassword:'', confirmNewPassword: ''})

    const handleChange= (e)=>{
        const {name,value} = e.target;
        setFormObj((prev)=> ({...prev, [name]:value}));
    }

    const handleModalClose=()=>{
        setFormObj({currentPassword:'', newPassword:'', confirmNewPassword: ''});
        unShow(false);
        setCurPassShow(false);
        setNewPassShow(false);
        setConfNewPassShow(false);
    }

    const handleSubmit= async(e)=>{
    e.preventDefault();
    let res= ResetPasswordFormValidations(formObj);
    if(res!=='true'){
        toast.error(res);
        return;
    }
    setLoading(true)
    const data = await resetPassword(formObj);
    setLoading(false)
    if(data?.success){
        toast.success(data.message);
        handleModalClose();
    }
    else{
        toast.error(data?.response?.data?.message);
    }
    }

    return (
    <>
    {loading ? <Loader/> : 
    <>
        <BasicModal show={show} unShow={handleModalClose} title='Reset Password'>
        <form onSubmit={handleSubmit}>

                        <div className='mb-3'>
                        <label className='text-[gray] mb-2'>Current Password</label>
                         <div className='flex justify-between'>
                         <input name='currentPassword' placeholder='Enter current password' value={formObj.currentPassword} onChange={handleChange} className='w-[96%] text-sm py-2 px-2 border border-stroke border-r-0 focus:outline-none rounded-md rounded-r-none' type={(!curPassShow)?"password": "text"} />
                          <span onClick={()=>setCurPassShow(!curPassShow)} className='cursor-pointer border border-stroke border-l-0 rounded-md rounded-l-none pr-2 pt-1'>{(curPassShow)? <VisibilityIcon sx={{fontSize:'1.3rem'}}/> : <VisibilityOffIcon sx={{fontSize:'1.3rem'}}/>}</span>
                         </div>
                        </div>

                        <div className='mb-3'>
                        <label className='text-[gray] mb-2'>New Password</label>
                         <div className='flex justify-between'>
                         <input name='newPassword' placeholder='Enter new password' value={formObj.newPassword} onChange={handleChange} className='w-[96%] text-sm py-2 px-2 border border-stroke border-r-0 focus:outline-none rounded-md rounded-r-none' type={(!newPassShow)?"password": "text"} />
                          <span onClick={()=>setNewPassShow(!newPassShow)} className='cursor-pointer border border-stroke border-l-0 rounded-md rounded-l-none pr-2 pt-1'>{(newPassShow)? <VisibilityIcon sx={{fontSize:'1.3rem'}}/> : <VisibilityOffIcon sx={{fontSize:'1.3rem'}}/>}</span>
                         </div>
                        </div>

                        <div className='mb-3'>
                        <label className='text-[gray] mb-2'>Confirm New Password</label>
                        <div className='flex justify-between'>
                         <input name='confirmNewPassword' placeholder='Confirm new password' value={formObj.confirmNewPassword} onChange={handleChange} className='w-[96%] text-sm py-2 px-2 border border-stroke border-r-0 focus:outline-none rounded-md rounded-r-none' type={(!confNewPassShow)?"password": "text"} />
                          <span onClick={()=>setConfNewPassShow(!confNewPassShow)} className='cursor-pointer border border-stroke border-l-0 rounded-md rounded-l-none pr-2 pt-1'>{(confNewPassShow)? <VisibilityIcon sx={{fontSize:'1.3rem'}}/> : <VisibilityOffIcon sx={{fontSize:'1.3rem'}} />}</span>
                         </div>
                        </div>

                        <div className='flex justify-center'>
                        <button type='submit' className='bg-[#1d9bf0] text-white font-[600] text-lg px-3 py-2 mt-5 rounded-md hover:bg-[blue] transition duration-300 focus:ring'>Reset Password</button>
                        </div>
         </form>
        </BasicModal>
    </>
    }
    </>
  )
}

export default ResetPasswordFormjs