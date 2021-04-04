import  {useState,useEffect} from 'react'
import ToolsAdminNav from '../../../admin/ToolsAdminNav'

import { getPretTable,updatePret} from "../../../../../services/ApiCall/pret"
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import PretListGrid from './PretListGrid'
import LoadingSpinner from '../../../../pages/helpers/LoadingSpinner'

const PretListTable=()=>{

  const [prets,setPrets]=useState([])
  const [loading,setLoading]=useState(true)
  const {user} = useSelector((state)=>({...state})) 


  useEffect(()=>{getPrets()},[])

  const getPrets =()=>{
    
    setLoading(true)
    console.log('Hiiiiiiiiiiiiii')

    getPretTable(user.token)
    .then(res => {
     console.log('Data prets-->',res.data)
       
       if (res.data) 
       {
        res.data.map(r=>{
        prets.push({id:r._id,titre:r.livre.titre,slug:r.livre.slug,auteur:r.livre.auteur,annee:r.livre.annee,
          genre:r.livre.genre.name,pret:r.quantiteAPreter,statut:r.statut,username:r.user.username,
          quantite:r.livre.quantite,quantitePret:r.livre.quantitePret
        })})
        
      
       console.log('Prets-->',res.data)
       setLoading(false)
      }
    })
    .catch(err=>{
       setLoading(false)
       toast.error(err.message)
    })}


   const handleEdit=(record)=>{
     setLoading(true)
     console.log('Record-->',record)
     
     
     updatePret({id:record.id,slug:record.slug,quantite:record.quantite,quantitePret:record.quantitePret,statut:record.statut,pret:record.pret},user.token)
      .then((res)=>{
       console.log('Res-->',res.data)
        prets.map((p,i)=> {
       
             if(res.data.updated1.slug===prets[i].slug)
             { 
             
               if(prets[i].id ===res.data.updated2._id) prets[i].statut = res.data.updated2.statut
                prets[i].quantite = res.data.updated1.quantite
               prets[i].quantitePret = res.data.updated1.quantitePret
               console.log('Pret-->',prets[i])
          
              }
            
              console.log('Loading-->',loading)
             })
          
           
         setLoading(false)
      })
     .catch((err)=>{
       setLoading(false)
       toast.error(err.message)
     })
     

   }
  
    return(<>
                                
    <ToolsAdminNav clic='lpret'/>
                
    {loading? <LoadingSpinner/>:<PretListGrid prets={prets} handleEdit={handleEdit}/>}
    
        
        </>)

}

export default PretListTable

