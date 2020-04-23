// This is the component that renders the actual input fields and gallery preview.
// We get the information about the current user by calling the /getPhotogapher route in routes.py
// and passing in their netid which is passed as a prop to this component
// We then autofill the fields based on the information returned from /getPhotographer
import React from 'react';
import { Form, Input, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router';
import {storage, fstore} from './firebase/config';
import AvatarEditor from 'react-avatar-editor'
import Dropzone from 'react-dropzone'

class ProfileForm extends React.Component {

    constructor(props){
        super(props)  
        this.state = {
            //Contains the information pertaining to the currently browsing photographer
            fields: {first_name:"", last_name:"", email:"", website_url:"", description:"", profile_pic:"", key:""},
            errors: {},
            redirect: false,
            // UploadModalShow: false,
            // Profile picture of the currently browsing photographer - have this field to avoid nested state updates
            profPic: null,
            profPicUrl: '',
            portfolio: [],
            netid:this.props.netid,
            stateHasLoaded: false
        }
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
            fields:result, 
            image:result.profile_pic, 
            portfolio:result.portfolio, 
            stateHasLoaded:true, 
            profPic:result.key, 
            profPicUrl:result.profile_pic}))
        .catch(e => console.log(e))

    }

    // Makes sure all the required fields give proper warnings
    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Profile pic is required
        if (this.state.profPic === "") {
            formIsValid = false
            errors["profile_picture"] = "Profile Picture is required"
        }

        //First Name
        if(!fields["first_name"]){
            formIsValid = false;
            errors["first_name"] = "Cannot be empty";
        }

        else if(typeof fields["first_name"] !== "undefined"){
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

        else if(typeof fields["last_name"] !== "undefined"){
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

        else if(typeof fields["email"] !== "undefined"){
            let lastAtPos = fields["email"].lastIndexOf('@');
            let lastDotPos = fields["email"].lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
                formIsValid = false;
                errors["email"] = "Email is not valid";
            }
        }

        //Website Url
        if(typeof fields["website_url"] !== "undefined"){
            if(!fields["website_url"].match(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/)){
                formIsValid = false;
                errors["website_url"] = "Enter a valid url";
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

    handleDrop = dropped=> {
        this.setState({image:dropped[0]})
        console.log(this.state.image)
    }
    
    // Called on button click to upload photo
    handleNewImage(e) {
        this.setState({image:e.target.files[0]})
        console.log(this.state.image)
        console.log(e.target.files[0])

    }

    // Called when any of the text fields are edited
    handleChange(field, e){         
        let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});
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
            const first_name = this.state.fields['first_name']
            const last_name = this.state.fields['last_name']
            const email = this.state.fields['email']
            const website_url = this.state.fields['website_url']
            const description = this.state.fields['description']
            const profile_pic = this.state.profPicUrl
            const key = this.state.profPic
            const photographer = { photographer_netid, first_name, last_name, email, website_url, description, profile_pic, key};
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
                    <span class="required">*</span> = required field
                </div>
                
                <br/>
                {/* This code is not working yet, need to upload file to firebase, and do what was done for gallery*/}
                <div className = "formFields">
                    <span style={{color: "red"}}>{this.state.errors["profile_picture"]}</span> 
                    <div>Upload a Profile Picture:<span class="required">*</span>   </div> 
                    <input name = "newImage" type = "file" onChange = {this.storeProfPic}/>
                    <br/>
                    <br/>
                    <img alt = "" src = {this.state.profPicUrl} className = "createGallery"/>
                </div>               
                    
                <Form>
                <span style={{color: "red"}}>{this.state.errors["first_name"]}</span>
                <div className = "formFields">First Name:<span class="required">*</span> </div>
                <Form.Field>
                    <Input 
                        placeholder= "First Name"
                        value={this.state.fields["first_name"]}
                        onChange={this.handleChange.bind(this, "first_name")}
                    />
                </Form.Field>
                <br/>
                <span style={{color: "red"}}>{this.state.errors["last_name"]}</span>
                <div className = "formFields">Last Name:<span class="required">*</span></div>
                <Form.Field>
                    <Input 
                        placeholder="Last Name" 
                        value={this.state.fields["last_name"]}
                        onChange={this.handleChange.bind(this, "last_name")}
                    />
                </Form.Field>
                <br/>
                <span style={{color: "red"}}>{this.state.errors["email"]}</span>
                <div className = "formFields">Email:<span class="required">*</span></div>
                <Form.Field>
                    <Input 
                        placeholder="Email" 
                        value={this.state.fields["email"]}
                        onChange={this.handleChange.bind(this, "email")}
                    />
                </Form.Field>
                <br/>
                <span style={{color: "red"}}>{this.state.errors["website_url"]}</span>
                <div className = "formFields">Link Your Website:</div>
                <Form.Field>
                    <Input 
                        placeholder="Website URL" 
                        value={this.state.fields["website_url"]}
                        onChange={this.handleChange.bind(this, "website_url")}
                    />
                </Form.Field>
                <br/>
                <span style={{color: "red"}}>{this.state.errors["description"]}</span>
                <div className = "formFields">Description about yourself:<span class="required">*</span></div>
                <Form.Field>
                    <Form.TextArea 
                        maxLength="1000"
                        placeholder="Description (max 1000 characters)" 
                        value={this.state.fields["description"]} 
                        onChange={this.handleChange.bind(this, "description")}
                        rows={5}
                    />
                </Form.Field> 
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