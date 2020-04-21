import React from 'react';
import { Form, Rating, Button } from 'semantic-ui-react';
import {TextArea} from 'semantic-ui-react';

class ReviewForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            review: "",
            rating: 1,
            errors: {}
        }
    } 

    componentDidMount() {
        if (this.props.current_review != "") {
            this.setState({
                review: this.props.current_review
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
            alert("Form submitted")
        }
    }

    handleChange(event) {
        this.setState({
            review: event.target.value
        })
        this.props.handler1(event.target.value)
    }

    render() {
        console.log(this.props.user_netid)

        return (
            <Form className="reviewForm">
                <span style={{color: "red"}}>{this.state.errors["review"]}</span>
                <Form.Field>
                    <Form.TextArea 
                        className="reviewDescription"
                        placeholder="Write your review" 
                        value={this.state.review} 
                        onChange={event => this.setState({ review: event.target.value })}
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
