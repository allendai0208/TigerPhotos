import React from 'react';
import { Form, Rating, Button } from 'semantic-ui-react';
import {Modal} from 'react-bootstrap'
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';


// Form for users to leave reviews on selected photographers 

class ReviewForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            review: "",
            rating: 0,
            errors: {},
            message: "",
            show: false,
            disabled: false
        }
    } 

    // If the user has a review in the database for this photographer, updates message to let them know they are editting and 
    // prefills review with their old one
    // If user has started writing a review and navigated away, prefills review with what they originally had
    componentDidMount() {
        if(this.props.user_netid === this.props.photographer_netid) {
            this.setState({
                disabled: true,
                message: "Sorry! You cannot leave a review for yourself."
            })
        }
        if(this.props.oldReview === true) {
            this.setState({
                message: "You are updating your old review. Your old review will not be saved."
            })
        }
        if (this.props.current_review !== "" ) {
            this.setState({
                review: this.props.current_review
            })
            this.props.handler1(this.props.current_review)
        }
        if (this.props.current_rating !== 0) {
            this.setState({
                rating: this.props.current_rating
            })
            this.props.handler2(this.props.current_rating)
        }
    }

    // ensures text area isn't empty upon submission
    handleValidation() {
        let formIsValid = true; 
        let errors={}
        const review = this.state.review

        if(!review) {
            formIsValid = false
            errors["review"] = "Cannot be empty"
        }

        this.setState({errors:errors})
        return formIsValid 
    }

    // when submit is clicked, handles validation and deletes old review if there is one and adds new one to database 
    handleSubmit() {
        if(this.handleValidation()) {
            const user_netid = this.props.user_netid
            const photographer_netid = this.props.photographer_netid
            const review = this.state.review
            const rating = this.state.rating
            fetch("/api/createReview", {
                method: "POST",
                headers: {
                  "content_type":"application/json"
                },
                body: JSON.stringify({user_netid : user_netid,
                                      photographer_netid : photographer_netid,
                                      review : review,
                                      rating : rating})
            }).then (
                window.location.reload()
            )
            .catch(function(error) {
                console.log(error)
             });
             this.setState({
                review: ""
            })
            
        }
    }

    // when text area is changed, sends the data to parent, ActiveProfile so it will be saved if user navigates away 
    handleChange(event) {
        this.setState({
            review: event.target.value
        })
        this.props.handler1(event.target.value)
    }

    // does the same for rating
    handleRate(_, data) {
        this.setState({
            rating: data.rating
        })
        this.props.handler2(data.rating)
    }

    // if delete icon is clicked, deletes old review from database and updates message for user 
    handleDelete() {
        const user_netid = this.props.user_netid
        const photographer_netid = this.props.photographer_netid
        const review = this.state.review
        const rating = this.state.rating
        fetch("/api/deleteReview", {
            method: "POST",
            headers: {
              "content_type":"application/json"
            },
            body: JSON.stringify({user_netid : user_netid,
                                  photographer_netid : photographer_netid,
                                  review : review,
                                  rating : rating})
        })
        .catch(function(error) {
            console.log(error)
         });
         this.setState({
            review: "",
            rating: 0,
            show: false,
            message: 'Your review has been deleted.'
        })
        window.location.reload()
    }

    // renders form with text input and rating, along with delete icon button 
    render() {
        return (
            <div>
                <Modal show={this.state.show} onHide={() => this.setState({show: false})}>
                    <Modal.Header closeButton>
                        Confirm Deletion
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete your review?</Modal.Body>
                    <Modal.Footer>
                        <Button negative onClick={() => this.setState({show: false})}>no</Button>
                        <Button positive onClick={() => this.handleDelete()}>yes</Button>
                    </Modal.Footer>
                </Modal>
                <Form className="reviewForm">
                    <div style={{marginBottom: 5, color: "grey"}}>{this.state.message}</div>
                    <span style={{color: "red"}}>{this.state.errors["review"]}</span>
                    <Form.Field>
                        <Form.TextArea disabled={this.state.disabled}
                            maxLength="750"
                            className="reviewDescription"
                            placeholder="Write your review (max 750 characters)" 
                            value={this.state.review} 
                            onChange={event => this.handleChange(event)}
                        />
                    </Form.Field> 
                    <Grid container className="reviewGrid">
                        <Grid item xs={11}>
                            <Form.Field>
                                <Rating disabled={this.state.disabled}
                                    icon="star"
                                    rating={this.state.rating}
                                    maxRating={5}
                                    onRate={(_, data) => this.handleRate(_, data)}
                                />
                            </Form.Field>
                        </Grid>
                        <Grid item xs={1}>
                            <div style={{textAlign: 'right'}}>
                            <Form.Field>
                                <Tooltip title="Delete">
                                    <IconButton aria-label="delete review" onClick={() => this.setState({show: true})}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </Form.Field>
                            </div>
                        </Grid>
                    </Grid>
                    <Form.Field>
                        <Button disabled={this.state.disabled} onClick={this.handleSubmit.bind(this)}>
                            Save
                        </Button>
                    </Form.Field>
                </Form>
            </div>
        )
    }
}

export default ReviewForm

