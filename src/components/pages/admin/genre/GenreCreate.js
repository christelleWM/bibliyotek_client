
import {createGenre} from '../../../../services/ApiCall/genre'
import {useSelector} from 'react-redux'
import {toast} from 'react-toastify'


const GenreCreate =({genre,setGenre,loadGenres,setLoading})=>{
    
  
  const {user} = useSelector((state)=>({...state}))
  
  const handleSubmit =(e)=>{

    e.preventDefault()
    setLoading(true)
    createGenre({genre},user.token)
    .then((res)=>{
     setLoading(false) 
    toast.success(` Creation de ${res.data.name}`)
    console.log('Created-->',res.data)
    setGenre('')
    loadGenres()
   })
    .catch((err)=>{
      setLoading(false) 
      toast.error(err.message)
    })
   
  
}

  return(<>
              
                 <div className="col-md-4 offset-md-4" style={{paddingTop:130}} >
                    <form onSubmit={handleSubmit}>
                       <div className="input-group mb-2 mt-2">
                         <input type="text" placeholder="Genre" className="form-control mr-4" value={genre} onChange={(e)=>{setGenre(e.target.value)}} autoFocus required/>   
                 
                         <br/> 
                        <button className="btn btn-raised" type="submit">Ajouter</button>
                      </div>
                    </form>
                 </div>
          
  
  
  </>)
}

export default GenreCreate