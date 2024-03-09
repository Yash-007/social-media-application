import axios from "axios";

export const axiosInstance= async(method, endpoint, payload, form)=>{
    try {
        const response = await axios({
            method,
            url:endpoint,
            data: payload,
            headers:{
                Authorization: `${localStorage.getItem("token")}`,
                "Content-Type":(form)? "multipart/form-data" : "application/json",
                "Refresh-Token": `${localStorage.getItem("refreshToken")}`
            }
        })
        return response.data;
    } catch (error) {
        return error;
    }
}