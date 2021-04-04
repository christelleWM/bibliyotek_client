import  {useState,useEffect} from 'react'
import ToolsAdminNav from '../ToolsAdminNav'
import LivreGrid from './LivreGrid'
import { getAllLivres,removeLivre } from "../../../../services/ApiCall/livre"
import {toast} from 'react-toastify'
import LoadingSpinner from '../../helpers/LoadingSpinner'
import {useSelector} from 'react-redux'


const LivreTable=()=>{

  const [livres,setLivres]=useState([])
  const [loading,setLoading]=useState(true)
  const {user} = useSelector((state)=>({...state})) 
  

  useEffect(()=>{getLivresTable()},[])

  const getLivresTable =()=>{

    setLoading(true)
    getAllLivres()
    .then(res => {
     
       console.log('Hereeee')
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

    const handleRemove =(record)=>{
     console.log('Slug-->',record[0].slug)
      setLoading(true)
      removeLivre(record[0].slug,user.token)
      .then(() =>{
        let filtered = livres.filter((l)=>{return (l.slug !== record[0].slug)})
       setLivres(filtered)
       setLoading(false)
      })
      .catch((err)=>{
           setLoading(false)
          toast.error(err.message)
      })
    }

  
    return(<>
    <ToolsAdminNav clic="table"/>
    {loading? <LoadingSpinner/>:<LivreGrid livres={livres} handleRemove={handleRemove}/>}
    
        
        </>)

}

export default LivreTable

