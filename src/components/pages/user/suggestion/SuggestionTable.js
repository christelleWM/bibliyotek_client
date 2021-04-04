import  {useState,useEffect} from 'react'
import ToolsAdminNav from '../../admin/ToolsAdminNav'
import ToolsUserNav from '../ToolsUserNav'
import SuggestionGrid from './SuggestionGrid'
import { getSuggestionTable} from "../../../../services/ApiCall/suggestion"
import {toast} from 'react-toastify'
import LoadingSpinner from '../../helpers/LoadingSpinner'
import {useSelector} from 'react-redux'


const SuggestionTable=()=>{

  const [suggestions,setSuggestions]=useState([])
  const [loading,setLoading]=useState(true)
  const {user} = useSelector((state)=>({...state})) 

  useEffect(()=>{getSuggestions()},[])

  const getSuggestions =()=>{

    setLoading(true)
    console.log('Hiiiiiiiiiiiiii')
    getSuggestionTable(user.token)
    .then(res => {
     console.log('DataS uggestions-->',res.data)
       
       if (res.data) 
       {
        res.data.map(r=>{
        suggestions.push({titre:r.titre,auteur:r.auteur,annee:r.annee,genre:r.genre.name,username:r.suggestedBy.username})})
        
      
       console.log('Suggestions-->',res.data)
       setLoading(false)
      }
    })
    .catch(err=>{
       setLoading(false)
       toast.error(err.message)
    })}


  
    return(<>
                 {                       
                      user&&user.role === 'admin' && <ToolsAdminNav clic='lsuggestion'/>
                  }
                  {
                      user&&user.role === 'subscriber' && <ToolsUserNav clic='lsuggestion1'/>
                  }
    {loading? <LoadingSpinner/>:<SuggestionGrid suggestions={suggestions}/>}
    
        
        </>)

}

export default SuggestionTable

