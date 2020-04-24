// This is the component that renders the actual input fields and gallery preview.
// We get the information about the current user by calling the /getPhotogapher route in routes.py
// and passing in their netid which is passed as a prop to this component
// We then autofill the fields based on the information returned from /getPhotographer
import React from 'react';
import { Form, Input, Button, Checkbox } from 'semantic-ui-react';
import { Redirect } from 'react-router';
import {storage, fstore} from './firebase/config';

class ProfileForm extends React.Component {

    constructor(props){
        super(props)  
        this.state = {
            //Contains the information pertaining to the currently browsing photographer
            first_name:"", 
            last_name:"", 
            email:"", 
            website_url:"", 
            description:"", 
            photography_checkbox:false,
            videography_checkbox:false,
            editing_checkbox:false,
            equipment:"",         
            errors: {},
            redirect: false,
            profPic: '',
            profPicUrl: '',
            portfolio: [],
            netid:this.props.netid,
            stateHasLoaded: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.storePhoto = this.storePhoto.bind(this)
        this.deletePhoto = this.deletePhoto.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.storeProfPic = this.storeProfPic.bind(this)
    }
    
    // Get the pertinent information to the user when the component mounts to autofill the form fields with their information if possible
    componentDidMount() {

        fetch('/api/getPhotographer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({photographer_netid:this.props.netid})
        }).then(response => response.json())
        .then(result => this.setState({
            first_name:result.first_name,
            last_name:result.last_name,
            email:result.email,
            website_url:result.website_url,
            description:result.description,
            photography_checkbox:result.photography_checkbox,
            videography_checkbox:result.videography_checkbox,
            editing_checkbox:result.editing_checkbox,
            equipment:result.equipment,
            portfolio:result.portfolio, 
            stateHasLoaded:true, 
            profPic:result.key, 
            profPicUrl:result.profile_pic}))
        .then(console.log(this.state))
        .catch(e => console.log(e))
    }

    // Makes sure all the required fields give proper warnings
    handleValidation(){
        let errors = {};
        let formIsValid = true;

        //Profile pic is required
        if (this.state.profPic === "") {
            formIsValid = false
            errors["profile_picture"] = "Profile Picture is required"
        }

        //First Name
        if(this.state.first_name === ""){
            formIsValid = false;
            errors["first_name"] = "Cannot be empty";
        }

        else if(typeof this.state.first_name !== "undefined"){
            if(!this.state.first_name.match(/^[a-zA-Z]+$/)){
                formIsValid = false;
                errors["first_name"] = "Only letters";
            }        
        }

        // Last Name
        if(this.state.last_name === ""){
            formIsValid = false;
            errors["last_name"] = "Cannot be empty";
        }

        else if(typeof this.state.last_name !== "undefined"){
            if(!this.state.last_name.match(/^[a-zA-Z]+$/)){
                formIsValid = false;
                errors["last_name"] = "Only letters";
            }        
        }

        //Email
        if(this.state.email === "email"){
            formIsValid = false;
            errors["email"] = "Cannot be empty";
        }

        else if(typeof this.state.email !== "undefined"){
            let lastAtPos = this.state.email.lastIndexOf('@');
            let lastDotPos = this.state.email.lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') === -1 && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
                formIsValid = false;
                errors["email"] = "Email is not valid";
            }
        }

        //Website Url
        if(typeof this.state.website_url !== "undefined"){
            if(!this.state.website_url.match(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/)){
                formIsValid = false;
                errors["website_url"] = "Enter a valid url";
            }  
        }

        // Description
        if(!this.state.description){
            formIsValid = false;
            errors["description"] = "Cannot be empty";
        }

        // Expertise
        if(!this.state.photography_checkbox && !this.state.videography_checkbox && !this.state.editing_checkbox){
            formIsValid = false;
            errors["expertise"] = "Must check at least one"
        }

        // Equipment
        if(this.state.equipment === ""){
            formIsValid = false;
            errors["equipment"] = "Cannot be empty";
        }
        this.setState({errors: errors});

