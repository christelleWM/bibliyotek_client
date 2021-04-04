import {useState} from 'react'
import {Redirection} from '../../../services/AuthService'
import {useSelector} from 'react-redux'
import {auth} from '../../../firebase'
import {toast} from 'react-toastify'
import {checkEmail} from '../../../services/ApiCall/auth'

const Register =()=>{
    const [email,setEmail] =useState('')
    const [error,setError] =useState(false)
    const {user} = useSelector((state)=>({...state}))
  
     const handleSubmit= async (e)=>{
         e.preventDefault()
         
         checkEmail({email:email}).then((res)=>{
           if(res.data)
           { setError(true) 
           console.log('Email-->',res.data)}
           else
           {
             sendEmail()
           }
         }).catch((err)=>{toast.error(err.message)})
     } 

      const sendEmail = async()=>{
      const config = {
            // URL you want to redirect back to. The domain (www.example.com) for this
            // URL must be in the authorized domains list in the Firebase Console.
            
            url:process.env.REACT_APP_REGISTER_REDIRECT_URL,
            // This must be true.
            handleCodeInApp: true,
            
          }
          console.log('Env-->',process.env.REACT_APP_REGISTER_REDIRECT_URL,'Email-->',email)
          try{

            await auth.sendSignInLinkToEmail(email,config)
            
           // The link was successfully sent. Inform the user.
           toast.success(`Envoi du lien a l'adresse mail ${email}. Rendez-vous sur votre messagerie pour finaliser l'inscription`)
           // Save the email locally so you don't need to ask the user for it again
           // if they open the link on the same device.
           window.localStorage.setItem('emailForSignIn', email);

          }
          catch(error){
            toast.error(error.message)
          }
          
          }

      
    return(
        <>
           {user? <Redirection/>:
            <div className="container" style={{paddingTop:130}}>

      
       
              <div className="col-md-6 offset-md-3">
                <h5>Registration Email</h5>
                <form onSubmit={handleSubmit}>
                  
                 <input type="email" className="form-control" value={email} onChange={(e)=>{setError(false);setEmail(e.target.value);}} autoFocus required/>   
                 {error && <div className="text-danger">Existing user</div>}
                 <br/> 
                 <button className="btn btn-raised" type="submit" style={{backgroundColor:'green',color:'white'}}>Register</button>
             
                </form>
                
              </div>
            </div>
}
       

     


    </>
    
    )
}

export default Register