import { useState } from "react"
import {auth} from '../../../firebase'
import {toast} from 'react-toastify'


const ForgotPassword=()=>{

   const [email,setEmail] =useState('')

   const handleSubmit = async(e)=>{
      e.preventDefault()
      const config = {
         url : process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
         handleCodeInApp : true
     }
     await auth.sendPasswordResetEmail(email,config).then(()=>{
         console.log('Hello')
         toast.success('Consulter votre adreese mail pour reinitialiser le mot de passe')
     }

     )
     .catch((error)=> {toast.error(error.message)})

   }

   return(<>
                    <div className="container" style={{paddingTop:130}}>
                       <div className="col-md-6 offset-md-3">
                         <h5>Enter email for password reset</h5>
                         <form onSubmit={handleSubmit}>
                             <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} autoFocus required/>   
                              <br/> 
                             <button className="btn btn-raised" type="submit">Reset</button>
                         </form>
                       </div>
                    </div>
   
   
   </>)

}

export default ForgotPassword