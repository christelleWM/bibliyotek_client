import {useState} from 'react'
import {Layout} from 'antd'
import {Menu,Checkbox} from 'antd'
import Search from '../helpers/Search'
import {Slider} from 'antd'

const {Sider} =Layout
const { SubMenu,Item } = Menu

const HomeNav=({genres,genresId,handleChange,setText,setSearch,text,textAuteur,setTextAuteur,setSearchAuteur})=>{
    const [current,setCurrent]=useState('home')
    
    
    const handleClick = (e) =>
    {
        setCurrent(e.key)
   
    }

return(<><Sider style={{position:'fixed',height:'100vh',overflowY:'scroll',backgroundColor:'white',paddingTop:70}} width={'15%'} collapsed={false} >
             
              <Menu onClick={handleClick} selectedKeys={[current]} mode="inline" defaultOpenKeys={["1","2"]}>
                     <div style={{width:'80%',marginBottom:20,marginTop:20,marginLeft:25}} className="input-group">
                       <Search holder="Titre"  setText={setText} setSearch={setSearch} text={text}/>
                     </div>
                     
                  <SubMenu key="1" title="Genres">
                      <div className="pb-2 pl-4 pr-4 pt-2">
                      {
                      genres.length>0 && genres.map((g)=>{return <div key={g._id} className="pb-2 pl-4 pr-4"><Checkbox value={g._id} onChange={handleChange} checked={genresId.includes(g._id)}>{g.name}</Checkbox></div>})
                      }
                      </div>
                  
                  
                  </SubMenu>
                  <div style={{width:'80%',marginBottom:20,marginTop:20,marginLeft:25}} className="input-group">
                       <Search holder="Auteur"  setText={setTextAuteur} setSearch={setSearchAuteur} text={textAuteur}/>
                  </div>
                  {/* <SubMenu key="2" title="Price">
                           <div style={{width:'80%',marginBottom:20,marginTop:20,marginLeft:25}}>
                              <Slider  range max={500} defaultValue={[0,500]}/>
                           </div>
                 </SubMenu> */}
                
            
              </Menu>
  </Sider>

</>)


}

export default HomeNav