import {useState} from 'react'
import { Layout, Menu} from 'antd'
import {Link} from 'react-router-dom'
import {LockOutlined} from '@ant-design/icons'

const { SubMenu,Item} = Menu;
const { Header, Content, Sider } = Layout;

const ToolsAdminNav=({clic})=>{

  const [current,setCurrent]=useState(clic)

  const handleClick = (e) =>
  {
      setCurrent(e.key)
 
  }
    return(<>
    <Sider style={{position:'fixed',height:'100vh',overflowY:'scroll',backgroundColor:'white',paddingTop:70}} width={'15%'} collapsed={false} >
     
    
       <Menu
          mode="inline"
          onClick={handleClick} 
          selectedKeys={[current]}
          style={{backgroundColor:"white"}}
          className="justify-content-center"
        >
        
          <Item key="passe"><Link to="/user/password">Mot de passe</Link></Item>


          <Item key="genres" ><Link to="/admin/tools/genres-interface">Genres</Link></Item>
        

          <SubMenu key="livres" title="Livres">
            <Item key="card" ><Link to="/admin/tools/livres-card-interface">Card</Link></Item>
            <Item key="table" ><Link to="/admin/tools/livres-table-interface">Table</Link></Item>
          </SubMenu>

          <SubMenu key="pret" title="Prets">
            <Item key="npret"><Link to="/admin/tools/nouveau-pret">Faire un pret</Link></Item>
            <Item key="lpret"><Link to="/admin/tools/list-pret">Lister les prets</Link></Item>
          </SubMenu>

          <SubMenu key="suggestion" title="Suggestions">
            <Item key="nsuggestion"><Link to="/user/tools/nouvelle-suggestion">Faire une suggestion</Link></Item>
            <Item key="lsuggestion"><Link to="/user/tools/list-suggestion">Lister les suggestions</Link></Item>
          </SubMenu>
          </Menu>       
      
    </Sider>
    </>)
}

export default ToolsAdminNav