        return formIsValid;
    }

    // Called when any of the text fields are edited
    handleChange(e){  
        console.log(e.target.name)
        console.log(e.target.value) 
        let change = this.state
        change[e.target.name] = e.target.value
        this.setState(change)
    }

    storeProfPic(e) {
        
        const key = e.target.files[0].name
        const img = storage.ref(`imagesxoy/${key}`)
        img.put(e.target.files[0]).then((snap) => {
            storage.ref(`imagesxoy`).child(key).getDownloadURL().then(url => {
            const image = {key, url};
            fstore.collection(this.state.netid).doc(key).set(image)
            this.setState({profPic:key, profPicUrl:url})
            })
        }, 
        (error) => {    
          // error function ....
          console.log(error);
        },
        () => {
        } );
    }

    storePhoto(e) {/* storage.ref('images').child(files.item(i).name).getDownloadURL().then(url => {
        console.log(url);
        const isUploading = false;
        this.setState({isUploading})
        //const image = {url: url, added: new Date()}
        //fstore.collection(this.props.netid).add(image).then(res =>{});*/
        //console.log(e.target.files[0])
        //console.log(URL.createObjectURL(e.target.files[0]))
        const key = e.target.files[0].name
        const img = storage.ref(`imagesxoy/${key}`)
        img.put(e.target.files[0]).then((snap) => {
          storage.ref(`imagesxoy`).child(key).getDownloadURL().then(url => {
          const image = {key, url};
          fstore.collection(this.state.netid).doc(key).set(image)
          let portfolio = this.state.portfolio.slice()
          portfolio.push({
            key: key,
            url: url,
          })
          this.setState({portfolio})
          })
        }, 
        (error) => {    
          // error function ....
          console.log(error);
        },
        () => {
        } );
    }
    
    deletePhoto(event) {
        let current_image_name = event.target.name
        storage.ref(`imagesxoy`).child(current_image_name).delete()
        let images = this.state.portfolio.filter((imag) => {
            return imag.key !== current_image_name
        })
        this.setState({portfolio:images})
    }

    // Called when submit button is pressed. This will get all the information in the fields from state, and the portfolio from state as well
    // Will first make a fetch call to update the photographers table
    // Second, will make a fetch call to update the portfolio pertaining to the browsing photographer via call to api/createPortfolio
    handleSubmit() {

        if (this.handleValidation()) {
            const photographer_netid = this.state.netid
            const first_name = this.state.first_name
            const last_name = this.state.last_name
            const email = this.state.email
            const website_url = this.state.website_url
            const description = this.state.description
            const photography_checkbox = this.state.photography_checkbox
            const videography_checkbox = this.state.videography_checkbox
            const editing_checkbox = this.state.editing_checkbox
            const equipment = this.state.equipment
            const profile_pic = this.state.profPicUrl
            const key = this.state.profPic
            const photographer = { photographer_netid, first_name, last_name, email, website_url, 
                                   description, photography_checkbox, videography_checkbox, editing_checkbox, 
                                   equipment, profile_pic, key};
            fetch('/api/createProfile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify(photographer)
            });
            fetch('/api/createPortfolio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify({netid:this.state.netid, portfolio:this.state.portfolio})
            });
            this.setState({redirect: true})
        }
    }

    // The actual rendering of the form. Use the state which has stored the current photographer's information to autofill the fields
    render(){
        // Calling render() without loading info into state will cause error, therefore do this if statement to catch
        if(this.state.hasLoaded === false) return null

        else if(this.state.redirect) {
            console.log("redirect")
            return <Redirect to='/browse'/>;
        }

        return (
            <div className = "profileFormMargins">

                <div>
                    <span className="required">*</span> = required field
                </div>
                <br/>

                <span style={{color: "red"}}>{this.state.errors["profile_picture"]} <br/> </span> 
                <span className = "formFields">Upload a Profile Picture:</span><span className="required">*</span>
                <br/>
                <input name = "newImage" type = "file" onChange = {this.storeProfPic}/>
                <br/>
                <br/>
                <img alt = "" src = {this.state.profPicUrl} className = "createGallery"/>
                    
                <Form>
                <span style={{color: "red"}}>{this.state.errors["first_name"]} <br/> </span>
                <span className = "formFields">First Name:</span><span className="required">*</span> 
                <Form.Field>
                    <Input 
                        name = "first_name"
                        placeholder= "First Name"
                        value={this.state.first_name}
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <br/>
                <span style={{color: "red"}}>{this.state.errors["last_name"]} <br/> </span>
                <span className = "formFields">Last Name:</span><span className="required">*</span>
                <Form.Field>
                    <Input 
                        name = "last_name"
                        placeholder="Last Name" 
                        value={this.state.last_name}
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <br/>
                <span style={{color: "red"}}>{this.state.errors["email"]} <br/> </span>
                <span className = "formFields">Email:</span><span className="required">*</span>
                <Form.Field>
                    <Input 
                        name = "email"
                        placeholder="Email" 
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <br/>
                <span style={{color: "red"}}>{this.state.errors["website_url"]} <br/> </span>
                <div className = "formFields">Link Your Website:</div>
                <Form.Field>
                    <Input 
                        name = "website_url"
                        placeholder="Website URL" 
                        value={this.state.website_url}
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <br/>
                <span style={{color: "red"}}>{this.state.errors["description"]} <br/> </span>
                <span className = "formFields">Description about yourself (max 1000 characters):</span><span className="required">*</span>
                <Form.Field>
                    <Form.TextArea 
                        name = "description"
                        maxLength="1000"
                        placeholder="Description" 
                        value={this.state.description} 
                        onChange={this.handleChange}
                        rows={5}
                    />
                </Form.Field> 
                <br/>

                <span style={{color: "red"}}>{this.state.errors["expertise"]} <br/> </span>
                <span className = "formFields">Area(s) of Expertise:</span><span className="required">*</span>
                <Form.Field>
                    <Checkbox label='Photography' 
                            checked={this.state.photography_checkbox} 
                            onChange={() => this.setState({photography_checkbox:!this.state.photography_checkbox})}/>
                    <br/>
                    <Checkbox label='Videography' 
                            checked={this.state.videography_checkbox} 
                            onChange={() => this.setState({videography_checkbox:!this.state.videography_checkbox})}/>
                    <br/>
                    <Checkbox label='Editing'
                            checked={this.state.editing_checkbox} 
                            onChange={() => this.setState({editing_checkbox:!this.state.editing_checkbox})}/>
                    <br/>
                </Form.Field>
            
                <span style={{color: "red"}}>{this.state.errors["equipment"]} <br/> </span>
                <span className = "formFields">Please List Your Equipment/Software (max 250 characters):</span><span className="required">*</span>
                <Form.Field>
                    <Form.TextArea 
                        name = "equipment"
                        maxLength="250"
                        placeholder="I own a DSLR..." 
                        value={this.state.equipment} 
                        onChange={this.handleChange}
                        rows={3}
                    />
                </Form.Field>

                <br/>
                <br/>

                <div className = "formFields">Upload photos from your portfolio to show of to potential clients:</div>    
                </Form>
                
                <input id="input" type="file" onChange={this.storePhoto}/>
                <br/>
                <div className = "createGalleryText">My Gallery</div>
                <hr className = "createHR"/>
                {this.state.portfolio.map((image) => 
                    <img alt = '' key = {image.url} name={image.key} className = "createGallery" src = {image.url} onClick = {(image) => this.deletePhoto(image)}/>)}
                <br/>
                <br/>
                <Button color='blue' size='large'onClick={this.handleSubmit} className ="createSubmit">
                    Submit
                </Button>
                <br/>
                <br/>
            </div>
        )
    }
}

export default ProfileForm