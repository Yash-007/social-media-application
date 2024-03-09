import validator from 'validator'
export const handleFormData =(formObj)=>{
    let formData= new FormData();
             for(const [key,value] of Object.entries(formObj)){
             if(value instanceof File){
                 formData.append(key,value);
             }
             else{
                 formData.append(key,value?.toString());
             }  
            }

        return formData;
}

export const SignupformValidations=(formObj)=>{
    if(formObj.name ==='') return "Name is required";
    if(formObj.userName ==='') return "Username is required";
    if(formObj.email ==='') return "Email is required";
    if(!validator.isEmail(formObj.email)) return "Please enter correct email format";
    if(formObj.password ==='') return "Password is required";
    if(formObj.confirmPassword ==='') return "Confirm password is required";
    if(formObj.profilePic ==='') return "Profile pic is required";
    if(formObj.password !== formObj.confirmPassword) return "Password and Confirm password must be same";
  
    return "true";
}

export const SigninformValidations=(formObj)=>{
    if(formObj.name ==='') return "Name is required";
    if(formObj.email ==='') return "Email is required";
    if(!validator.isEmail(formObj.email)) return "Please enter correct email format";
  
    return "true";
}


export const ResetPasswordFormValidations= (formObj)=>{
    if(formObj.currentPassword ==='') return "Please enter your current password";
    if(formObj.newPassword ==='') return "Please enter your new password";
    if(formObj.confirmNewPassword ==='') return "Please confirm your new password";
    if(formObj.newPassword !== formObj.confirmNewPassword) return "New password and Confirm new password must be same";
    if(formObj.currentPassword === formObj.newPassword) return "Current Password and New Password can't be same";

    return "true";
}