import {useState,useEffect,lazy,suspense} from 'react'
import {toast} from 'react-toastify'
import {Button,Card,Badge,Avatar} from 'antd'
import {getLivre} from '../../../services/ApiCall/livre'
import {useSelector} from 'react-redux'
import ToolsAdminNav from '../admin/ToolsAdminNav'

const Livre=({history,match})=>{
  
    const [livre,setLivre]=useState([])
    const [loading,setLoading]=useState(true)
    const {user} = useSelector((state)=>({...state})) 

    useEffect(()=>{loadLivre()
   console.log('History-->',history.location.state)
   },[])

    const loadLivre =()=>{
        setLoading(true)
        getLivre(match.params.slug)
        .then(res=>{
            setLivre(res.data)
            console.log('To see-->',res.data)
            setLoading(false)
        })
        .catch(err=>{
            setLoading(false)
            toast.error(err.message)
        })
    }
 

    const handleSubmit=()=>{
        let intended = history.location.state
        console.log('Intended-->',intended)
        history.push(intended.from)
    }

  
   return(<>
   { history.location.state.from === "/admin/tools/livres-card-interface" && <ToolsAdminNav/>
      
   }
      
         {
            !loading &&  <div className="col-md-4 offset-md-4" style={{paddingTop:100,paddingBottom:10}}>
            <form onSubmit={handleSubmit}>
                      
                            {
                               livre && livre.image &&     
                                    <Badge  key={livre.image[0].public_id} style={{cursor:'pointer'}}>
                                       <Avatar  shape="square" src={livre.image[0].url} size={100}/>
                                    </Badge>
                             }
                       
                                  <div className="input-group mb-3 mt-3">
                                       <div className="input-group-prepend">
                                         <div className="input-group-text">Titre&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                                       </div>
                                      <input type="text" className="form-control" id="titre" value={livre.titre} disabled/>
                                    
                                   </div>
                                   <div className="input-group mb-2">
                                      <div className="input-group-prepend">
                                         <div className="input-group-text">Auteur&nbsp;&nbsp;&nbsp;&nbsp; </div>
                                      </div>
                                      <input type="text" className="form-control"  id="auteur" value={livre.auteur} disabled/>
                                     
                                   </div> 
                                   <div className="input-group mb-2">
                                      <div className="input-group-prepend">
                                         <div className="input-group-text">Genre&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </div>
                                      </div>
                                      <input type="text" className="form-control" id="genre" value={livre && livre.genre && livre.genre.name} disabled/>
                                     
                                  </div>
                                  
                                   <div className="input-group mb-2">
                                      <div className="input-group-prepend">
                                         <div className="input-group-text">Annee&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </div>
                                      </div>
                                      <input type="number" className="form-control" id="annee" value={livre.annee} disabled/>
                                     
                                  </div>
                                   <div className="input-group mb-2">
                                      <div className="input-group-prepend">
                                         <div className="input-group-text">Resume&nbsp;&nbsp;&nbsp;&nbsp; </div>
                                      </div>
                                      <textarea type="text" className="form-control"  id="resume" value={livre.resume} disabled/>
                                     
                                   </div> 


                                   
                                  <br/><br/>
                                  {user && user.role === 'admin' && <div className="input-group mb-2">
                                      <div className="input-group-prepend">
                                         <div className="input-group-text">Quantite&nbsp;&nbsp;&nbsp;</div>
                                      </div>
                                      <input type="number" className="form-control" id="quantite" value={livre.quantite} disabled/>
                                     
                                  </div> }
                                 
                                 
                                  <Button onClick = {handleSubmit}  className="col-md-6 offset-md-3" style={{backgroundColor:'green',color:'white',marginTop:10}} shape="round">
                                           Fermer
                                   </Button>
                                  
                      
                                  
                                  
        
                               </form>
                    
     </div>

         }  
        
             
           
          

                
   </>) 
}

export default Livre