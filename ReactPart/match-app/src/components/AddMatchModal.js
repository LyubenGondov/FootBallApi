import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form, FormGroup} from 'react-bootstrap';

export class AddMatchModal extends Component{
    constructor(props){
        super(props);
    }

    handleSubmit(event){
        event.preventDefault();

        fetch('http://localhost:5000/api/Matches',{
            method:"POST",
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({                
                TeamOne:event.target.TeamOne.value,
                TeamTwo:event.target.TeamTwo.value,
                Result:event.target.Result.value
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
          Add Matches
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
       <div className="container"> 
       <Row>
           <Col sm={6}>
               <Form onSubmit={this.handleSubmit}>
                   <Form.Group controlId="TeamOne">
                   <Form.Label>TeamOne</Form.Label>  
                   <Form.Control type="text" name="TeamOne" required placeholder="TeamOne"/>  
                   </Form.Group>

                   <Form.Group controlId="TeamTwo">
                   <Form.Label>TeamTwo</Form.Label>  
                   <Form.Control type="text" name="TeamTwo" required placeholder="TeamTwo"/>  
                   </Form.Group>

                   <Form.Group controlId="Result">
                   <Form.Label>Result</Form.Label>  
                   <Form.Control type="text" name="Result" required placeholder="Result"/>  
                   </Form.Group>

                   <Form.Group controlId="Result">
                   <Button variant="primary" type="submit">
                       Add Match
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