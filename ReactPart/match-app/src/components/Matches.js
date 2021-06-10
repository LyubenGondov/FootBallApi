import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddMatchModal} from './AddMatchModal'

export class Matches extends Component{

    constructor(props){
       super(props);
       this.state={matchs:[], addModalShow:false}
    }
    componentDidMount(){
        this.refreshList();
    }

    refreshList(){
       fetch('http://localhost:5000/api/matches')
       .then(response=>response.json())
       .then(data=>{
           this.setState({matchs:data})
       })
    }

    componentDidUpdate(){
        this.refreshList();
    }

    render(){
        const {matchs}=this.state;
        let addModalClose=()=> this.setState({addModalShow:false});
        return(
            <div>
            <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                    <tr>                        
                        <th>TeamOne</th>
                        <th>TeamTwo</th>
                        <th>Result</th>
                    </tr>
                </thead>
                <tbody>
                    {matchs.map(mat=>
                        <tr key={mat.MatchesId}>                         
                         <td> {mat.TeamOne}</td>
                         <td> {mat.TeamTwo}</td>
                         <td> {mat.Result}</td>
                        </tr>)}
                </tbody>

            </Table>
            <ButtonToolbar>
                <Button variant="primary" 
                onClick={()=>this.setState({addModalShow:true})}>
                    Add Match
                </Button>
                <AddMatchModal
                show={this.state.addModalShow}
                onHide={addModalClose}/>
            </ButtonToolbar>
            </div>
        )
    }
}