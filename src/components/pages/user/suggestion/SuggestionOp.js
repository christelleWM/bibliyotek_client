import {useState,useEffect} from 'react'
import ToolsAdminNav from '../../admin/ToolsAdminNav'
import ToolsUserNav from '../ToolsUserNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import SuggestionForm from './SuggestionForm'
import {getGenres} from '../../../../services/ApiCall/genre'
import {createSuggestion} from '../../../../services/ApiCall/suggestion'


const SuggestionOp=()=>{
    const {user}= useSelector((state)=>({...state}))
    const [genres,setGenres]=useState('')
    
    useEffect(()=>{loadGenres();
      
    },[])
    
 
    const loadGenres = ()=> getGenres().then(res=>{setGenres(res.data);console.log('Genres-->',res.data)}).catch(error=>{toast.error(error.message)})
  


    const handleSubmit=(values)=>{
  
    
        createSuggestion(values,user.token)
        .then((res)=>{
           console.log('Suggestion-->',res.data)
            toast.success(`Votre suggestion a ete enregistree avec succes!!!`)
            
      
      })
        .catch((err)=>{toast.error(err.message)
          }) 

    }
       
    return(<>
                  {                       
                      user&&user.role === 'admin' && <ToolsAdminNav clic='nsuggestion'/>
                  }
                  {
                      user&&user.role === 'subscriber' && <ToolsUserNav clic='nsuggestion1'/>
                  }
                  <SuggestionForm handleSubmit={handleSubmit} genres={genres}/>

    </>)
}

export default SuggestionOp