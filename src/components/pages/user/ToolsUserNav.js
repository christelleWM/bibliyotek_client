import {useState} from 'react'
import { Layout, Menu} from 'antd'
import {Link} from 'react-router-dom'

const { SubMenu,Item} = Menu;
const { Header, Content, Sider } = Layout;

const ToolsUserNav=({key})=>{

  const [current,setCurrent]=useState(key)
    return(<>
    <Sider style={{position:'fixed',height:'100vh',overflowY:'scroll',backgroundColor:'white',paddingTop:70}} width={'14%'} collapsed={false} >
       <Menu
          mode="inline"
          selectedKeys={[current]}
          style={{backgroundColor:"white"}}
          className="justify-content-center"
        >
        
          <Item key="passe" ><Link to="/user/password">Mot de passe</Link></Item>


          <SubMenu key="suggestion" title="Suggestions">
            <Item key="nsuggestion1"><Link to="/user/tools/nouvelle-suggestion">Faire une suggestion</Link></Item>
            <Item key="lsuggestion1"><Link to="/user/tools/list-suggestion">Lister les suggestions</Link></Item>
          </SubMenu>
          
        
        </Menu>       
    
    </Sider>
    </>)
}

export default ToolsUserNav