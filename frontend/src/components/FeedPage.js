import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent' 
import { Form, Input, Button, Checkbox } from 'semantic-ui-react';

class FeedPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            subject_line: "",
            description:"",
            specialty:"",
            errors: {}
        }
        this.handleChangeSubject = this.handleChangeSubject.bind(this)
        this.handleChangeDescription = this.handleChangeDescription.bind(this)
        this.handleChangeSpecialty = this.handleChangeSpecialty.bind(this)
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

        this.setState({errors:errors})
        return formIsValid 
    }

    handleSubmit() {
        if (this.handleValidation()) {
            const netid = this.props.netid
            const subject_line = this.state.subject_line
            const description = this.state.description
            const specialty = this.state.specialty
            const post = {netid, subject_line, description, specialty};
            fetch('/api/createPost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify(post)
            });
        }
    }

    render() {
        return(
            <div>
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
                        <Input 
                            name = "Description"
                            placeholder= "Write your post here"
                            value={this.state.description}
                            onChange={event => this.handleChangeDescription(event)}
                        />
                    </Form.Field>
                    <span style={{color: "red"}}>{this.state.errors["review"]}</span>
                    <Form.Field>
                        <Input 
                            name = "Specialty"
                            placeholder= "Specialty"
                            value={this.state.specialty}
                            onChange={event => this.handleChangeSpecialty(event)}
                        />
                    </Form.Field>
                    <Button onClick={this.handleSubmit.bind(this)}>Submit</Button>
                </Form>
                <br/>
                <p className="CreateProfileText" style={{marginTop: 40}}>Feed</p>
                {this.state.posts.map(post => {
                    return (
                        <Card variant="outlined" style={{width: "75%", marginBottom: 10}}>
                            <CardContent>
                                <Typography  color="secondary">{post.netid}</Typography>
                                <Typography style={{whiteSpace: 'pre-line'}}>{post.subject_line}</Typography>
                                <Typography style={{whiteSpace: 'pre-line'}}>{post.description}</Typography>
                                <Typography style={{textAlign: 'right'}} color="secondary">{post.timestamp}</Typography>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        )
    }
}

export default FeedPage