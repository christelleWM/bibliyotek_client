import {useState,useEffect} from 'react'
import * as Yup from 'yup';
import {ErrorMessage, Formik} from 'formik'
import ToolsAdminNav from '../ToolsAdminNav'
import {getGenres} from '../../../../services/ApiCall/genre'
import {toast} from 'react-toastify'
import {Button} from 'antd'


const LivreForm=({handleSubmit1,handleCancel,livre})=>{
    const [genres,setGenres]=useState('')
    
 

    useEffect(()=>{loadGenres();
      
    },[])
    
    
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
          image:Yup.string(),
          // .required("Requis"),

          quantite:Yup.number(),
    
      })

    

  
   return(<>
   
          <Formik  initialValues={{
                          titre: livre? livre.titre :'',
                          auteur:livre? livre.auteur:'',
                          genre: livre && livre.genre? livre.genre._id:'',
                          annee: livre?livre.annee:'',
                          resume:livre?livre.resume:'',
                          quantite:livre?livre.quantite:'',
                          image:livre?livre.image:'',

                        }}
                        validationSchema={schema}
                        onSubmit={(values) => handleSubmit1(values)}
                      >
                        {props => {
                          const {
                            values,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                
                          } = props;
                         return <form onSubmit={handleSubmit}>
                            
                            {/* { !livre? <h6 style={{fontWeight:'bold'}} className="pb-3">Creation de livre</h6>:
                            <h6 style={{fontWeight:'bold'}}>Modification de livre</h6>} */}
                                      
                                       <div className="input-group mb-3 mt-3">
                                            <div className="input-group-prepend">
                                              <div className="input-group-text">Titre&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                                            </div>
                                           <input type="text" className="form-control" id="titre" value={values.titre} onChange={handleChange} onBlur={handleBlur}/>
                                           <div className="text-danger text-right mt-2" >
                                            <ErrorMessage name="titre"/>
                                          </div>
                                        </div>
                                        <div className="input-group mb-2">
                                           <div className="input-group-prepend">
                                              <div className="input-group-text">Auteur&nbsp;&nbsp;&nbsp;&nbsp; </div>
                                           </div>
                                           <input type="text" className="form-control"  id="auteur" value={values.auteur} onChange={handleChange} onBlur={handleBlur}/>
                                           <div className="text-danger text-right mt-2" >
                                            <ErrorMessage name="auteur"/>
                                          </div>
                                        </div> 
                                   
                                            <div className="input-group mb-2">
                                             <div className="input-group-prepend">
                                                <div className="input-group-text">Genre&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </div>
                                             </div>
                                             <select type="text" className="custom-select" id="genre" value={values.genre} onChange={handleChange} onBlur={handleBlur}>
                                               <option></option>
                                              
                                               {genres.length>0 && genres.map((g)=><option key={g._id} value={g._id}>{g.name}</option>)}
                                             </select>
                                             
                                             <br/>
                                             <div className="text-danger text-right mt-2" >
                                               <ErrorMessage name="genre"/>
                                             </div>
                                           </div>
                                           
                                    
                                        <div className="input-group mb-2">
                                           <div className="input-group-prepend">
                                              <div className="input-group-text">Annee&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </div>
                                           </div>
                                           <input type="number" className="form-control" id="annee" value={values.annee} onChange={handleChange} onBlur={handleBlur}/>
                                           <div className="text-danger text-right mt-2" >
                                            <ErrorMessage name="annee"/>
                                          </div>
                                       </div>
                                        <div className="input-group mb-2">
                                           <div className="input-group-prepend">
                                              <div className="input-group-text">Resume&nbsp;&nbsp;&nbsp;&nbsp; </div>
                                           </div>
                                           <textarea type="text" className="form-control"  id="resume" value={values.resume} onChange={handleChange} onBlur={handleBlur}/>
                                           <div className="text-danger text-right mt-2" >
                                            <ErrorMessage name="resume"/>
                                          </div>
                                        </div> 


                                        
                                       <br/><br/>
                                       <div className="input-group mb-2">
                                           <div className="input-group-prepend">
                                              <div className="input-group-text">Quantite&nbsp;&nbsp;&nbsp;</div>
                                           </div>
                                           <input type="number" className="form-control" id="quantite" value={values.quantite} onChange={handleChange} onBlur={handleBlur}/>
                                           <div className="text-danger text-right mt-2" >
                                            <ErrorMessage name="quantite"/>
                                          </div>
                                       </div>
                                       {/* <div className="input-group mb-4">
                                           <div className="input-group-prepend">
                                              <div className="input-group-text">Prix&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </div>
                                           </div>
                                           <input type="number" className="form-control" id="prix" value={values.prix} onChange={handleChange} onBlur={handleBlur}/>
                                           <div className="text-danger text-right mt-2" >
                                            <ErrorMessage name="prix"/>
                                          </div>
                                       </div> */}
                                       <div className="pt-3">
                                         <Button onClick = {()=>{handleSubmit1(values)}}  className="col-md-4 offset-md-2" style={{backgroundColor:'green',color:'white'}} shape="round">
                                                Save
                                         </Button>
                                         <Button onClick = {handleCancel} className="col-md-4 offset-md-1" style={{backgroundColor:'orange',color:'white'}} block shape="round">
                                              Cancel
                                         </Button>
                                       </div>
                                       
                          
                                       
                                       
             
                                    </form>}}
                               </Formik> 
          
       
          

                
   </>) 
}

export default LivreForm