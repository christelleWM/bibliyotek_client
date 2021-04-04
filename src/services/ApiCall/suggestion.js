import axios from 'axios'

export const createSuggestion = async (suggestion,authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/suggestion`,suggestion,{headers: {authtoken}})
  }

  export const getSuggestionTable = async (authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/list-suggestion`,{},{headers: {authtoken}})
  }