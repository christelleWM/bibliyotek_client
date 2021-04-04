import {useEffect, useState} from 'react'
import {Menu,Badge} from 'antd'
import {Link} from 'react-router-dom'
import {LogoutOutlined,HomeOutlined,ShoppingCartOutlined,ToolOutlined,UserAddOutlined,UserOutlined} from '@ant-design/icons'
import {useHistory} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {auth} from '../../firebase'

const { SubMenu,Item } = Menu

const DefaultHeader = ()=>{


    const [current,setCurrent]=useState('home')
    
    const {user}=useSelector((state)=>({...state}))
    const dispatch=useDispatch()
    const history=useHistory()

   
   const logout = () => {
     auth.signOut()
      dispatch({
        type : 'LOGOUT',
        payload : null
      })
      history.push('/')
    } 

    const handleClick = (e) =>
    {
        setCurrent(e.key)
   
    }

    return(<>
     <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
     
        
      <Item key="home" icon={<HomeOutlined/>}>
          {user && user.role==='admin' && <Link to="/admin">Home</Link>}
          {user && user.role==='subscriber' && <Link to="/user">Home</Link>}
          {!user && <Link to="/">Home</Link>}
          
        </Item>
        {/* <Item key="cart" icon={<ShoppingCartOutlined/>} >
          <Link to="/cart">
             <Badge  offset={[9,0]}>
               Panier
             </Badge>
          </Link>
        </Item> */}
        {/* <Item key="wish">
          <Link to="/wish">
        
               Wish
             
          </Link>
        </Item> */}

        {user && user.role === 'subscriber' && <Item key="tools1" icon={<ToolOutlined/>}>
          <Link to="/user/tools">
        
               Outils
             
          </Link>
        </Item> }
        {user && user.role === 'admin'&& <Item key="tools2" icon={<ToolOutlined/>}>
          <Link to="/admin/tools">
        
               Outils
             
          </Link>
        </Item> }
        {!user && <Item key="login" className="float-right"icon={<UserOutlined/>} >
          <Link to="/login">
        
               Connexion
             
          </Link>
        </Item>}
        
        {!user && <Item key="register" className="float-right" icon={<UserAddOutlined/>}>
          <Link to="/register">
        
               Inscription
             
          </Link>
        </Item>}

        {

           user && <SubMenu key="SubMenu" title={user.username} className="float-right">
         
           <Item icon={<LogoutOutlined/>} onClick={logout}>Quitter</Item>
         
       </SubMenu>
       } 
        
     </Menu>
   
    
    
    </>)
}

export default DefaultHeader
