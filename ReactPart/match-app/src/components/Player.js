import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddPlayerModal} from './AddPlayerModal'

export class Player extends Component{
    constructor(props){
        super(props);
        this.state={pls:[], addModalShow:false}
     }
     componentDidMount(){
         this.refreshList();
     }
 
     refreshList(){
        fetch('http://localhost:5000/api/Player')
        .then(response=>response.json())
        .then(data=>{
            this.setState({pls:data})
        })
     }
 
     componentDidUpdate(){
         this.refreshList();
     }
 
     render(){
         const {pls}=this.state;
         let addModalClose=()=> this.setState({addModalShow:false});
         return(
             <div>
             <Table className="mt-4" striped bordered hover size="sm">
                 <thead>
                     <tr>                        
                         <th>PlayerName</th>
                         <th>PlayerTeam</th>
                         <th>PlayerMatches</th>
                         <th>PlayerGoals</th>
                     </tr>
                 </thead>
                 <tbody>
                     {pls.map(pl=>
                         <tr key={pl.PlayerId}>                         
                          <td> {pl.PlayerName}</td>
                          <td> {pl.PlayerTeam}</td>
                          <td> {pl.PlayerMatches}</td>
                          <td> {pl.PlayerGoals}</td>
                         </tr>)}
                 </tbody>
 
             </Table>
             <ButtonToolbar>
                 <Button variant="primary" 
                 onClick={()=>this.setState({addModalShow:true})}>
                     Add Player
                 </Button>
                 <AddPlayerModal
                 show={this.state.addModalShow}
                 onHide={addModalClose}/>
             </ButtonToolbar>
             </div>
         )
     }
}