import React, {Component} from 'react';
import {Modal, Button, Row, Col} from 'react-bootstrap';
import {DragDrop} from './DragDrop';
import { Input} from 'semantic-ui-react';
import Form from 'react-bootstrap/Form'

export class FeedbackModal extends Component{

    constructor(props) {
        super(props)
         // State stores photographer we wanna send email to
        this.state = {
            toContact: '',
            emailBody: '',
            emailSubject: '', 
            expertise: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
       
    }

    /*componentDidMount() {
        this.setState({phEmail: this.props.phEmail})
    }*/

    closethis() {
        this.props.onHide();
    }
    handleChange(e){  
        console.log(e.target.name)
        console.log(e.target.value) 
        let change = this.state
        console.log (change)
        change[e.target.name] = e.target.value
        this.setState(change)
        console.log (change)
    }


    handleSubmit() {
        
        this.props.onHide();
        window.location.reload();
        const email_body = this.state.emailBody
        const email_toContact= this.state.toContact
        const email_subject = this.state.emailSubject
        const email_sendTo = 'tigerphotosteam@gmail.com'
        
        const emailInfo = {email_body, email_toContact, email_subject, email_sendTo};
        fetch('/api/sendEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(emailInfo)
        }).catch(e => console.log(e));


        /*const nodemailer = require('nodemailer');
        const log = console.log;
        
        // Step 1
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'tigerphotosteam@gmail.com', // TODO: your gmail account
                pass:  'hello1234bye' // TODO: your gmail password
            }
        });
        
        // Step 2
        let mailOptions = {
            from: 'tigerphotosteam@gmail.com', // TODO: email sender
            to: 'msaleh@princeton.com', // TODO: email receiver
            subject: 'Nodemailer - Test',
            text: 'Wooohooo it works!!'
        };
        
        // Step 3
        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                return log('Error occurs');
            }
            return log('Email sent!!!');
        });*/


    }
  
   render() {
    console.log(this.props.phEmail)
       return(
             <Modal
     {...this.props}
     size="lg"
     aria-labelledby="contained-modal-title-vcenter"
     centered
   >
     <Modal.Header closeButton>
       <Modal.Title id="contained-modal-title-vcenter">
         Compose your email to this Photographer:
       </Modal.Title>
     </Modal.Header>
     <Modal.Body>
         <div>

     <Form>
     <Form.Group controlId="exampleForm.ControlInput1">
                   <Form.Label>Email you wish to be contacted at:</Form.Label>
                   <Form.Control name= "toContact" type="email" placeholder="name@example.com" value={this.state.toContact}  onChange={this.handleChange.bind(this)} />
               </Form.Group>

               <Form.Group controlId="exampleForm.ControlInput1">
                   <Form.Label>Subject:</Form.Label>
                   <Form.Control name = "emailSubject" value={this.state.emailSubject}  onChange={this.handleChange.bind(this)} type="email" placeholder="Need Your Skills!" />
               </Form.Group>
               <Form.Group controlId="exampleForm.ControlSelect1">
                   <Form.Label>Purpose For Hire:</Form.Label>
                   <Form.Control as="select">
                   <option>Videography</option>
                   <option>Photography</option>
                   <option>Photo Editing</option>
                   </Form.Control>
               </Form.Group>
               <Form.Group controlId="exampleForm.ControlTextarea1">
                   <Form.Label>Write your message</Form.Label>
                   <Form.Control name="emailBody" as="textarea" value={this.state.emailBody}  onChange={this.handleChange.bind(this)} rows="6" placeholder="Max. 750 characters"/>
               </Form.Group>
           </Form>
           </div>
     </Modal.Body>
     <Modal.Footer>
       <Button variant = "secondary" onClick = {this.handleSubmit.bind(this)}> Send Away!</Button>
     </Modal.Footer>
   </Modal>
       );
   
}
}
