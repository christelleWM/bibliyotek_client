import React,{useState} from 'react'
import ToolsAdminNav from '../admin/ToolsAdminNav'
import ToolsUserNav from './ToolsUserNav'

import {auth} from '../../../firebase'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'


const Password =()=>{

    const [password, setPassword]=useState('')
    const [loading, setLoading]=useState(true)
    const {user}= useSelector((state)=>({...state}))

    const handleSubmit = async (e) =>{
        e.preventDefault()
        setLoading(true)
        await auth.currentUser.updatePassword(password)
        .then(()=>{
            toast.success('Mot de passe mis a jour!!')
            setLoading(false)
            setPassword('')})
        .catch((error)=>{toast.error(error.message);setLoading(false)})
        
    }
    return(
     <>
                  {
                      user&&user.role === 'admin' && <ToolsAdminNav clic='passe'/>
                  }
                  {
                      user&&user.role === 'subscriber' && <ToolsUserNav clic='passe'/>
                  }
     <div className="col-md-4 offset-md-4" style={{paddingTop:130}} >
                    <form onSubmit={handleSubmit}>
                       <div className="input-group mb-2 mt-2">
                         <input type="password" placeholder="Nouveau mot de passe" className="form-control mr-4" value={password} onChange={(e)=>{setPassword(e.target.value)}} autoFocus required/>   
                 
                         <br/> 
                        <button className="btn btn-raised" type="submit">Changer</button>
                      </div>
                    </form>
                 </div>
     
     </>
    )
      
}

export default Password