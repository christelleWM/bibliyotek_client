import {useState,useEffect} from 'react'
import * as Yup from 'yup';
import {ErrorMessage, Formik} from 'formik'
import ToolsAdminNav from '../ToolsAdminNav'
import {getGenres} from '../../../../services/ApiCall/genre'
import {toast} from 'react-toastify'
import {Button,Badge,Avatar} from 'antd'


const PretForm=({handleSubmit,handleCancel,match,livre})=>{
    const [genres,setGenres]=useState('')
    const [quantite,setQuantite]=useState(livre.quantite)
 

    useEffect(()=>{loadGenres();
      
    },[])
    
    console.log('InsideGenre-->',genres)
    const loadGenres = ()=> getGenres().then(res=>{setGenres(res.data);console.log('Genres-->',res.data)}).catch(error=>{toast.error(error.message)})


    

    const schema = Yup.object().shape({
        titre: Yup.string()
          .required("Requis"),
          auteur: Yup.string()
          .required("Requis"),
          genre: Yup.string()
          .required("Requis"),
          annee: Yup.number(),
          resume:Yup.string()
          .required('Requis')
          .min(15,'Trop court'),
          quantiteAPreter:Yup.number()
          .required('Requis')
          .max(quantite,'La quantite doit etre inferieure a celle de disponible')
          .min(1,'Un pret minimum!!!'),
          quantite:Yup.number(),
          email: Yup.string()
          .required("Requis")
          .email("Email invalide"),
          
      })

    

  
   return(<>
           <ToolsAdminNav clic="npret"/>
        
           <div className="col-md-4 offset-md-4" style={{paddingTop:100,paddingBottom:10}}>
          <Formik  initialValues={{
                          titre: livre &&livre.titre,
                          auteur:livre && livre.auteur,
                          genre: livre && livre.genre && livre.genre.name,
                          annee: livre && livre.annee,
                          resume:livre && livre.resume,
                          quantite:livre && livre.quantite,
                          quantiteAPreter:'',
                          email: ''

                        }}
                        validationSchema={schema}
                        onSubmit={(values) => handleSubmit(values)}
                      >
                        {props => {
                          const {
                            values,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                
                          } = props;
                         return <form onSubmit={handleSubmit}>
                            
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
                                           <input type="text" className="form-control" id="titre" value={values.titre} disabled/>
                                           
                                        </div>
                                        <div className="input-group mb-2">
                                           <div className="input-group-prepend">
                                              <div className="input-group-text">Auteur&nbsp;&nbsp;&nbsp;&nbsp; </div>
                                           </div>
                                           <input type="text" className="form-control"  id="auteur" value={values.auteur} disabled/>
                                          
                                        </div> 
                                        <div className="input-group mb-2">
                                          <div className="input-group-prepend">
                                             <div className="input-group-text">Genre&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </div>
                                          </div>
                                          <input type="text" className="form-control"  id="genre" value={values.genre} disabled/>
                                         
                                        </div>
                                        <div className="input-group mb-2">
                                           <div className="input-group-prepend">
                                              <div className="input-group-text">Annee&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </div>
                                           </div>
                                           <input type="number" className="form-control" id="annee" value={values.annee} disabled/>
                                           
                                       </div>
                                        <div className="input-group mb-2">
                                           <div className="input-group-prepend">
                                              <div className="input-group-text">Resume&nbsp;&nbsp;&nbsp;&nbsp; </div>
                                           </div>
                                           <textarea type="text" className="form-control"  id="resume" value={values.resume} disabled/>
                                           
                                        </div> 


                                        
                                       <br/><br/>
                                       <div className="input-group mb-2">
                                           <div className="input-group-prepend">
                                              <div className="input-group-text">Quantite&nbsp;&nbsp;&nbsp;</div>
                                           </div>
                                           <input type="number" className="form-control" id="quantite" value={values.quantite} disabled/>
                                          
                                       </div>
                                       <br/> <br/> <br/>
                                       <div className="input-group mb-2">
                                           <div className="input-group-prepend">
                                              <div className="input-group-text">Quantite a preter&nbsp;&nbsp;&nbsp;</div>
                                           </div>
                                           <input type="number" className="form-control" id="quantiteAPreter" value={values.quantiteAPreter} onChange={handleChange} onBlur={handleBlur}/>
                                           <div className="text-danger text-right mt-2" >
                                            <ErrorMessage name="quantiteAPreter"/>
                                          </div>
                                       </div>
                                       <div className="input-group mb-2">
                                           <div className="input-group-prepend">
                                              <div className="input-group-text">Email_user&nbsp;&nbsp;&nbsp;</div>
                                           </div>
                                           <input type="email" className="form-control" id="email" value={values.email} onChange={handleChange} onBlur={handleBlur}/>
                                           <div className="text-danger text-right mt-2" >
                                            <ErrorMessage name="email"/>
                                          </div>
                                       </div>
                                       <div style={{marginTop:20}}>
                                       <Button onClick = {handleSubmit}  className="col-md-4 offset-md-2" style={{backgroundColor:'green',color:'white'}} shape="round">
                                                Save
                                        </Button>
                                        <Button onClick = {handleCancel} className="col-md-4 offset-md-1" style={{backgroundColor:'orange',color:'white'}} block shape="round">
                                              Cancel
                                        </Button>
                                        </div>
                         
                                       
                                       
             
                                    </form>}}
                               </Formik> 
          
          </div></>)}
             


export default PretForm             
           