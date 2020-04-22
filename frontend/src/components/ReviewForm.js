import React from 'react';
import { Form, Rating, Button } from 'semantic-ui-react';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

class ReviewForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            review: "",
            rating: 0,
            errors: {},
            message: ""
        }
    } 

    componentDidMount() {
        if (this.props.current_review != "") {
            this.setState({
                review: this.props.current_review,
                rating: this.props.current_rating,
                message: this.props.message
            })
        }
    }

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

    handleSubmit() {
        if (!this.handleValidation()) {
            alert("Form has errors")
        }
        else {
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
            })
            .catch(function(error) {
                console.log(error)
             });
             this.setState({
                review: ""
            })
            alert("Form submitted. Please refresh the page to see your review. ")
        }
    }

    handleChange(event) {
        this.setState({
            review: event.target.value
        })
        this.props.handler1(event.target.value)
    }

    handleRate(_, data) {
        this.setState({
            rating: data.rating
        })
        this.props.handler2(data.rating)
    }

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
    }

    render() {

        return (
            <Form className="reviewForm">
                <div style={{marginBottom: 5, color: "grey"}}>{this.state.message}</div>
                <span style={{color: "red"}}>{this.state.errors["review"]}</span>
                <Form.Field>
                    <Form.TextArea 
                        className="reviewDescription"
                        placeholder="Write your review" 
                        value={this.state.review} 
                        onChange={event => this.handleChange(event)}
                    />
                </Form.Field> 
                <Grid container className="reviewGrid">
                    <Grid item xs={11}>
                        <Form.Field>
                            <Rating 
                                icon="star"
                                rating={this.state.rating}
                                maxRating={5}
                                onRate={(_, data) => this.handleRate(_, data)}
                            />
                        </Form.Field>
                    </Grid>
                    <Grid item xs={1}>
                        <Form.Field>
                            <Tooltip title="Delete">
                                <IconButton aria-label="delete review" onClick={this.handleDelete.bind(this)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        </Form.Field>
                    </Grid>
                </Grid>
                <Form.Field>
                    <Button onClick={this.handleSubmit.bind(this)}>
                        submit
                    </Button>
                </Form.Field>
            </Form>
        )
    }
}

export default ReviewForm

/*                 <Form.Field>
                    <Form.TextArea 
                        className="reviewDescription"
                        placeholder="Write your review" 
                        value={this.state.review} 
                        onChange={event => this.setState({ review: event.target.value })}
                    />
                </Form.Field> 
                                <Form.Field>
                    <Button onClick={this.handleSubmit.bind(this)}>
                        submit
                    </Button>
                </Form.Field>*/ 

/*export const ReviewForm = ({props, onNewReview}) => {
    const[netid, setNetid] = useState('');
    const[photographer_netid, setPhotographer] = useState('');
    const[description, setDescription] = useState('');
    const[rating, setRating] = useState(1);

    const photo_netid = this.props.photographer_netid
    const user_netid = this.props.netid

    return (
        <Form className="reviewForm">
            <Form.Field>
                <TextArea 
                    className="reviewDescription"
                    placeholder="Write your review" 
                    value={this.state.description} 
                    onChange={event => this.setState({ description: event.target.value })}
                />
            </Form.Field>
            <Form.Field>
                <Rating 
                    icon="star"
                    rating={this.state.rating}
                    maxRating={5}
                    onRate={(_, data) => this.setState({ rating: data.rating })}
                />
            </Form.Field>
            <Form.Field>
                <Button 
                    onClick={ async () => {
                        console.log(photo_netid)
                        console.log(user_netid)
                        const review = { user_netid, photo_netid, description, rating };
                        const response = await fetch('/api/add_review', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            }, 
                            body: JSON.stringify(review)
                        });
                    
                        if (response.ok) {
                            console.log('response worked');
                            this.props.onNewReview(review);
                            setNetid('');
                            setPhotographer('');
                            setDescription('');
                            setRating(1);
                        }
                    }}
                >
                    submit
                </Button>
            </Form.Field>
        </Form>
        );
    }; */ 
