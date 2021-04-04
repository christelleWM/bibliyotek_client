import axios from 'axios'

export const createPret = async (pret,authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/pret`,pret,{headers: {authtoken}})
  }

  export const getPretTable = async (authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/list-pret`,{},{headers: {authtoken}})
  }

  export const updatePret = async (pret,authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/update-pret`,pret,{headers: {authtoken}})
  }