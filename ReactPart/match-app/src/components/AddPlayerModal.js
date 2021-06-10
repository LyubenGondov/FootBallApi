import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form, FormGroup} from 'react-bootstrap';

export class AddPlayerModal extends Component{
    constructor(props){
        super(props);
    }

    handleSubmit(event){
        event.preventDefault();

        fetch('http://localhost:5000/api/Player',{
            method:"POST",
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({                
                PlayerName:event.target.PlayerName.value,
                PlayerTeam:event.target.PlayerTeam.value,
                PlayerMatches:event.target.PlayerMatches.value,
                PlayerGoals:event.target.PlayerGoals.value
            })
        })
        .then(res=>res.json())
        .then((result)=>
        {
            alert(result);
        },
        (error)=>{
            alert(error);
        }
        )
    }

    render(){
        return(
            <Modal
      {...this.props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Player
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
       <div className="container"> 
       <Row>
           <Col sm={6}>
               <Form onSubmit={this.handleSubmit}>
                   <Form.Group controlId="TeamOne">
                   <Form.Label>PlayerName</Form.Label>  
                   <Form.Control type="text" name="PlayerName" required placeholder="PlayerName"/>  
                   </Form.Group>

                   <Form.Group controlId="PlayerTeam">
                   <Form.Label>PlayerTeam</Form.Label>  
                   <Form.Control type="text" name="PlayerTeam" required placeholder="PlayerTeam"/>  
                   </Form.Group>

                   <Form.Group controlId="PlayerMatches">
                   <Form.Label>PlayerMatches</Form.Label>  
                   <Form.Control type="text" name="PlayerMatches" required placeholder="PlayerMatches"/>  
                   </Form.Group>

                   <Form.Group controlId="PlayerGoals">
                   <Form.Label>PlayerGoals</Form.Label>  
                   <Form.Control type="text" name="PlayerGoals" required placeholder="PlayerGoals"/>  
                   </Form.Group>

                   <Form.Group controlId="Result">
                   <Button variant="primary" type="submit">
                       Add Player
                   </Button> 
                   </Form.Group>
               </Form>
           </Col>
       </Row>
       </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
        )
    }
}