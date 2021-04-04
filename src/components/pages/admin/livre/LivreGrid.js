
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
import JqxWindow from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxwindow'


const LivreGrid =({livres,handleRemove})=>{
    const myGrid = createRef()
  const myButton=createRef()
  const myWindow=createRef()
  const history=useHistory()
 const record =[]

  const source = {
    datafields: [
        { name: 'titre', type: 'string' },
        { name: 'auteur', type: 'string' },
        { name: 'genre', type: 'string' },
        { name: 'annee', type: 'number' },
        { name: 'resume', type: 'string' },
        { name: 'quantite', type: 'number' },
        { name: 'quantitePret', type: 'number' },
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
      { text: 'Dispo', datafield: 'quantite'},
      { text: 'Pret', datafield: 'quantitePret'},
     
      {
      
        createWidget:(row,column,value,htmlElement)=>{
          value ='<i class="fa fa-lg fa-fw fa-edit"></i>'
    
          const onClick = () => {
              try{
               
                
                console.log('Row-->',htmlElement)
                const dataRecord = myGrid.current.getrows()[row.boundindex]
               
           
           history.push(`/admin/tools/livres-table-interface/livre/${dataRecord.slug}`)
        }
          catch(err){
              toast.error(err.message)
          }
    
        }
    
         ReactDOM.render(<JqxButton ref={myButton} width={'100%'} height={'100%'} textPosition={'center'} onClick={onClick} value={value}/>,htmlElement)
      },
    
      
      initwidget: function (row, column, value, cellElement) {
        // update the widget by using its cellElement.
        console.log("initwidget")},
      datafield: 'modifier',
      text: 'Modifier',
    
    },
    {
      
        createWidget:(row,column,value,htmlElement)=>{
          value ='<i class="fa fa-lg fa-fw fa-trash"></i>'
    
          const onClick = () => {
              try{
            const dataRecord = myGrid.current.getrows()[row.boundindex]
             record.push(dataRecord)
             console.log('Record-->',record)
            myWindow.current.open()
            // handleRemove(dataRecord.slug)
          }
            catch(err){
                toast.error(err.message)
            }
           
        }
    
         ReactDOM.render(<JqxButton ref={myButton} width={'100%'} height={'100%'} textPosition={'center'} onClick={onClick} value={value}/>,htmlElement)
      },
    
      
      initwidget: function (row, column, value, cellElement) {
        // update the widget by using its cellElement.
        console.log("initwidget")},
      datafield: 'effacer',
      text: 'Effacer',
    
    },
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
    //  const refreshBtnOnClick =()=>{
    //     source.localdata = livre
    //     // passing 'cells' to the 'updatebounddata' method will refresh only the cells values when the new rows count is equal to the previous rows count.
    //   myGrid.current.updatebounddata('cells');
    // }

    const cancelBtn =()=> {
      myWindow.current.hide()
  }

    return(<>
         <div style={{paddingTop:80,marginLeft:280,paddingBottom:20}}>
          <div className="row">
           <div className="input-group mb-2 mt-2">

           
             <Link to={{
                        pathname:"/admin/tools/livres-table-interface/livre",
                        state:{from:"/admin/tools/livres-table-interface"}
                    }} > <Button  icon={<BookOutlined/>} style={{backgroundColor:'red',color:'white',fontWeight:'bold'}} type="submit">
                   
                   Ajouter un livre</Button></Link>
            </div> 
          </div>
          <div style={{marginTop:20,marginRight:20}} className="row">
          <JqxGrid ref={myGrid} width={'100%'} source={initialState.source} columnsautoresize={true} columnsresize={true} adaptive={true}
                  columns={initialState.columns} filterable={true} sortable={true}  autoshowfiltericon={true}
                  autoshowsorticon={true}
         />
         <JqxWindow ref={myWindow} width={250} height={100} resizable={false}
                    isModal={false} autoOpen={false} modalOpacity={'0.01'} position={{ x: '80%', y: 368 }}>
             <div>Confirmer suppression</div>
             <div style={{ overflow: 'hidden' }} style={{marginLeft:'25%',marginTop:'5%'}}>
                   <JqxButton style={{ display: 'inline-block', marginRight: '5px' }} onClick={()=>{myWindow.current.hide();handleRemove(record)}} width={50}>
                                            OK
                   </JqxButton>
                   <JqxButton style={{ display: 'inline-block', marginRight: '5px' }} onClick={cancelBtn} width={50}>
                                            Cancel
                   </JqxButton>
              </div>

          </JqxWindow>

          <div style={{marginTop:15}}>
                 <div style={{ float: 'left',marginRight:10 }}>
                     <JqxButton onClick={excelBtnOnClick}>Export to Excel</JqxButton>
                </div>
                {/* <div style={{ float: 'left' }}>
                     <JqxButton onClick={refreshBtnOnClick}>Refresh data</JqxButton>
                </div> */}
          </div>
          
          </div> 
         </div>
         
        
             
           
        </>)


}

export default LivreGrid