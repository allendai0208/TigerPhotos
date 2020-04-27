import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent' 
import { Form, Input, Modal, Button } from 'semantic-ui-react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import { Dropdown } from 'semantic-ui-react'
import CreateIcon from '@material-ui/icons/Create';
import Button2 from '@material-ui/core/Button'

class FeedPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            posts: [],
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
        this.showModalDelete = this.showModalDelete.bind(this)
    }

    fetchPosts = () => {
        fetch('/api/getPosts')
        .then(response => response.json())
        .then(result => this.setState({
          posts: result.posts
        }))
        .then(console.log(this.state.posts))
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
            fetch('/api/createPost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify(post)
            });
            window.location.reload()
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
                <Modal className="deleteModal" size='small' open={this.state.showDelete} onHide={() => this.setState({showDelete: false})}>
                    <Modal.Header>
                            Confirm Deletion
                    </Modal.Header>
                    <Modal.Content>Are you sure you want to delete your post?</Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={() => this.setState({showDelete: false})}>no</Button>
                        <Button positive onClick={() => this.handleDelete()}>yes</Button>
                    </Modal.Actions>
                </Modal>
                <Modal className="postModal" size='small' open={this.state.showPost} onHide={() => this.setState({showPost: false})}>
                    <Modal.Header>
                        Create your post
                    </Modal.Header>
                    <Modal.Content>
                        <Form>
                            <span style={{color: "red"}}>{this.state.errors["subject_line"]}</span>
                            <Form.Field>
                                <Input 
                                    name = "Subject"
                                    placeholder= "Subject Line"
                                    value={this.state.subject_line}
                                    onChange={event => this.handleChangeSubject(event)}
                                />
                            </Form.Field>
                            <span style={{color: "red"}}>{this.state.errors["description"]}</span>
                            <Form.Field>
                                <Form.TextArea
                                    name = "Description"
                                    placeholder= "Write your post here"
                                    value={this.state.description}
                                    onChange={event => this.handleChangeDescription(event)}
                                />
                            </Form.Field>
                            <span style={{color: "red"}}>{this.state.errors["review"]}</span>
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
                            <Form.Field>
                                <Input 
                                    name = "Email"
                                    placeholder= "Email"
                                    value={this.state.email}
                                    onChange={event => this.handleChangeEmail(event)}
                                />
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={() => this.setState({showPost: false})}>Discard</Button>
                        <Button positive onClick={this.handleSubmit.bind(this)}>Submit</Button>
                    </Modal.Actions>
                </Modal>
                <div className="CreateProfileText" style={{marginTop: 40}}>Feed</div>
                <div style={{textAlign: 'center', marginTop: 30, marginBottom: 10}}> 
                    <Button2 startIcon={<CreateIcon/>} disableRipple className='removeOutline' onClick={() => this.showModalPost()}>Write a post</Button2>
                </div>
                
                {this.state.posts.map(post => {
                    return (
                        <Card variant="outlined" style={{width: "65%", marginBottom: 10, margin: 'auto'}}>
                            <CardContent>
                                <Typography color="secondary">{post.netid}</Typography>
                                <Typography variant="h5" style={{whiteSpace: 'pre-line'}}>{post.subject_line}</Typography>
                                <br />
                                <Typography style={{whiteSpace: 'pre-line'}}>{post.description}</Typography>
                                <br />
                                <Typography color="secondary" style={{whiteSpace: 'pre-line'}}>Contact: {post.email}</Typography>
                                <Typography color="secondary" style={{whiteSpace: 'pre-line'}}>Looking for: {post.specialty}</Typography>
                                <Typography style={{textAlign: 'right'}} color="secondary">{post.timestamp}</Typography>
                                <div style={{textAlign: 'right'}}>
                                {post.netid == this.props.netid ? 
                                <Tooltip title="Delete Post">
                                    <IconButton aria-label="delete review" onClick={() => this.showModalDelete(post)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip> : null
                                }
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        )
    }
}

export default FeedPage