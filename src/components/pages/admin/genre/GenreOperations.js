import {useState,useEffect} from 'react'
import { toast } from 'react-toastify'
import {getGenres} from '../../../../services/ApiCall/genre'
import GenreCreate from './GenreCreate'
import GenreUpdateDelete from './GenreUpdateDelete'
import ToolsAdminNav from '../ToolsAdminNav'
import LoadingSpinner from '../../helpers/LoadingSpinner'


const GenreOperations = ()=>{

    const [genre,setGenre]=useState('')
    const [genres, setGenres] =useState([])
    const [loading,setLoading]=useState(true)
    
    useEffect(()=>{loadGenres();
    },[])
    
  
    const loadGenres = ()=> {
       
      setLoading(true)
      getGenres().then(res=>{
         setLoading(false)
         setGenres(res.data);console.log('Genres-->',res.data)}).catch(error=>{
            setLoading(false)
            toast.error(error.message)})}


 
   return(<>
     <ToolsAdminNav clic="genres"/>
      <GenreCreate  genre={genre} setGenre={setGenre} loadGenres={loadGenres} setLoading={setLoading}/>
      {loading?<LoadingSpinner/>: <GenreUpdateDelete genres={genres} loadGenres={loadGenres} setLoading={setLoading} loading={loading}/>}
      
    
    
   </>)

}

export default GenreOperations