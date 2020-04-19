// This is the component that renders the actual input fields and gallery preview.
// We get the information about the current user by calling the /getPhotogapher route in routes.py
// and passing in their netid which is passed as a prop to this component
// We then autofill the fields based on the information returned from /getPhotographer
import React, {useState} from 'react';
import { Form, Input, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router';
import {DragDrop} from './DragDrop';
import {UploadModal} from './UploadModal';
import MyEditor from './MyEditor';
import {storage, fstore} from './firebase/config';


class ProfileForm extends React.Component {

    constructor(props){
        super(props);
        this.getImage = this.getImage.bind(this)

        this.state = {
            fields: {},
            errors: {},
            redirect: false,
            UploadModalShow: false,
            image: null,
            // information about current photographer (based on the current user's netid)
            photographer: {}
        }
    }
    
    // Get the pertinent information to the user when the component mounts to autofill the form fields with their information if possible
    componentDidMount() {

        let photonetid = {"photographer_netid":this.props.netid}
        const response = fetch('/api/getPhotographer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(photonetid)
        }).then(response => response.json())
        .then(result => this.setState({
          photographer: result.photographer
        })).then(console.log(this.state.photographers))
        .catch(e => console.log(e));
    }

    getImage(i) {
        this.setState(
            {image : i}
        )
        console.log(this.state.image)
        console.log(this.state.image.name)
    }

    handleClose(){
        this.setState({UploadModalShow: false});
        const photographer_netid = this.props.netid
        const first_name = this.state.fields['first_name']
        const last_name = this.state.fields['last_name']
        const email = this.state.fields['email']
        const description = this.state.fields['description']
        const uploadTask = storage.ref(`profpic/${this.state.image.name}`).put(this.state.image);
        console.log(uploadTask)
        let profile_pic = null;
        uploadTask.on('state_changed', 
            (snapshot) => {
            }, 
            (error) => {
                // error function ....
                console.log(error);
            }, 
            () => {
            // complete function ....
            storage.ref('profpic').child(`${this.state.image.name}`).getDownloadURL().then(url => {
                console.log(url);
                profile_pic = url
                console.log(profile_pic)
                const photographer = { photographer_netid, first_name, last_name, email, description, profile_pic};
                fetch('/api/createProfile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }, 
                    body: JSON.stringify(photographer)
                });
                this.setState({redirect: true})
            });
        });        
    }
    
    handleShow(){ 
        this.state.UploadModalShow = true;
    }

    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //First Name
        if(!fields["first_name"]){
            formIsValid = false;
            errors["first_name"] = "Cannot be empty";
        }

        if(typeof fields["first_name"] !== "undefined"){
            if(!fields["first_name"].match(/^[a-zA-Z]+$/)){
                formIsValid = false;
                errors["first_name"] = "Only letters";
            }        
        }

        // Last Name
        if(!fields["last_name"]){
            formIsValid = false;
            errors["last_name"] = "Cannot be empty";
        }

        if(typeof fields["last_name"] !== "undefined"){
            if(!fields["last_name"].match(/^[a-zA-Z]+$/)){
                formIsValid = false;
                errors["last_name"] = "Only letters";
            }        
        }

        //Email
        if(!fields["email"]){
            formIsValid = false;
            errors["email"] = "Cannot be empty";
        }

        if(typeof fields["email"] !== "undefined"){
            let lastAtPos = fields["email"].lastIndexOf('@');
            let lastDotPos = fields["email"].lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
                formIsValid = false;
                errors["email"] = "Email is not valid";
            }
        }  

        // Description
        if(!fields["description"]){
            formIsValid = false;
            errors["description"] = "Cannot be empty";

        }

        this.setState({errors: errors});
        return formIsValid;
    }

    contactSubmit = e => {
        e.preventDefault();
        
        this.handleValidation();
        
        if (!this.handleValidation()) {
            alert("Form has errors.")
        } else {
            this.handleShow();
            
        }
        console.log('HERE<---------')
      }

    handleChange(field, e){         
        let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});
    }

    // The actual rendering of the form. Use the state which has stored the current photographer's information to autofill the fields
    render(){

        if(this.state.redirect) {
            console.log("redirect")
            return <Redirect to='/browse'/>;
        }
        return (
            <div>
                <div className = "formFields">Upload a Profile Picture!</div>
                <MyEditor handler = {this.getImage}/>
                <br/>
                <Form>
                <span style={{color: "red"}}>{this.state.errors["first_name"]}</span> 
                <div className = "formFields">First Name:</div>
                <Form.Field>
                    <Input 
                        placeholder="First Name" 
                        value={this.state.fields["first_name"]}
                        onChange={this.handleChange.bind(this, "first_name")}
                    />
                </Form.Field>
                <br/>
                <span style={{color: "red"}}>{this.state.errors["last_name"]}</span>
                <div className = "formFields">Last Name:</div>
                <Form.Field>
                    <Input 
                        placeholder="Last Name" 
                        value={this.state.fields["last_name"]}
                        onChange={this.handleChange.bind(this, "last_name")}
                    />
                </Form.Field>
                <br/>
                <span style={{color: "red"}}>{this.state.errors["email"]}</span>
                <div className = "formFields">Email:</div>
                <Form.Field>
                    <Input 
                        placeholder="Email" 
                        value={this.state.fields["email"]}
                        onChange={this.handleChange.bind(this, "email")}
                    />
                </Form.Field>
                <br/>
                <span style={{color: "red"}}>{this.state.errors["description"]}</span>
                <div className = "formFields">Description about yourself:</div>
                <Form.Field>
                    <Input 
                        placeholder="Description" 
                        value={this.state.fields["description"]} 
                        onChange={this.handleChange.bind(this, "description")}
                    />
                </Form.Field>
                <Form.Field>
                    <Button color='primary' size='large'
                        onClick={this.contactSubmit.bind(this)}
                    >
                        submit
                    </Button>
                    <UploadModal netid = {this.props.netid} show = {this.state.UploadModalShow} onHide = {this.handleClose.bind(this)}
                />
                </Form.Field>
            </Form>
        </div>
        )
    }
}

export default ProfileForm
