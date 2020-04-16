import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import {DragDrop} from './DragDrop';

export class UploadModal extends Component{
    constructor(props){
    super(props);
    this.state = {
      photozID: null
    }
    }

    render() {
        return(
        <Modal
      {...this.props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Would you like to show off your portfolio?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
       <DragDrop net_ID={this.props.photozID}/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant = "secondary" onClick = {this.props.onHide}> All Done!</Button>
      </Modal.Footer>
    </Modal>
        );
    }
}

/*<div className= "container">
           If you would like to upload your portfolio to your profile please click the 'Upload' button below.<br/> Otherwise, press 'Next'.
       </div>*/