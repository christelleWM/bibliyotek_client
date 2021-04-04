import axios from 'axios'

export const getGenres = async () => {
    return await axios.get(`${process.env.REACT_APP_API}/genres`) 
  }


  export const getGenre = async (slug) => {
    return await axios.get(`${process.env.REACT_APP_API}/genre/${slug}`)
  }

  export const removeGenre = async (slug, authtoken) => {
    return await axios.delete(`${process.env.REACT_APP_API}/genre/${slug}`,{headers: {authtoken}})
  }

  export const updateGenre = async (slug, authtoken,genre) => {
    return await axios.put(`${process.env.REACT_APP_API}/genre/${slug}`,genre,{headers:{authtoken} })
  }

  export const createGenre = async (genre,authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/genre`,genre,{headers: {authtoken}})
  }
