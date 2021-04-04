import  {createRef, useEffect} from 'react'
import JqxGrid, { IGridProps, jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid'
//import 'jqwidgets-scripts/jqwidgets/styles/jqx.energyblue.css'
import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css'
//import 'jqwidgets-scripts/jqwidgets/styles/jqx.dark.css'
import JqxButton from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxbuttons'
import {useHistory} from 'react-router-dom'
import {toast} from 'react-toastify'
import * as ReactDOM from 'react-dom'

const PretListGrid =({prets,handleEdit})=>{
    const myGrid = createRef()
    
    useEffect(()=>{console.log('PretsGrid-->',prets)},[])
  
    const source = {
      datafields: [
          { name: 'username', type: 'string' },
          { name: 'titre', type: 'string' },
          { name: 'auteur', type: 'string' },
          { name: 'genre', type: 'string' },
          { name: 'annee', type: 'number' },
          { name: 'pret', type: 'number' },
          { name: 'statut', type: 'string' },
          { name: 'quantite', type: 'number' },
          { name: 'quantitePret', type: 'number' },
          { name:'slug',type:'string'},
          { name:'id',type:'string'}
      ],
      datatype: 'array',
      localdata: prets
    }
    
    
    const initialState = {
    
      header:true,
 
      columns : [
        { text: 'Username', datafield:'username',columntype: 'textbox'},
        { text: 'Titre', datafield: 'titre',columntype: 'textbox'},
        { text: 'Auteur', datafield: 'auteur',columntype: 'textbox'},
        { text: 'Genre', datafield: 'genre',columntype: 'textbox'},
        { text: 'Annee', datafield: 'annee',columntype: 'numberinput'},
        { text: 'Pret', datafield: 'pret',columntype: 'numberinput'},
        { text: 'Statut', datafield: 'statut',columntype: 'button',
      
      
        buttonclick : (row)=>{
          try
          {const dataRecord = myGrid.current.getrowdata(row)
           console.log('Button--<',dataRecord)
           handleEdit(dataRecord)
          }
           catch(err){
            toast.error(err.message)
           }

        }
      
      
      },

       
     ],
    source: new jqx.dataAdapter(source),}
  
  
  
   
  
      const excelBtnOnClick =()=> {
            myGrid.current.exportdata('xls', 'jqxGrid');
        }
   
  
      return(<>
           <div style={{paddingTop:80,marginLeft:280,paddingBottom:20}}>
            
            <div style={{marginTop:20,marginRight:20}} className="row">
            <JqxGrid ref={myGrid} width={'100%'} source={initialState.source} columnsautoresize={true} columnsresize={true} adaptive={true}
                    columns={initialState.columns} filterable={true} sortable={true}  autoshowfiltericon={true} 
                    autoshowsorticon={true}
           />
            <div style={{marginTop:15}}>
                   <div style={{ float: 'left',marginRight:10 }}>
                       <JqxButton onClick={excelBtnOnClick}>Export to Excel</JqxButton>
                  </div>
               
            </div>
            
            </div> 
           </div>
           
          
               
             
          </>)
  
  
}

export default PretListGrid