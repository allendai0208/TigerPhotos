// This is the component that renders the actual input fields and gallery preview.
// We get the information about the current user by calling the /getPhotogapher route in routes.py
// and passing in their netid which is passed as a prop to this component
// We then autofill the fields based on the information returned from /getPhotographer
import React from 'react';
import { Form, Input, Button, Checkbox} from 'semantic-ui-react';
import { Redirect } from 'react-router';
import {storage, fstore} from './firebase/config';
import loadingIcon2 from './pictures/loadingicon2.gif'
import InfoIcon from '@material-ui/icons/Info'
import Tooltip from '@material-ui/core/Tooltip'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core/styles';
import {Modal} from 'react-bootstrap'

const theme = createMuiTheme({
    overrides: {
        MuiTooltip: {
            tooltip: {
            fontSize: "1em"
            }
        }
    }
});

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
            notif_checkbox: false,
            equipment:"",         
            errors: {},
            redirect: false,
            profPic: '',
            profPicUrl: '',
            portfolio: [],
            netid:this.props.netid,
            stateHasLoaded: false,
            prof_pic_loaded: false,
            new_image_loading: false,
            prof_pic_file:'',
            user_uploaded_prof_pic:false,
            show:false,
            use_clicked_save:false
        }
        this.handleChange = this.handleChange.bind(this)
        this.storePhoto = this.storePhoto.bind(this)
        this.onInputClick = this.onInputClick.bind(this)
        this.deletePhoto = this.deletePhoto.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.showModal = this.showModal.bind(this)
        this.ValidateSingleInput = this.ValidateSingleInput.bind(this)
        this.ValidateMultiInput = this.ValidateMultiInput.bind(this)
        this.renderProfPic = this.renderProfPic.bind(this)
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
            notif_checkbox: result.notif_checkbox,
            equipment:result.equipment,
            portfolio:result.portfolio, 
            stateHasLoaded:true, 
            profPic:result.key, 
            profPicUrl:result.profile_pic,
            prof_pic_loaded: true}))
        .then(console.log(this.state))
        .catch(e => console.log(e))
    }

    renderProfPic(e) {
        if (e.target.files[0] === undefined)
            return
        if (!this.ValidateSingleInput(e.target.files[0])) return;
        this.setState({
            profPicUrl: URL.createObjectURL(e.target.files[0]),
            prof_pic_file:e.target.files[0],
            user_uploaded_prof_pic:true
          })
    }

    // Makes sure all the required fields give proper warnings
    handleValidation(){
        let errors = {};
        let formIsValid = true;

        //Profile pic is required
        if (this.state.profPicUrl === "") {
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
        if(this.state.website_url !== ""){
            if(!this.state.website_url.match(/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/)){
                formIsValid = false;
                errors["website_url"] = "Enter a valid url in the form: https://yourwebsite.com";
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
        let change = this.state
        change[e.target.name] = e.target.value
        this.setState(change)
    }

      
    ValidateSingleInput(oInput){
        var _validFileExtensions = [".jpg", ".jpeg", ".gif", ".png"];  
        
            var sFileName = oInput.name;
            if (sFileName.length > 0) {
                var blnValid = false;
                for (var j = 0; j < _validFileExtensions.length; j++) {
                    var sCurExtension = _validFileExtensions[j];
                    if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() === sCurExtension.toLowerCase()) {
                        blnValid = true;
                        break;
                    }
                }
                
                if (!blnValid) {
                    alert("Sorry, " + sFileName + " is invalid, allowed extensions are: " + _validFileExtensions.join(", "));
                    oInput.value = "";
                    return false;
                }
            }
        
        return true;
    }

    ValidateMultiInput(oInput){
        var _validFileExtensions = [".jpg", ".jpeg", ".gif", ".png"];  
        
            var sFileName = oInput.name;
            if (sFileName.length > 0) {
                var blnValid = false;
                for (var j = 0; j < _validFileExtensions.length; j++) {
                    var sCurExtension = _validFileExtensions[j];
                    if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() === sCurExtension.toLowerCase()) {
                        blnValid = true;
                        break;
                    }
                }
                
                if (!blnValid) {
                    oInput.value = "";
                    return false;
                }
            }
        
        return true;
    }

    onInputClick = (e) => {
        e.target.value = ''
    }

    storePhoto(e) {
        if (e.target.files[0] === undefined)
            return

        let length = e.target.files.length
        let fails = []
        let alertem = false

        if (!this.state.new_image_loading) {
            this.setState({new_image_loading:true})
            console.log(this.state.new_image_loading)
        }

        for (let i = 0; i < length; i++) {
            if (!this.ValidateMultiInput(e.target.files[i])) {
                fails.push(e.target.files[i].name)
                alertem = true
                this.setState({new_image_loading:false})
                continue
            }
            this.setState({new_image_loading:true})
            const key = (Math.floor(Math.random() * 1000000000000)).toString(); // hashes the key so that duplicate names don't collide
            const img = storage.ref(`imagesxoy/${key}`)
            img.put(e.target.files[i]).then((snap) => {
                storage.ref(`imagesxoy`).child(key).getDownloadURL().then(url => {
                    const image = {key, url};
                    fstore.collection(this.state.netid).doc(key).set(image)

                    fetch('/api/addImage', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        }, 
                        body: JSON.stringify({netid:this.props.netid, key:key, url:url})
                    })

                    let portfolio = this.state.portfolio.slice()
                    portfolio.push({
                        key: key,
                        url: url,
                    })
                    this.setState({portfolio:portfolio})
                    if (i === length - 1) {
                        this.setState({new_image_loading:false})
                    }
                })
            }, 
            (error) => {    
                // error function ....
                console.log(error);
            },
            )
        }
        /*check the async execution
        IMPORTANT!
        */
        if (alertem) {
            alert("Sorry, " + fails.join(", ") + " are invalid, allowed extensions are: .jpg, .gif, .jpeg, .png");
        }
    }
    
    deletePhoto(event) {
        let current_image_name = event.target.name
        storage.ref(`imagesxoy`).child(current_image_name).delete()
        let images = this.state.portfolio.filter((imag) => {
            return imag.key !== current_image_name
        })
        this.setState({portfolio:images})
        fetch('/api/deleteImage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({netid:this.props.netid, key:current_image_name})
        })
    }

    // Called when submit button is pressed. This will get all the information in the fields from state, and the portfolio from state as well
    // Will first make a fetch call to update the photographers table
    // Second, will make a fetch call to update the portfolio pertaining to the browsing photographer via call to api/createPortfolio
    handleSubmit() {
        if (this.handleValidation()) {
            this.setState({user_clicked_submit:true})
            const key = (Math.floor(Math.random() * 1000000000000)).toString(); // hashes the key so that duplicate names don't collide
            const img = storage.ref(`imagesxoy/${key}`)
            if (this.state.user_uploaded_prof_pic) {

                if (this.state.profPic !== "") {
                    storage.ref(`imagesxoy`).child(this.state.profPic).delete()
                }
                console.log(this.state)
                img.put(this.state.prof_pic_file).then((snap) => {
                    storage.ref(`imagesxoy`).child(key).getDownloadURL().then(url => {
                        const image = {key, url}
                        fstore.collection(this.state.netid).doc(key).set(image)
                        const profile_pic = url
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
                        const notif_checkbox =  this.state.notif_checkbox
                        const photographer = { photographer_netid, first_name, last_name, email, website_url, 
                                            description, photography_checkbox, videography_checkbox, editing_checkbox, notif_checkbox, 
                                            equipment, profile_pic, key};
                        fetch('/api/createProfile', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            }, 
                            body: JSON.stringify(photographer)
                        })
                        .then(this.setState({redirect: true}))
    
                    })
                }, 
                (error) => {    
                // error function ....
                console.log(error);
                },
                )
            }
            else {
                const key = this.state.profPic
                const profile_pic = this.state.profPicUrl
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
                const notif_checkbox =  this.state.notif_checkbox
                const photographer = { photographer_netid, first_name, last_name, email, website_url, 
                                    description, photography_checkbox, videography_checkbox, editing_checkbox, notif_checkbox, 
                                    equipment, profile_pic, key};
                fetch('/api/createProfile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }, 
                    body: JSON.stringify(photographer)
                })
                .then(this.setState({redirect: true}))
            }
                    
        }
        else {
            alert("The form has errors. Please correct the errors and submit again.")
        }
    }

    handleDelete() {
        fetch('/api/deleteProfile', {
            method: 'POST',
            headers: {
            'Content_type':'application/json'
            },
            body: JSON.stringify({netid : this.props.netid})
        })
        .then(
            this.state.portfolio.map((image) =>
                storage.ref(`imagesxoy`).child(image.key).delete())
        )
        .then(
            storage.ref(`imagesxoy`).child(this.state.profPic).delete()
        )
        .then(
            this.setState({
                show: false,
                message: 'Your profile has been deleted.'
            }),
            window.location.reload()
        )
        .catch(function(error) {
            console.log(error)
        })
    }

    // shows modal when delete icon is clicked 
    showModal() {
        this.state.portfolio.map((image) =>
            console.log(image.key))
        console.log("changing")
        this.setState({
            show: true
        })
    }

    // The actual rendering of the form. Use the state which has stored the current photographer's information to autofill the fields
    render() { 
        if (this.state.redirect) {
            console.log("redirect")
            return <Redirect to='/browse'/>;
        }

        return (
            <div>
            <Modal className="deleteModal" size='small' show={this.state.show} onHide={() => this.setState({show: false})}>
                <Modal.Header>
                    Confirm Deletion
                </Modal.Header>
                <Modal.Body>
                        <span style={{color:'red', fontWeight:'bold'}}>Warning: </span> 
                        Are you sure you want to delete your profile? This action will delete all contents from your profile.
                </Modal.Body>
                <Modal.Footer>
                    <Button negative onClick={() => this.setState({show: false})}>No</Button>
                    <Button positive onClick={this.handleDelete}>Yes</Button>
                </Modal.Footer>
            </Modal>
            
            <div>
                <span className = "formFields">Note: profiles are only meant for photographers/videomakers/editors. General users do not need to make a profile.</span>
                <br/>
                <span style={{color: "red"}}>{this.state.errors["profile_picture"]} <br/> </span> 
                <span className = "formFields">Upload a Profile Picture:</span><span className="required">*</span>
                <br/>
                <input name = "newImage" id="profpic" type = "file" style={{display: "none"}} onChange = {this.renderProfPic}/>
                <label className="custom-file-upload" htmlFor="profpic">Choose file</label>
                <br/>
                <div className = "formFields" style={{display: this.state.prof_pic_loaded ? "none" : "block"}}>
                    <img alt='' src = {loadingIcon2} style = {{height:"200px", width:"auto"}}/>
                </div>
                <img alt = "" style={{display: this.state.prof_pic_loaded ? "block" : "none"}} src = {this.state.profPicUrl} className = "createProfilePic"/>
                    
                <Form>
                <span style={{color: "red"}}>{this.state.errors["first_name"]} <br/> </span>
                <span className = "formFields">First Name:</span><span className="required">*</span> 
                <span className = "formFields"> <MuiThemeProvider theme={theme}><Tooltip placement='right' title="If your first or last name exceed approximately 20 characters, 
                        please consider using an abbreviation or nickname for best viewing purposes. If your email exceeds approximately 30 characters then please consider using a different email."><InfoIcon/></Tooltip></MuiThemeProvider> </span>
                <Form.Field>
                    <Input 
                        name = "first_name"
                        placeholder= "First Name"
                        value={this.state.first_name}
                        onChange={this.handleChange}
                    />
                </Form.Field>
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
                <span style={{color: "red"}}>{this.state.errors["website_url"]} <br/> </span>
                <div className = "formFields">
                    Link Your Website: <MuiThemeProvider theme={theme}><Tooltip placement='right' title="Could be your professional website, social media page, or YouTube channel."><InfoIcon/></Tooltip></MuiThemeProvider>
                </div>
                <Form.Field>
                    <Input 
                        name = "website_url"
                        placeholder="https://yourwebsite.com" 
                        value={this.state.website_url}
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <span style={{color: "red"}}>{this.state.errors["description"]} <br/> </span>
                <span className = "formFields">Description about yourself, e.g., past experience, pricing, and availability (max 2000 characters):</span><span className="required">*</span>
                <Form.Field>
                    <Form.TextArea 
                        name = "description"
                        maxLength="2000"
                        placeholder="Description" 
                        value={this.state.description} 
                        onChange={this.handleChange}
                        rows={5}
                    />
                </Form.Field> 
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
                </Form.Field>
                <span className = "formFields">Our 'Feed' page allows visitors to make job postings for photographers, videographers and editors.<br/>Would you like to recieve email notifications on feed updates looking for your expertise?</span>
                <Form.Field>
                <Checkbox label='Sign me up!'
                            checked={this.state.notif_checkbox} 
                            onChange={() => this.setState({notif_checkbox:!this.state.notif_checkbox})}/>
                </Form.Field>
                <span style={{color: "red"}}>{this.state.errors["equipment"]} <br/> </span>
                <span className = "formFields">Please List Your Equipment/Software (max 500 characters):</span><span className="required">*</span>
                <Form.Field>
                    <Form.TextArea 
                        name = "equipment"
                        maxLength="500"
                        placeholder="I own a DSLR..." 
                        value={this.state.equipment} 
                        onChange={this.handleChange}
                        rows={3}
                    />
                </Form.Field>

                <br/>
                <br/>

                <div className = "formFields">Upload photos from your portfolio to show of to potential clients. We recommend uploading ~10-15 photos (changes are saved automatically):</div>    
                </Form>

                <input id="galleryPics" multiple type="file" style={{display: "none"}} onClick={this.onInputClick} onChange = {this.storePhoto}/>
                <label className="custom-file-upload" htmlFor="galleryPics">Choose files</label>

                <br/>
                <div className = "createGalleryText">
                    My Gallery  
                    <img alt = '' src = {loadingIcon2} style = {{height:50, width:"auto", marginTop:0, position:"absolute", marginLeft:35, display:this.state.new_image_loading ? "inline-block" : "none"}}/>
                </div>
                <hr className = "createHR"/>
                {this.state.portfolio.map((image) => 
                    <img alt='' key={image.url} name={image.key} className="createGallery" src={image.url} onClick={(image) => this.deletePhoto(image)}/>)}
                <br/>
                <br/>
                <p className = "formFields"> Note: please wait for the pictures to finish uploading before saving your profile. Click on a picture to delete it from your portfolio. </p>
                <br/>
                <br/>
                <Button color='blue' size='large'onClick={this.handleSubmit} className ="createSubmit" style={{display: this.state.user_clicked_submit ? "none" : "inline"}}>
                    Save
                </Button>
                <Button color='blue' size='large' className ="createSubmit" style={{display: this.state.user_clicked_submit ? "inline" : "none"}}>
                    Saving...
                </Button>
                <Button color='red' size='large'onClick={this.showModal} className ="createSubmit" style={{display: this.state.user_clicked_submit ? "none" : "inline"}}>
                    Delete My Profile
                </Button>
                <Button disabled size='large' className ="createSubmit" style={{display: this.state.user_clicked_submit ? "inline" : "none"}}>
                    Delete My Profile
                </Button>
                <br/>
                <br/>
            </div>
            </div>
        )
    }
}

export default ProfileForm