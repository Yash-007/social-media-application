import { axiosInstance } from "."


export const getPosts=async(page)=>{
    const response = await axiosInstance("get",`${process.env.REACT_APP_SERVER}/api/v1/post/get?page=${page}`)
    return response
}