import {useState,useEffect} from 'react'
import HomeNav from './HomeNav'
import { toast } from 'react-toastify'
import {getGenres} from '../../../services/ApiCall/genre'
import {getLivresHomePage} from '../../../services/ApiCall/livre'
import {Card,Pagination} from 'antd'
import {Link} from 'react-router-dom'
import {EyeOutlined} from '@ant-design/icons'
import {useSelector} from 'react-redux'


const {Meta}=Card
const perpage=9

const HomePage=()=>{
    const [genres, setGenres] =useState([])
    const [genresId,setGenresId]=useState([])
    const [livresCard,setLivresCard]=useState([])
    const [page,setPage]=useState(1)
    const [livresCount,setLivresCount]=useState(0)
    const [loading,setLoading]=useState(true)
    const [text,setText]=useState('')
    const [searchTitre,setSearchTitre]=useState('')
    const [textAuteur,setTextAuteur]=useState('')
    const [searchAuteur,setSearchAuteur]=useState('')
    const {user} = useSelector((state)=>({...state})) 

    useEffect(()=>{loadGenres();
    },[])

    useEffect(()=>{
        livresHomePage(genresId)
      },[page,genresId,searchTitre,searchAuteur])
    
    
      const loadGenres = ()=> {

        getGenres().then(res=>{
  
           setGenres(res.data)
           if (res.data) 
           {
            res.data.map(r=>
            genresId.push(r._id))
            livresHomePage(genresId)
         
          }
           console.log('Genres-->',genresId)}).catch(error=>{
           toast.error(error.message)})}

    const livresHomePage = (genres)=>{
    console.log('GenresID22--->',genres)
    setLoading(true)
    getLivresHomePage({sort:'createdAt',page,genres,searchTitre,searchAuteur})
    .then(res => {
       
       setLivresCard(res.data.livres)
       setLivresCount(res.data.total)
       console.log('Livres-total-->',res.data.livres)
       setLoading(false)
       
    })
    .catch(err=>{
       toast.error(err.message)
       setLoading(false)
    })
    }


  
    const handleChange=(e)=>{
        let filtered = genresId.filter((g)=> g!== e.target.value)
        if(filtered.length === genresId.length) {filtered.push(e.target.value)}
        setGenresId(filtered)
        console.log('GenresID-->',genresId)

    }


  return(<>
    <HomeNav genres={genres} genresId={genresId} handleChange={handleChange} setText={setText} setSearch={setSearchTitre} text={text} textAuteur={textAuteur} setTextAuteur={setTextAuteur} setSearchAuteur={setSearchAuteur}/>

   
   {
     !loading && <div style={{paddingTop:80,marginLeft:280,paddingBottom:20}}>
     <div style={{marginTop:20,marginRight:20}} className="row">
        {livresCard.map((l)=>(<div key={l._id} className="col-md-3 mb-4">
         
         <>
         {!user &&   <Card 
         cover={<img src={l.image.length && l.image[0].url} style={{height:'230px',objectFit : 'cover'}} className="p-1"/>}
         actions={[<Link to={{pathname:`/livre/${l.slug}`,
               state:{from:"/"}
              }}><EyeOutlined className="text-warning"/></Link>]}>
             <Meta title={l.titre} description={`${l.resume && l.resume.substring(0,25)}...`}/>
           
          </Card>}
          {
            user && user.role === 'admin' && <Card 
            cover={<img src={l.image.length && l.image[0].url} style={{height:'230px',objectFit : 'cover'}} className="p-1"/>}
            actions={[<Link to={{pathname:`/livre/${l.slug}`,
            state:{from:"/admin"}
           }}><EyeOutlined className="text-warning"/></Link>]}>
          <Meta title={l.titre} description={`${l.resume && l.resume.substring(0,25)}...`}/>
        
       </Card>
          }
          {
            user && user.role === 'subscriber' && <Card 
            cover={<img src={l.image.length && l.image[0].url} style={{height:'230px',objectFit : 'cover'}} className="p-1"/>}
            actions={[<Link to={{pathname:`/livre/${l.slug}`,
            state:{from:"/user"}
           }}><EyeOutlined className="text-warning"/></Link>]}>
          <Meta title={l.titre} description={`${l.resume && l.resume.substring(0,25)}...`}/>
        
       </Card>
          }

        </>
          
          
        </div> ))}
      </div>
    
  
      
      <div className="col-md-4 offset-md-4 text-center mt-3">
      <Pagination current={page} total={(livresCount /perpage)*10} onChange={(value) => setPage(value)}/>
      </div> 
    </div>
    }
    
   
  </>)
}

export default HomePage