import  {useState,useEffect} from 'react'
import ToolsAdminNav from '../ToolsAdminNav'
import PretGrid from './PretGrid'
import { getAllLivres } from "../../../../services/ApiCall/livre"
import {toast} from 'react-toastify'
import LoadingSpinner from '../../helpers/LoadingSpinner'
import {useSelector} from 'react-redux'


const PretTable=()=>{

  const [livres,setLivres]=useState([])
  const [loading,setLoading]=useState(true)
  const {user} = useSelector((state)=>({...state})) 

  useEffect(()=>{getLivresTable()},[])

  const getLivresTable =()=>{

    setLoading(true)
    getAllLivres()
    .then(res => {
     
       
       if (res.data) 
       {
        res.data.map(r=>{
        livres.push({titre:r.titre,auteur:r.auteur,resume:r.resume,quantite:r.quantite,annee:r.annee,genre:r.genre.name,slug:r.slug,quantitePret:r.quantitePret})})
        
      
       console.log('Livres-total-->',res.data)
       setLoading(false)
      }
    })
    .catch(err=>{
       setLoading(false)
       toast.error(err.message)
    })}

 
  
    return(<>
    <ToolsAdminNav clic="npret"/>
    {loading? <LoadingSpinner/>:<PretGrid livres={livres}/>}
    
        
        </>)

}

export default PretTable