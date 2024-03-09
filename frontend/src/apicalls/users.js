import { axiosInstance } from "."


export const registerUser= async(payload)=>{
   const response = await axiosInstance("post",`${process.env.REACT_APP_SERVER}/api/v1/user/register`, payload,true)
   return response
} 
export const SigninUser= async(payload)=>{
   const response = await axiosInstance("post",`${process.env.REACT_APP_SERVER}/api/v1/user/signin`, payload)
   return response
} 

export const verifyemailurl=async(param)=>{
   const response = await axiosInstance("get",`${process.env.REACT_APP_SERVER}/api/v1/user/${param.id}/verify/${param.token}` )
   return response
}

export const getcurrentuser= async()=>{
    const response = await axiosInstance("get",`${process.env.REACT_APP_SERVER}/api/v1/user/current`)
    return response
 }

export const resetPassword= async(payload)=>{
  const response = await axiosInstance("put", `${process.env.REACT_APP_SERVER}/api/v1/user/reset`, payload,false);
  return response
}