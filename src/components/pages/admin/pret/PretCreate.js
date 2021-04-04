import {useState,useEffect} from 'react'
import PretForm from './PretForm'
import {getLivre} from '../../../../services/ApiCall/livre'
import {useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import ToolsAdminNav from '../ToolsAdminNav'
import LoadingSpinner from '../../helpers/LoadingSpinner'
import {checkEmail} from '../../../../services/ApiCall/auth'
import { createPret } from '../../../../services/ApiCall/pret'

const PretCreate =({history,match})=>{

    const {user} = useSelector((state)=>({...state})) 
    const [loading,setLoading]=useState(true)
    const [livre,setLivre]=useState([])
    
    useEffect(()=>{loadLivre()},[])

    const loadLivre =()=>{
        setLoading(true)
        getLivre(match.params.slug)
        .then(res=>{
            setLivre(res.data)
            console.log('To lend-->',res.data)
            setLoading(false)
        })
        .catch(err=>{
            setLoading(false)
            toast.error(err.message)
        })
    }

    const handleSubmit=(values)=>{
        checkEmail({email:values.email}).then((res)=>{
            if(res.data)
            {
            console.log('User-->',res.data._id)
             createPret({user:res.data._id,livre:livre._id,quantiteAPreter:values.quantiteAPreter,quantite:values.quantite,quantitePret:livre.quantitePret},user.token)
             .then(()=>{
                
                history.push('/admin/tools/nouveau-pret') 
             })
             .catch(err=>{toast.error(err.message)})

            }
            else
            {
              toast.error('This email is not registered on the database!!!')
            }})
       
    
    }
    
    const handleCancel=()=>{
    
    history.push('/admin/tools/nouveau-pret')
   
    }

    return(<>

{loading?<><ToolsAdminNav/><LoadingSpinner/></>: <PretForm handleSubmit={handleSubmit} handleCancel={handleCancel} livre={livre}/>}
    </>)     
}

export default PretCreate