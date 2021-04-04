import axios from 'axios'

export const createLivre = async (livre,authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/livre`,livre,{headers: {authtoken}})
  }

  export const getLivresToolsPage = async (params) => {
    return await axios.post(`${process.env.REACT_APP_API}/livres-tools`,params)
  } 

  export const getLivresHomePage = async (params) => {
    return await axios.post(`${process.env.REACT_APP_API}/livres-home`,params)
  }  

  export const getAllLivres = async () => {
    return await axios.post(`${process.env.REACT_APP_API}/list-livres`,{})
  } 

  export const getLivre= async (slug) => {
    return await axios.get(`${process.env.REACT_APP_API}/livre/${slug}`)
  } 

  export const updateLivre= async (slug,livre,authtoken) => {
    return await axios.put(`${process.env.REACT_APP_API}/livre/${slug}`,livre,{headers: {authtoken}})
  }  

  export const removeLivre= async (slug,authtoken) => {
    return await axios.delete(`${process.env.REACT_APP_API}/livre/${slug}`,{headers: {authtoken}})
  }  