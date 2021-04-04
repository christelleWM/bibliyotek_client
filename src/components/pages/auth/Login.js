import { useEffect,useState}  from 'react'
import * as Yup from 'yup';
import {ErrorMessage, Formik} from 'formik'
import { toast } from 'react-toastify'
import {Button} from 'antd'
import {MailOutlined,GoogleOutlined} from '@ant-design/icons'
import {createUpdateUser} from '../../../services/ApiCall/auth'
import {auth,googleAuthProvider} from '../../../firebase'
import {useDispatch,useSelector} from 'react-redux'
import {Link} from 'react-router-dom'


const Login=({history})=>{
    
    const [showForm,setShowForm]=useState(false)
    const dispatch = useDispatch()
    const {user} =useSelector((state)=>({...state}))
    
    
    const schema = Yup.object().shape({
        email: Yup.string()
          .email("Email invalide")
          .required("Requis"),
          password: Yup.string()
          .required("Requis")
          .min(6,'Trop court'),
      })
      

    useEffect(()=>{
     user ? loginRedirect() : setShowForm(true)
    },[user])


     const handleSubmit= async(values)=>{
         console.log('Values-->',values)

         try{
            const result=  await auth.signInWithEmailAndPassword(values.email,values.password)
            const {user} = result
            const idTokenResult = await user.getIdTokenResult()
            
            createUpdateUser(idTokenResult.token,{}).then((res)=>{
              console.log('User-->', res.data)
              dispatch({
                type : 'LOGGED_IN_USER',
                payload : {
         
                 email : res.data.email,
                 username :res.data.username,
                 address:res.data.address,
                 role : res.data.role,

                 token:idTokenResult.token,
                 _id : res.data._id }
         
                      })
                      loginRedirect()
         

             
         }).catch((error)=>{
              toast.error(error.message)
         })}
         catch(error){
             toast.error(error.message)
         }

     }

     const handleGoogle=()=>{
        auth.signInWithPopup(googleAuthProvider).then(async (result) => {
            const {user} = result
            const idTokenResult = await user.getIdTokenResult()
            createUpdateUser(idTokenResult.token,{}).then((res)=>{
             console.log('Create OR UPDATE RES', res)
             dispatch({
                type : 'LOGGED_IN_USER',
                payload : {
         
                 email : res.data.email,
                 username :res.data.username,
                 address:res.data.address,
                 role : res.data.role,
                 token:idTokenResult.token,
                 _id : res.data._id }
         
                      })
                      loginRedirect()
           
                    }).catch((error)=>toast.error(error.message))
                 }).catch((error)=> toast.error(error.message)) 

                 
 }


 
  const loginRedirect=()=>{
    let intended = history.location.state
    console.log('Intended-->',intended)
    if(intended) {

      history.push(intended.from)
    }
    else 
    {
      user && user.role === 'admin' && history.push('/admin')
      user && user.role === 'subscriber' && history.push('/user')
    }
  }



    return(<> {showForm &&
        
        <div className="container" style={{paddingTop:130}}>
              <div className="col-md-6 offset-md-3">
                <h5>Connexion</h5>
                 <Formik  initialValues={{
                          email: '',
                          password: '',
                         

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
                                       
                                        <div className="input-group mb-2 mt-2">
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
                                        <div>
                                            <Button onClick = {handleSubmit} icon={<MailOutlined/>} className="col-md-12 mb-3 mt-3" style={{backgroundColor:'green',color:'white'}} shape="round">
                                                Connexion avec Email/Mot de Passe
                                            </Button>
                                            <Button onClick = {handleGoogle} icon={<GoogleOutlined/>} className="col-md-12" style={{backgroundColor:'orange',color:'white'}} block shape="round">
                                                Connexion avec Google
                                            </Button> 
                                            <Link to='/forgot-password' className="float-right text-danger" style={{'fontWeight':'bold'}}>Mot de passe oublie</Link>
                                        </div>
                                      
                                    
                                       <br/> 
                                    </form>}}
                               </Formik> 
                   </div>
            </div> 
    
     }
    </>)
}

export default Login