import React, { useEffect, useState } from 'react'
import { getcurrentuser } from '../apicalls/users'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function addPropsToReactElement(element, props) {
    if (React.isValidElement(element)) {
        return React.cloneElement(element, props)
    }
    return element
}

function addPropsToChildren(children, props) {
    if (!Array.isArray(children)) {
        return addPropsToReactElement(children, props)
    }
    return children.map(childElement =>
        addPropsToReactElement(childElement, props)
    )
}

function ProtectedPage({children}) {
 const navigate = useNavigate();
 const [currentUser,setCurrentUser] = useState(null);
 useEffect(()=>{
    const getCurrentUser=async()=>{
        try {
            const response=  await getcurrentuser();
            if(response.success){
                if(response.token){
                    localStorage.removeItem("token");
                    localStorage.setItem("token",response.token);
                }
                setCurrentUser(response.user);
            }
            else{
            toast.error(response?.response?.data?.message)
            localStorage.removeItem("token");
            navigate("/signin");
            }
        } catch (error) {
            toast.error(error.message);
            localStorage.removeItem("token");
            navigate("/signin");
          }
    }

    if(localStorage.getItem("token"))
    getCurrentUser();
    else 
    navigate("/signin");
 },[]);

  return (
    <>
        {currentUser && <div>{addPropsToChildren(children,{currentUser})}</div> } 
    </>
  )
}

export default ProtectedPage