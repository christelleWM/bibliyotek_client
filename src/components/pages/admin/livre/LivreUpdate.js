import {getLivre,updateLivre} from '../../../../services/ApiCall/livre'
import {useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import LivreForm from './LivreForm'
import { useEffect, useState } from 'react'
import LoadingSpinner from '../../helpers/LoadingSpinner'
import ToolsAdminNav from '../ToolsAdminNav'
import ImageForm from './ImageForm'

const LivreUpdate=({history,match})=>{
    const {user} = useSelector((state)=>({...state})) 
    const [livre,setLivre]=useState([])
    const [loading,setLoading]=useState(false)
    const [image,setImage]=useState('')

    useEffect(()=>{loadLivre()},[])

    const loadLivre =()=>{
        setLoading(true)
        getLivre(match.params.slug)
        .then(res=>{
            setLivre(res.data)
            if (res.data.image) setImage(res.data.image[0])
            console.log('To edit-->',res.data)
            setLoading(false)
        })
        .catch(err=>{
            setLoading(false)
            toast.error(err.message)
        })
    }

    const handleSubmit1=(values)=>{
        values.image = image
        console.log('Values-->',values)
        updateLivre(match.params.slug,values,user.token)
        .then((res)=>{
           console.log('Livre-->',res.data)
            toast.success(`Modification de ${livre.titre} reussie`)
            let intended = history.location.state
            if(intended)
            {console.log('Intended-->',intended)
            history.push(intended.from)}
            else{
                history.push('/admin/tools/livres-table-interface')
            }

      
      })
        .catch((err)=>{toast.error(err.response)
          })   
        
    }

    const handleCancel=()=>{
        let intended = history.location.state
        if(intended)
        {console.log('Intended-->',intended)
        history.push(intended.from)}
        else{
            history.push('/admin/tools/livres-table-interface')
        }
       
    }

   return(<>
    <ToolsAdminNav/>
    <div className="col-md-4 offset-md-4" style={{paddingTop:100,paddingBottom:10}}>
          <div className="pl-3 pt-3">
              <ImageForm user={user} setImage={setImage} image={image}/>
          </div>
          {loading?<LoadingSpinner/>: <LivreForm handleSubmit1={handleSubmit1} handleCancel={handleCancel} livre={livre}/>}
    </div>
 </>)   

}

export default LivreUpdate