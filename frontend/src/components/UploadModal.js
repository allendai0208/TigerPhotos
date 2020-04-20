import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import {DragDrop} from './DragDrop';

export class UploadModal extends Component{
    
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
       <DragDrop netid={this.props.netid}/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant = "secondary" onClick = {this.props.onHide}> All Done!</Button>
      </Modal.Footer>
    </Modal>
        );
    }
}
