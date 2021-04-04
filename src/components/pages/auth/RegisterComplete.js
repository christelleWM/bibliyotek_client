import {useState} from 'react'
import * as Yup from 'yup';
import {ErrorMessage, Formik} from 'formik'
import { toast } from 'react-toastify'
import {auth} from '../../../firebase'
import { createUpdateUser } from '../../../services/ApiCall/auth'
import {useDispatch} from 'react-redux'



const RegisterComplete =({history})=>{ 
    const [email,setEmail]=useState(window.localStorage.getItem('emailForSignIn'))
    
    const dispatch = useDispatch()

    const schema = Yup.object().shape({
        email: Yup.string()
          .email("Email invalide")
          .required("Requis"),
          password: Yup.string()
          .required("Requis")
          .min(6,'Trop court'),
          address: Yup.string()
          .required("Requis"),
          username: Yup.string()
          .required("Requis"),
      })



    const handleSubmit = async (values)=>{
       console.log('Values-->',values)
      
       try{
        const result = await auth.signInWithEmailLink(values.email, window.location.href)
        console.log('Result-->',result)


        if(result.user.emailVerified)
        {
            window.localStorage.removeItem('emailForSignIn')
           // console.log('user-->',auth)
            let user = auth.currentUser
            await user.updatePassword(values.password)
            const idTokenResult = await user.getIdTokenResult()
  
            createUpdateUser(idTokenResult.token,{address:values.address,username:values.username}).then((res)=>{
            
                dispatch({
                    type : 'LOGGED_IN_USER',
                    payload : {
             
                     email : res.data.email,
                     username :res.data.username,
                     address:res.data.address,
                     role : res.data.role,
                     token:idTokenResult.token,
                     _id : res.data._id }})
                     console.log('Userr-->',res.data)
                     history.push('/') 

            }).catch((error)=>{
                toast.error(error.message)
                console.log('Error-->',error)
            })

            
        }
       }
       catch(error){
           toast.error(error.message)
           history.push('/register')
       }

    }

    return(<>

          
    
           <div className="container" style={{paddingTop:130}}>
              <div className="col-md-6 offset-md-3">
                <h5>Complete Registration</h5>
                 <Formik  initialValues={{
                          email: email,
                          password: '',
                          address:'',
                          username:''

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
                                       <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                              <div className="input-group-text">Username&nbsp;&nbsp;&nbsp;</div>
                                            </div>
                                           <input type="text" className="form-control" id="username" value={values.username} onChange={handleChange} onBlur={handleBlur}/>
                                           <div className="text-danger text-right mt-2" >
                                            <ErrorMessage name="username"/>
                                          </div>
                                        </div>
                                        <div className="input-group mb-2">
                                           <div className="input-group-prepend">
                                              <div className="input-group-text">Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </div>
                                           </div>
                                           <input type="email" className="form-control"  id="email" value={values.email} onChange={handleChange} onBlur={handleBlur}/>
                                           <div className="text-danger text-right mt-2" >
                                            <ErrorMessage name="email"/>
                                          </div>
                                        </div> 
                                        <div className="input-group mb-2">
                                          <div className="input-group-prepend">
                                             <div className="input-group-text">Password&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </div>
                                          </div>
                                          <input type="password" className="form-control" id="password" value={values.password} onChange={handleChange} onBlur={handleBlur}
                                          />
                                          <br/>
                                          <div className="text-danger text-right mt-2" >
                                            <ErrorMessage name="password"/>
                                          </div>
                                        </div>
                                        <div className="input-group mb-2">
                                           <div className="input-group-prepend">
                                              <div className="input-group-text">Address&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </div>
                                           </div>
                                           <input type="text" className="form-control" id="address" value={values.address} onChange={handleChange} onBlur={handleBlur}/>
                                           <div className="text-danger text-right mt-2" >
                                            <ErrorMessage name="address"/>
                                          </div>
                                       </div>
                                       <br/> 
                                       <button className="btn btn-raised" type="submit">S'inscrire</button>
             
                                    </form>}}
                               </Formik> 
                   </div>
            </div>
         
    
    </>)
}

export default RegisterComplete