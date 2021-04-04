
import {Card,Pagination,Popconfirm} from 'antd'
import {EditOutlined, DeleteOutlined,BookOutlined,EyeOutlined} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import {useEffect,useState} from 'react'
import {Button} from 'antd'
import {getLivresToolsPage,removeLivre } from '../../../../services/ApiCall/livre'
import {toast} from 'react-toastify'
import {useSelector,useDispatch} from 'react-redux'
import ToolsAdminNav from '../ToolsAdminNav'
import Search from '../../helpers/Search'

const {Meta} = Card

const AdminLivreCard = () =>{

  const [loading,setLoading] =useState(false)
    
    const [livresCard,setLivresCard]=useState([])
    const [page,setPage]=useState(1)
    const [livresCount,setLivresCount]=useState(0)
    const {user} = useSelector((state)=>({...state})) 
    const {perpage} = useSelector((state)=>({...state}))
    const [text,setText]=useState('')
    const [search,setSearch]=useState('')

    const dispatch=useDispatch()

  useEffect(()=>{
    allLivresPerPage()
    console.log('Search-->',search)
  },[page,perpage,search])



const allLivresPerPage = ()=>{

getLivresToolsPage({sort:'createdAt',order:'desc',page,perpage,search})
.then(res => {

   setLivresCard(res.data.livres)
   setLivresCount(res.data.total)
   console.log('Livres-total-->',res.data.livres)
   
})
.catch(err=>{
  setLoading(false)
   toast.error(err.message)
})
}

const handleRemove =(slug)=>{
    
removeLivre(slug,user.token)
.then(() =>{
 allLivresPerPage()

})
.catch((err)=>{
    
    toast.error(err.message)
})}

 
const handlePagination =(e)=>{
//  e.preventDefault()
  dispatch({
    type:'SET_PAGINATION',
    payload:e,
  })
  
}

 return(
        <>
        <ToolsAdminNav clic='card'/>
        <div style={{paddingTop:80,marginLeft:280,paddingBottom:20}}>
         
           <div className="row ml-1 mb-5">

           <div >
           <Link to={{
                        pathname:"/admin/tools/livres-card-interface/livre",
                        state:{from:"/admin/tools/livres-card-interface"}
                    }} > <Button  icon={<BookOutlined/>} style={{backgroundColor:'red',color:'white',fontWeight:'bold'}} type="submit">
                   
                   Ajouter un livre</Button></Link>
           </div>         
          <div className="input-group-prepend offset-md-3">
                                             <div className="input-group-text">Pagination&nbsp;&nbsp;&nbsp;</div>
                                         
                                          <select type="text" className="custom-select" id="pagination" defaultValue={perpage} onChange={e=>handlePagination(e.target.value)}>
                                            <option value="No pagination">No pagination</option>
                                            <option value="9">9</option>
                                            <option value="30">30</option>
                                          </select>
           
            </div>
          <div className="col-md-2 offset-md-3 input-group" >
           <Search holder='Chercher livre' setText={setText} text={text} setSearch={setSearch}/>  
          </div>
      </div>
          <div style={{marginTop:20,marginRight:20}} className="row">
             {livresCard.map((l)=>(<div key={l._id} className="col-md-3 mb-5">
               <Card 
               cover={<img src={l.image.length && l.image[0].url} style={{height:'230px',objectFit : 'cover'}} className="p-1"/>}
               actions={[<Link to={{pathname:`/livre/${l.slug}`,
               state:{from:"/admin/tools/livres-card-interface"}
              }}><EyeOutlined className="text-warning"/></Link>,<Link to={{pathname:`/admin/tools/livres-card-interface/livre/${l.slug}`,
               state:{from:"/admin/tools/livres-card-interface"}
              }}><EditOutlined className="text-warning"/></Link>,
               <Popconfirm title='Confirmer suppression?' onConfirm={()=>{handleRemove(l.slug)}} okText="Oui" cancelText="Non"><DeleteOutlined className="text-danger"/></Popconfirm>]}>
                  <Meta title={l.titre} description={`${l.resume && l.resume.substring(0,25)}...`}/>
                  
               </Card>
             </div> ))}
          </div>
          <div>
            {
              perpage !== 'No pagination' &&<div className="col-md-4 offset-md-4 text-center mt-3">
              <Pagination current={page} total={(livresCount /perpage)*10} onChange={(value) => setPage(value)}/>
            </div>
            }
               
          </div>
        </div>
       
       </>)
}

export default AdminLivreCard