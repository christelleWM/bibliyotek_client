
import {useState,useEffect} from 'react'
import {useHistory,Route} from 'react-router-dom'
import {useSelector} from 'react-redux'


export const Redirection =()=>{
    console.log('Hello')

      const {user} =useSelector((state)=>({...state}))
      const history=useHistory()
      const[count,setCount] = useState(3)
  
    useEffect(()=>{
       const interval = setInterval(()=>{
        setCount((currentCount)=> --currentCount)

        },1000)
      count === 0 && user.role=== 'admin' && history.push('/admin')
      count === 0 && user.role=== 'subscriber' && history.push('/user')
     return ()=>clearInterval(interval)
 
      
    
    },[count,history])

     return <div className = "container text-center" style={{paddingTop:130}}>Redirecting you in {count} seconds</div>
}

export const UserRoute = ({children,...rest})=>{
  const {user} =useSelector((state)=>({...state}))
  return(
      user ? <Route {...rest} />: (<Redirection/>)
  )
}

export const AdminRoute = ({children,...rest})=>{
  const {user} =useSelector((state)=>({...state}))
  console.log('Bonjourrrrr')
  return(
      user && user.role === 'admin'? <Route {...rest} />: (<Redirection/>)
  )
}