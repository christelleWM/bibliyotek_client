
import  {useState,createRef, useEffect} from 'react'
import JqxGrid, { IGridProps, jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid'
//import 'jqwidgets-scripts/jqwidgets/styles/jqx.energyblue.css'
import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css'
//import 'jqwidgets-scripts/jqwidgets/styles/jqx.dark.css'
import JqxButton from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxbuttons'
import * as ReactDOM from 'react-dom'
import {useHistory} from 'react-router-dom'
import {Button} from 'antd'
import {Link} from 'react-router-dom'
import {BookOutlined} from '@ant-design/icons'
import { toast } from 'react-toastify'


const PretGrid =({livres})=>{
    const myGrid = createRef()
  const myButton=createRef()
  const history=useHistory()

  const source = {
    datafields: [
        { name: 'titre', type: 'string' },
        { name: 'auteur', type: 'string' },
        { name: 'genre', type: 'string' },
        { name: 'annee', type: 'number' },
        { name: 'resume', type: 'string' },
        { name: 'quantite', type: 'number' },
        { name: 'quantitePret', type: 'number' },
        // { name: 'prix', type: 'number' },
        { name:'slug',type:'string'}
    ],
    datatype: 'array',
    localdata: livres
  }
  
  
  const initialState = {
  
    header:true,
  //  theme:'energyblue',
    columns : [
   
      { text: 'Titre', datafield: 'titre'},
      { text: 'Auteur', datafield: 'auteur'},
      { text: 'Genre', datafield: 'genre'},
      { text: 'Annee', datafield: 'annee'},
      { text: 'Resume', datafield: 'resume'},
      { text: 'QuantiteDispo', datafield: 'quantite'},
      { text: 'QuantitePret', datafield: 'quantitePret'},
      // { text: 'Prix', datafield: 'prix'},
      {
      
        createWidget:(row,column,value,htmlElement)=>{
          value ='Preter'
    
          const onClick = () => {
              try{
                const dataRecord = myGrid.current.getrows()[row.boundindex]
           // console.log('Button-->',myButton)
          history.push(`/admin/tools/nouveau-pret/${dataRecord.slug}`)}
          catch(err){
              toast.error(err.message)
          }
    
        }
    
         ReactDOM.render(<JqxButton ref={myButton} width={'100%'} height={'100%'} textPosition={'center'} onClick={onClick} value={value}/>,htmlElement)
      },
    
      
      initwidget: function (row, column, value, cellElement) {
        // update the widget by using its cellElement.
        console.log("initwidget")},
      datafield: 'action',
      text: 'Action',
    
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

export default PretGrid