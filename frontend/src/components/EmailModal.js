import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import { Dropdown } from 'semantic-ui-react'
import InfoIcon from '@material-ui/icons/Info'
import Tooltip from '@material-ui/core/Tooltip'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    overrides: {
        MuiTooltip: {
            tooltip: {
            fontSize: "1em"
            }
        }
    }
});

export class EmailModal extends Component{

    constructor(props) {
        super(props)
         // State stores photographer we wanna send email to
        this.state = {
            toContact: '',
            emailBody: '',
            emailSubject: '', 
            expertise: '', 
            errors: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleValidation = this.handleValidation.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeSpecialty = this.handleChangeSpecialty.bind(this)
    }

    handleChangeSpecialty = (e, { value }) => this.setState({ expertise:value })

    handleValidation() {
        let formIsValid = true; 
        let errors={}

        // Description
        if(!this.state.emailBody){
            formIsValid = false;
            errors["description"] = "Body cannot be empty";
        }

        // Subject line
        if(!this.state.emailSubject){
            formIsValid = false;
            errors["subject_line"] = "Subject line cannot be empty";
        }

        // Specialty
        if(!this.state.expertise){
            formIsValid = false;
            errors["specialty"] = "Please select at least one purpose";
        }

        // Email
        if(!this.state.toContact){
            formIsValid = false;
            errors["email"] = "Email cannot be empty";
        }
        
        else if(typeof this.state.toContact !== "undefined"){
            let lastAtPos = this.state.toContact.lastIndexOf('@');
            let lastDotPos = this.state.toContact.lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.toContact.indexOf('@@') === -1 && lastDotPos > 2 && (this.state.toContact.length - lastDotPos) > 2)) {
                formIsValid = false;
                errors["email"] = "Email is not valid";
            }
        }

        this.setState({errors:errors})
        return formIsValid 
    }

    closethis() {
        this.props.onHide();
    }

    handleChange(e){   
        let change = this.state
        change[e.target.name] = e.target.value
        this.setState(change)
    }


    handleSubmit() {
        if (this.handleValidation()){
            this.props.onHide();
            window.location.reload();
            const email_body = this.state.emailBody
            const email_toContact= this.state.toContact
            const email_subject = this.state.emailSubject
            const email_sendTo = this.props.phEmail
            
            const emailInfo = {email_body, email_toContact, email_subject, email_sendTo};
            fetch('/api/sendEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify(emailInfo)
            }).catch(e => console.log(e));
        }
    }

   render() {
        const options= [
            {text: 'Videography', value: 'videographers'},
            {text: 'Photography', value: 'photographers'},
            {text: 'Editing', value: 'editors'}
        ]
        const { value } = this.state;
        if (!this.props.phEmail) return null
        else{
            return (
                <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Compose your email to {this.props.name}:
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>Note: This email will be sent to the photographer via our team email.

                    <Form>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <span style={{color: "red"}}>{this.state.errors["email"]}</span><br/>
                        <Form.Label>Email you wish to be contacted at:</Form.Label><span className="required">*</span>
                        <Form.Control name= "toContact" type="email" placeholder="name@example.com" value={this.state.toContact}  onChange={this.handleChange.bind(this)} />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <span style={{color: "red"}}>{this.state.errors["subject_line"]}</span><br/>
                            <Form.Label>Subject:</Form.Label><span className="required">*</span>
                            <Form.Control name = "emailSubject" value={this.state.emailSubject}  onChange={this.handleChange.bind(this)} type="email" placeholder="Subject of your email" />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                        <span style={{color: "red"}}>{this.state.errors["specialty"]}</span><br/>
                            <Form.Label>Purpose For Hire:</Form.Label><span className="required">*</span><br/>
                            <Dropdown 
                                placeholder='Pick One'
                                name="specialty"
                                onChange={this.handleChangeSpecialty}
                                selection 
                                options={options} 
                                value={value}
                            />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <span style={{color: "red"}}>{this.state.errors["description"]}</span><br/>
                            <Form.Label>Write your message (max 2000 characters): </Form.Label><span className="required">*</span><span className="formFields"><MuiThemeProvider theme={theme}><Tooltip placement='right' title="Describe your event below. We recommend you include dates, pricing, and event logistics"><InfoIcon/></Tooltip></MuiThemeProvider></span>
                            <Form.Control name="emailBody" as="textarea" value={this.state.emailBody}  onChange={this.handleChange.bind(this)} maxLength="2000" rows="6" placeholder="Compose your email here!"/>
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
}