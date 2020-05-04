import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent' 
import { Form, Input, Button } from 'semantic-ui-react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { Dropdown } from 'semantic-ui-react'
import CreateIcon from '@material-ui/icons/Create';
import Button2 from '@material-ui/core/Button'
import {Modal} from 'react-bootstrap'
import Grid from '@material-ui/core/Grid';
import ClearIcon from '@material-ui/icons/Clear'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import InfoIcon from '@material-ui/icons/Info'
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

class FeedPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            filteredPosts: [],
            filter:"All",
            sort:"newest",
            subject_line: "",
            description:"",
            specialty:"",
            email:"",
            errors: {},
            showDelete: false,
            showPost: false,
            delete_subject_line:"",
            delete_description:"",
            delete_specialty:"",
            delete_email:""
        }
        this.handleChangeSubject = this.handleChangeSubject.bind(this)
        this.handleChangeDescription = this.handleChangeDescription.bind(this)
        this.handleChangeSpecialty = this.handleChangeSpecialty.bind(this)
        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleFilterChange = this.handleFilterChange.bind(this)
        this.handleSortChange = this.handleSortChange.bind(this)
        this.showModalDelete = this.showModalDelete.bind(this)
    }

    fetchPosts = () => {
        fetch('/api/getPosts')
        .then(response => response.json())
        .then(result => this.setState({
          posts: result.posts,
          filteredPosts: result.posts
        }))
        .then(() => {
            let filtered = this.state.posts
            filtered = filtered.sort(function (a, b) {
                a = new Date(a.sorting_timestamp)
                b = new Date(b.sorting_timestamp)
                if (a > b) return -1;
                else if (a < b) return 1;
                return 0;
              })
            this.setState({filteredPosts: filtered})
        })
        .catch(e => console.log(e))
    }

    componentDidMount() {
        this.fetchPosts()
    }

    handleChangeSubject(event){   
        this.setState({
            subject_line: event.target.value
        })
    }

    handleChangeDescription(event){  
        this.setState({
            description: event.target.value
        })
    }

    handleChangeSpecialty(event){  
        this.setState({
            specialty: event.target.value
        })
    }

    handleChangeEmail(event){  
        this.setState({
            email: event.target.value
        })
    }

    // ensures text area isn't empty upon submission
    handleValidation() {
        let formIsValid = true; 
        let errors={}

        // Description
        if(!this.state.description){
            formIsValid = false;
            errors["description"] = "Description cannot be empty";
        }

        // Subject line
        if(!this.state.subject_line){
            formIsValid = false;
            errors["subject_line"] = "Subject line cannot be empty";
        }

        // Specialty
        if(!this.state.specialty){
            formIsValid = false;
            errors["specialty"] = "Please select at least one specialty";
        }

        // Email
        if(!this.state.email){
            formIsValid = false;
            errors["email"] = "Email cannot be empty";
        }
        
        else if(typeof this.state.email !== "undefined"){
            let lastAtPos = this.state.email.lastIndexOf('@');
            let lastDotPos = this.state.email.lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') === -1 && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
                formIsValid = false;
                errors["email"] = "Email is not valid";
            }
        }

        this.setState({errors:errors})
        return formIsValid 
        }
        

    handleSubmit() {
        if (this.handleValidation()) {
            const netid = this.props.netid
            const subject_line = this.state.subject_line
            const description = this.state.description
            const specialty = this.state.specialty
            const email = this.state.email
            const post = {netid, subject_line, description, specialty, email};
            fetch("/api/createPost", {
                method: "POST",
                headers: {
                    "content-Type":"application/json"
                }, 
                body: JSON.stringify(post)
            })
            .then(window.location.reload())
        }
    }

    handleDelete() {
        console.log("here")
        const netid = this.props.netid
        const subject_line = this.state.delete_subject_line
        const description = this.state.delete_description
        const specialty = this.state.delete_specialty
        const email = this.state.delete_email
        fetch("/api/deletePost", {
            method: "POST",
            headers: {
              "content_type":"application/json"
            },
            body: JSON.stringify({netid:netid, subject_line:subject_line, description:description, specialty:specialty, email:email})
        })
        this.setState({showDelete:false})
        window.location.reload()
    }

    showModalDelete(post) {
        console.log("changing")
        console.log(post.subject_line)
        this.setState({
            showDelete: true,
            delete_subject_line: post.subject_line,
            delete_description: post.description,
            delete_specialty: post.specialty,
            delete_email: post.email
        })
    }

    showModalPost() {
        this.setState({
            showPost: true
        })
    }

    handleClose() {
        console.log("closing")
        this.setState({
            showPost: false,
            errors: {},
            subject_line: "",
            description:"",
            specialty:"",
            email:""
        })
    }

    handleFilterChange(event) {   
        this.setState({filter:event.target.value})
 
        let filtered = []

        if (event.target.value === "All") {
          filtered = this.state.posts
        }
        
        else if (event.target.value === "photographers") {
            for (const post of this.state.posts) {
                if (post['specialty'] === "photographers")
                    filtered.push(post)
            }
        }

        else if (event.target.value === "videographers") {
            for (const post of this.state.posts) {
                if (post['specialty'] === "videographers")
                    filtered.push(post)
            }
        }
    
        else if (event.target.value === "editors") {
            for (const post of this.state.posts) {
                if (post['specialty'] === "editors")
                    filtered.push(post)
            }
        }

        else if (event.target.value === "mypost") {
            for (const post of this.state.posts)
                if(post['netid'] === this.props.netid)
                    filtered.push(post)
        }

        if (this.state.sort === "oldest") {
            filtered = filtered.sort(function (a, b) {
                a = new Date(a.sorting_timestamp)
                b = new Date(b.sorting_timestamp)
                if (a < b) return -1;
                else if (a > b) return 1;
                return 0;
            })
        }

        else if (this.state.sort === "newest") {
            filtered = filtered.sort(function (a, b) {
                a = new Date(a.sorting_timestamp)
                b = new Date(b.sorting_timestamp)
                if (a > b) return -1;
                else if (a < b) return 1;
                return 0;
            })
        }

        this.setState({filteredPosts: filtered})
    }

    handleSortChange(event) {
        this.setState({sort:event.target.value})
    
        let filtered = []

        if (this.state.filter === "All") {
          filtered = this.state.posts
        }
        
        else if (this.state.filter === "photographers") {
            for (const post of this.state.posts) {
                if (post['specialty'] === "photographers")
                    filtered.push(post)
            }
        }

        else if (this.state.filter === "videographers") {
            for (const post of this.state.posts) {
                if (post['specialty'] === "videographers")
                    filtered.push(post)
            }
        }
    
        else if (this.state.filter === "editors") {
            for (const post of this.state.posts) {
                if (post['specialty'] === "editors")
                    filtered.push(post)
            }
        }

        else if (this.state.filter === "mypost") {
            for (const post of this.state.posts)
                if(post['netid'] === this.props.netid)
                    filtered.push(post)
        }

        if (event.target.value === "oldest") {
            filtered = filtered.sort(function (a, b) {
                a = new Date(a.sorting_timestamp)
                b = new Date(b.sorting_timestamp)
                if (a < b) return -1;
                else if (a > b) return 1;
                return 0;
            })
        }

        else if (event.target.value === "newest") {
            filtered = filtered.sort(function (a, b) {
                a = new Date(a.sorting_timestamp)
                b = new Date(b.sorting_timestamp)
                if (a > b) return -1;
                else if (a < b) return 1;
                return 0;
            })
        }

        this.setState({filteredPosts: filtered})
    }

    handleChange = (e, { value }) => this.setState({ specialty:value })

    render() {
        const options= [
            {text: 'Photographers', value: 'photographers'},
            {text: 'Videographers', value: 'videographers'},
            {text: 'Editors', value: 'editors'}
        ]
        const { value } = this.state;
        return(
            <div>
                <Modal show={this.state.showDelete} onHide={() => this.setState({showDelete: false})}>
                    <Modal.Header closeButton>
                        Confirm Deletion
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete your post?</Modal.Body>
                    <Modal.Footer>
                        <Button negative onClick={() => this.setState({showDelete: false})}>no</Button>
                        <Button positive onClick={() => this.handleDelete()}>yes</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.showPost} onHide={() => this.setState({showPost: false})} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Create your post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <span style={{color: "red"}}>{this.state.errors["subject_line"]}</span> <br/>
                            <span className = "formFields">Subject Line:</span><span className="required">*</span> 
                            <Form.Field>
                                <Input 
                                    name = "Subject"
                                    placeholder= "Subject Line"
                                    value={this.state.subject_line}
                                    onChange={event => this.handleChangeSubject(event)}
                                />
                            </Form.Field>
                            <span style={{color: "red"}}>{this.state.errors["description"]}</span> <br/>
                            <span className = "formFields">Description (max 1000 characters):</span><span className="required">*</span><MuiThemeProvider theme={theme}><Tooltip placement='right' title="Describe your event below. We recommend you include dates, pricing, and event logistics"><InfoIcon/></Tooltip></MuiThemeProvider>
                            <Form.Field>
                                <Form.TextArea
                                    name = "Description"
                                    maxLength = "1000"
                                    placeholder= "Write your post here"
                                    value={this.state.description}
                                    onChange={event => this.handleChangeDescription(event)}
                                />
                            </Form.Field>
                            <span style={{color: "red"}}>{this.state.errors["specialty"]}</span> <br />
                            <span className = "formFields">Looking For:</span><span className="required">*</span> 
                            <Form.Field>
                            <Dropdown 
                                placeholder='Select a Specialty'
                                name="specialty"
                                onChange={this.handleChange}
                                selection 
                                options={options} 
                                value={value}
                                />
                            </Form.Field>
                            <span style={{color: "red"}}>{this.state.errors["email"]}</span> <br/>
                            <span className = "formFields">Contact Email:</span><span className="required">*</span> 
                            <Form.Field>
                                <Input 
                                    name = "Email"
                                    placeholder= "Email"
                                    value={this.state.email}
                                    onChange={event => this.handleChangeEmail(event)}
                                />
                            </Form.Field>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button negative onClick={this.handleClose.bind(this)}>Discard</Button>
                        <Button color='blue' positive onClick={this.handleSubmit.bind(this)}>Submit</Button>
                    </Modal.Footer>
                </Modal>
                <div className="CreateProfileText" style={{marginTop: 40, marginBottom:-15}}>
                    Feed
                    <br/>
                    <br/>
                    <span className= "feedDescription">Welcome to our Feed! This is a space for visitors of our website to make job postings for all photographers, editors, and videographers to see. <br/>In addition, to ensure greater connection between our users, we notify all of our artists (that satify the required expertise and have allowed email notification) of your job posting.<br/> Note: Remember to delete your post after finding a match! Posts will be deleted after 90 days.</span> <br/> <br/>
                    <FormControl style = {{minWidth: "75px"}}>
                        <InputLabel id="filter-label" >Filter By</InputLabel>
                        <Select
                            labelId="filter-label"
                            onChange = {this.handleFilterChange}
                            value = {this.state.filter}
                            >
                            <MenuItem value={"All"}> All </MenuItem>
                            <MenuItem value={"photographers"}> Photographers </MenuItem>
                            <MenuItem value={"videographers"}> Videographers </MenuItem> 
                            <MenuItem value={"editors"}> Editors </MenuItem>
                            <MenuItem value={"mypost"}> My Posts </MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl style = {{minWidth: "75px"}}>
                        <InputLabel id="sort-label">Sort By</InputLabel>
                        <Select
                            labelId="sort-label"
                            onChange = {this.handleSortChange}
                            value = {this.state.sort}
                            >
                            <MenuItem value={"newest"}> Newest </MenuItem>
                            <MenuItem value={"oldest"}> Oldest </MenuItem> 
                        </Select>
                    </FormControl>
                </div>
                
                <div style={{textAlign: 'center', marginTop: 30, marginBottom: 10}}> 
                    <Button2 startIcon={<CreateIcon/>} disableRipple className='removeOutline' onClick={() => this.showModalPost()}>Write a post</Button2>
                </div>
                
                {this.state.filteredPosts.map(post => {
                    return (
                        <Card variant="outlined" style={{width: "65%", marginBottom: 10, margin: 'auto', borderRadius:"0%"}}>
                            <CardContent>
                                <Grid container className="reviewGrid">
                                    <Grid item xs={11}>
                                        <Typography color="secondary">{post.netid}</Typography>
                                    </Grid>
                                    <Grid item xs={1}>
                                    <div style={{textAlign: 'right'}}>
                                    {post.netid === this.props.netid ? 
                                    <Tooltip title="Delete Post">
                                        <IconButton aria-label="delete review" onClick={() => this.showModalDelete(post)}>
                                            <ClearIcon />
                                        </IconButton>
                                    </Tooltip> : null
                                    }
                                    </div>
                                    </Grid>
                                </Grid>
                                <Typography variant="h5" style={{whiteSpace: 'pre-line'}}>{post.subject_line}</Typography>
                                <br />
                                <Typography style={{whiteSpace: 'pre-line'}}>{post.description}</Typography>
                                <br />
                                <Typography color="secondary" style={{whiteSpace: 'pre-line'}}>Contact: {post.email}</Typography>
                                <Typography color="secondary" style={{whiteSpace: 'pre-line'}}>Looking for: {post.specialty}</Typography>
                                <Typography style={{textAlign: 'right'}} color="secondary">{post.timestamp}</Typography>

                            </CardContent>
                        </Card>
                    );
                })}
                <br/>
                <br/>
            </div>
        )
    }
}

export default FeedPage
