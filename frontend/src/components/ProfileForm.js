import React, {useState} from 'react';
import { Form, Input, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router';
import {DragDrop} from './DragDrop';
import {UploadModal} from './UploadModal';

/*export const ProfileForm = ({onNewProfile}) => {
    const[first_name, setFirstname] = useState('');
    const[last_name, setLastname] = useState('');
    const[email, setEmail] = useState('');
    const[description, setDescription] = useState('');

    return (
        <Form>
            <Form.Field>
                <Input 
                    placeholder="First Name:" 
                    value={first_name} 
                    onChange={e => setFirstname(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <Input 
                    placeholder="Last Name:" 
                    value={last_name} 
                    onChange={e => setLastname(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <Input 
                    placeholder="Email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <Input 
                    placeholder="Description" 
                    value={description} 
                    onChange={e => setDescription(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <Button 
                    onClick={ async () => {
                        const photographer = { first_name, last_name, email, description };
                        const response = await fetch('/api/createProfile', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            }, 
                            body: JSON.stringify(photographer)
                        });
                    
                        if (response.ok) {
                            console.log('response worked');
                            onNewProfile(photographer);
                            setFirstname('');
                            setLastname('');
                            setEmail('');
                            setDescription('');
                        }
                    }}
                >
                    submit
                </Button>
            </Form.Field>
        </Form>
        );
    }; */ 

class ProfileForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            fields: {},
            errors: {},
            redirect: false,
            UploadModalShow: false
        }
    }
 
    handleClose(){this.setState({UploadModalShow: false});
    const first_name = this.state.fields['first_name']
            const last_name = this.state.fields['last_name']
            const email = this.state.fields['email']
            const description = this.state.fields['description']
            console.log(first_name)
            const photographer = { first_name, last_name, email, description };
            const response = fetch('/api/createProfile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify(photographer)
            });
            this.setState({redirect: true})
    }
    handleShow(){ this.state.UploadModalShow = true;
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
      }

    handleChange(field, e){         
        let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});
    }

    render(){

        console.log(this.props.netid)
        if(this.state.redirect) {
            console.log("redirect")
            return <Redirect to='/browse'/>;
        }
        return (
            <Form>
            <Form.Field>
                <Input 
                    placeholder="First Name:" 
                    value={this.state.fields["first_name"]}
                    onChange={this.handleChange.bind(this, "first_name")}
                />
            </Form.Field>
            <span style={{color: "red"}}>{this.state.errors["first_name"]}</span> 
            <Form.Field>
                <Input 
                    placeholder="Last Name:" 
                    value={this.state.fields["last_name"]}
                    onChange={this.handleChange.bind(this, "last_name")}
                />
            </Form.Field>
            <span style={{color: "red"}}>{this.state.errors["last_name"]}</span>
            <Form.Field>
                <Input 
                    placeholder="Email" 
                    value={this.state.fields["email"]}
                    onChange={this.handleChange.bind(this, "email")}
                />
            </Form.Field>
            <span style={{color: "red"}}>{this.state.errors["email"]}</span>
            <Form.Field>
                <Input 
                    placeholder="Description" 
                    value={this.state.fields["description"]} 
                    onChange={this.handleChange.bind(this, "description")}
                />
            </Form.Field>
            <span style={{color: "red"}}>{this.state.errors["description"]}</span>
            <Form.Field>
                <Button 
                    onClick={this.contactSubmit.bind(this)}
                >
                    submit
                </Button>
                <UploadModal netid = {this.props.netid} show = {this.state.UploadModalShow} onHide = {this.handleClose.bind(this)}
               />

            </Form.Field>
        </Form>
        )
    }
}

export default ProfileForm

/* <div>           
                <form name="contactform" className="contactform" onSubmit= {this.contactSubmit.bind(this)}>
                    <div className="col-md-6">
                        <fieldset>
                            <input ref="name" type="text" size="30" placeholder="Name" onChange={this.handleChange.bind(this, "name")} value={this.state.fields["name"]}/>
                            <span style={{color: "red"}}>{this.state.errors["name"]}</span>
                            <br/>
                            <input refs="email" type="text" size="30" placeholder="Email" onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]}/>
                            <span style={{color: "red"}}>{this.state.errors["email"]}</span>
                            <br/>
                            <input refs="phone" type="text" size="30" placeholder="Phone" onChange={this.handleChange.bind(this, "phone")} value={this.state.fields["phone"]}/>
                            <br/>
                            <input refs="address" type="text" size="30" placeholder="Address" onChange={this.handleChange.bind(this, "address")} value={this.state.fields["address"]}/>
                            <br/>
                        </fieldset>
                    </div>

                </form>
            </div> 
            
            
            
                                    const first_name = this.state.fields['first_name']
                        const last_name = this.state.fields['last_name']
                        const email = this.state.fields['email']
                        const description = this.state.fields['description']
                        console.log(first_name)
                        const photographer = { first_name, last_name, email, description };
                        const response = await fetch('/api/createProfile', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            }, 
                            body: JSON.stringify(photographer)
                        });
                    
                        if (response.ok) {
                            console.log('response worked');
                            this.props.onNewProfile(photographer);
                            this.setState({ fields : {}}) 
                        }*/ 
