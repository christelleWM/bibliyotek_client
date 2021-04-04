import {useState} from 'react'
import Resizer from 'react-image-file-resizer'
import {Avatar,Badge} from 'antd'
import {uploadImage,removeImage} from '../../../../services/ApiCall/cloudinary'
import {toast} from 'react-toastify'
import { LoadingOutlined } from '@ant-design/icons'

const ImageForm=({user,setImage,image})=>{
    const [loading,setLoading]=useState(false) 

    

    const fileUploadAndResize = (e) =>{
    console.log('Image-->',e)
    let files=e.target.files
    if (files){
        setLoading(true)
        Resizer.imageFileResizer(files[0],720,720,'JPEG',100,0, (uri)=>{
            console.log(uri)
            console.log('User-->',user)
            uploadImage({image:uri},user.token)
            .then(res=>{
             setLoading(false)
              setImage(res.data)
            })
            .catch((err)=>{
                setLoading(false)
                toast.error(err.response)
            }) 
        },"base64")
    }

    } 

    const handleImageRemove =(public_id)=>{
        console.log('Public_id',public_id)
        setLoading(true)
        removeImage({public_id},user.token)
        .then(()=>{
          setLoading(false)
         
          setImage([])
          
        })
        .catch(err=>{
          setLoading(false)
          toast.error(err.response)
        })
      }

    


    return(<>

     
          <br/>
        <div className="row">
              <label className="mb-3 btn btn-primary" style={{backgroundColor:'gray',color:'white'}}>Choisir image
                 <input type="file" hidden required onChange={fileUploadAndResize}/>
              </label>
          </div>
          {
            loading?<LoadingOutlined/>:<div className="row">
         {
             image &&     
             <Badge count="X" key={image.public_id} style={{cursor:'pointer'}} onClick={()=>{handleImageRemove(image.public_id)}}>
                <Avatar  shape="square" src={image.url} size={100}/>
              </Badge>
         }
             
            
      
         </div>
          }
          

    
    </>)
}

export default ImageForm