import {SearchOutlined} from '@ant-design/icons'

const Search =({holder,setSearch,setText,text})=>{

    return(<>
     
              <input type="search" placeholder={holder} className="form-control mr-sm-2"  onChange={e=>setText(e.target.value)}/>
               <div className="mt-2">
                <SearchOutlined style={{cursor:"pointer"}} onClick={()=>{setSearch(text)}}/> 
              </div> 
    {/* </div>    */}
    </>)
}

export default Search