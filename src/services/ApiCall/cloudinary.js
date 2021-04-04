import axios from 'axios'

export const uploadImage = async (image,authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/upload-image`,image,{headers: {authtoken}})
  }

  export const removeImage = async (image,authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/remove-image`,image, {headers : {authtoken}})
  }