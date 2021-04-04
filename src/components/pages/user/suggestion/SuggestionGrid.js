
import  {createRef} from 'react'
import JqxGrid, { IGridProps, jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid'
//import 'jqwidgets-scripts/jqwidgets/styles/jqx.energyblue.css'
import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css'
//import 'jqwidgets-scripts/jqwidgets/styles/jqx.dark.css'
import JqxButton from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxbuttons'




const SuggestionGrid =({suggestions})=>{
    const myGrid = createRef()
    const myButton=createRef()
   
  
    const source = {
      datafields: [
          { name: 'titre', type: 'string' },
          { name: 'auteur', type: 'string' },
          { name: 'genre', type: 'string' },
          { name: 'annee', type: 'number' },
          { name: 'username', type: 'string' },
          { name:'slug',type:'string'}
      ],
      datatype: 'array',
      localdata: suggestions
    }
    
    
    const initialState = {
    
      header:true,
    //  theme:'energyblue',
      columns : [
     
        { text: 'Titre', datafield: 'titre'},
        { text: 'Auteur', datafield: 'auteur'},
        { text: 'Genre', datafield: 'genre'},
        { text: 'Annee', datafield: 'annee'},
        { text: 'Username', datafield:'username'}
        
       
     ],
    source: new jqx.dataAdapter(source),}
  
  
  
   
  
      const excelBtnOnClick =()=> {
            myGrid.current.exportdata('xls', 'jqxGrid');
        }
   
  
      return(<>
           <div style={{paddingTop:80,marginLeft:280,paddingBottom:20}}>
            
            <div style={{marginTop:20,marginRight:20}} className="row">
            <JqxGrid ref={myGrid} width={'100%'} source={initialState.source} columnsautoresize={true} s columnsresize={true} adaptive={true}
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

export default SuggestionGrid