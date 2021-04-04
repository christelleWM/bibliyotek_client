import axios from 'axios'

export const createUpdateUser = async(authtoken,values)=>{
    console.log('Values-->',values,'Authtoken-->',authtoken)
     return await axios.post(`${process.env.REACT_APP_API}/create-update-user`,values,{headers:{authtoken}})
}

export const checkEmail=async(email)=>{
     return await axios.post(`${process.env.REACT_APP_API}/check-email`,email,{})
}