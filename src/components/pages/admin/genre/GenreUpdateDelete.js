import { useState } from 'react';
import {updateGenre,removeGenre} from '../../../../services/ApiCall/genre'
import { DeleteOutlined, EditOutlined,SearchOutlined} from '@ant-design/icons'
import {toast} from 'react-toastify' 
import {useSelector} from 'react-redux'


const GenreUpdateDelete =({genres,loadGenres,setLoading,loading})=>{
  const [keyword, setKeyword] =useState('') 
  const searched = (keyword) => (c)=> c.name.toLowerCase().includes(keyword)
  const [name,setName]=useState('')
  const [genreToEdit,setGenreToEdit]=useState('')
  const [genreToRemove,setGenreToRemove] =useState('')
  const {user} =useSelector((state)=>({...state}))

  const handleRemove = (slug)=>{

    setLoading(true)

    removeGenre(slug,user.token)
    .then((res)=>{
      setLoading(false)
       if(res.data.ok)
        {toast.error(`Suppression de ${slug}`)
        loadGenres()}
        else{
          toast.error(`Destruction interdite..Relation existante avec la table Livres`) 
        }
       })
    .catch((err)=>{
     setLoading(false)
     toast.error(err.message)})}


  

  const handleEdit=(id,name)=>{
  setGenreToRemove('')
 setGenreToEdit(id)
 setName(name)
  }

  const handleSave=(slug)=>{
    console.log('Genre-->',name,'Slug-->',slug)
    setLoading(true)
    updateGenre(slug,user.token,{name})
    .then((res)=>{
      setLoading(false)
      toast.success(`Modification de ${slug} en ${res.data.name} reussie`)
    setGenreToEdit('')
    loadGenres()
  })
    .catch((err)=>{
      setLoading(false)
      toast.error(err.message)
      })

  }

  const handleCancel =()=>{

    setGenreToEdit('')
    setGenreToRemove('')
  }
 
  return(<>
  
    
  
  {
    genres.length>0 &&  <div className="col-md-2 offset-md-3 input-group mb-3" style={{paddingTop:90}} >
    <input type="search" value={keyword}  className="form-control mr-sm-2" onChange={e=>setKeyword(e.target.value.toLowerCase())}/>
     <div className="mt-2">
      <SearchOutlined/> 
     </div>
     
   </div>
  }
  <div style={{paddingBottom: 50}} >
   
  {
   genres.length>0 && genres.filter(searched(keyword)).map((c,i)=>(
    <div className="col-md-6 offset-md-3"   key={i} >

      {
        genreToEdit!==c._id && genreToRemove!==c._id && <div className="alert alert-secondary" >{c.name}
          <span className="btn btn-sm float-right" onClick={()=>{setGenreToRemove(c._id);setName(c.name);setGenreToEdit('')}}><DeleteOutlined className="text-danger"/></span>
     
          <span className="btn btn-sm float-right" onClick={()=>handleEdit(c._id,c.name)}>
            <EditOutlined className="text-warning"/>
          </span>
    
    </div>  
      }
      {
        genreToEdit===c._id && <div className="alert alert-secondary">
        <input required value={name} type="text" onChange={(e)=>setName(e.target.value)}/>
        <span className="btn btn-sm float-right" onClick={()=>handleCancel()}>Cancel</span>
     
          <span className="btn btn-sm float-right" onClick={()=>handleSave(c.slug)}>Save</span>
       </div>

      }
      {
         genreToRemove===c._id && <div className="alert alert-secondary">
           <input value={c.name} type="text" disabled/>
              <span className="btn btn-sm float-right" onClick={()=>handleCancel()}>Cancel</span>

           <span className="btn btn-sm float-right" onClick={()=>handleRemove(c.slug)}>Delete</span>
           </div>

      }
         
    </div>
    
    
   ))
   
   }
  </div>
  
  </>)
}
export default GenreUpdateDelete