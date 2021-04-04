import {createLivre} from '../../../../services/ApiCall/livre'
import {useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import LivreForm from './LivreForm'
import ImageForm from './ImageForm'
import ToolsAdminNav from '../ToolsAdminNav'
import {Card} from 'antd'
import { useState } from 'react'

const LivreCreate=({history})=>{
    const {user} = useSelector((state)=>({...state})) 
    const [image,setImage]=useState('')

    const handleSubmit1=(values)=>{
      values.image = image
      console.log('ValuesCreate-->',values)
        createLivre(values,user.token)
        .then((res)=>{
           console.log('Livre-->',res.data)
            toast.success(`Creation de ${res.data.titre}`)
            let intended = history.location.state
            console.log('Intended-->',intended)
            history.push(intended.from)
      
      })
        .catch((err)=>{toast.error(err.response)
          }) 
    }

    const handleCancel=()=>{
    

    let intended = history.location.state
    console.log('Intended-->',intended)
    history.push(intended.from)
   
    }

   return(<>
       <ToolsAdminNav/>
    
        <div className="col-md-4 offset-md-4" style={{paddingTop:100,paddingBottom:10}}>
          <div className="pl-3 pt-3">
              <ImageForm user={user} setImage={setImage} image={image}/>
          </div>
          <LivreForm handleSubmit1={handleSubmit1} handleCancel={handleCancel} user={user}/>
        </div>
       
 </>)   

}

export default LivreCreate