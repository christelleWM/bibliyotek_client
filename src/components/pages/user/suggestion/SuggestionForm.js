
import * as Yup from 'yup'
import {ErrorMessage, Formik} from 'formik'

import {Button,Card} from 'antd'

const SuggestionForm=({handleSubmit,genres})=>{



    const schema = Yup.object().shape({
        titre: Yup.string()
          .required("Requis"),
          auteur: Yup.string()
          .required("Requis"),
          genre: Yup.string()
          .required("Requis"),
          annee: Yup.number(),
          
      })

  
   return(<>
        
        
           <div className="col-md-4 offset-md-4" style={{paddingTop:150,paddingBottom:10}}>
          <Formik  initialValues={{
                          titre: '',
                          auteur: '',
                          genre: '',
                          annee:'',
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
                             <Card>
                            
                            <h6 style={{fontWeight:'bold'}}>Suggestion de livre</h6>
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
                                          <select type="text" className="custom-select" id="genre" onChange={handleChange} onBlur={handleBlur}>
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
                                       


                                      
                                       <Button onClick = {handleSubmit}  className="col-md-6 offset-md-3" style={{backgroundColor:'green',color:'white',marginTop:10}} shape="round">
                                                Sauvegarder
                                        </Button>
                                      
                             </Card>
                                       
                                       
             
                                    </form>}}
                               </Formik> 
          
          </div>
             
           
          

                
   </>) 

}

export default SuggestionForm