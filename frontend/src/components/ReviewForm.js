
import React, {useState} from 'react';
import { Form, Input, Rating, Button } from 'semantic-ui-react';
import {TextArea} from 'semantic-ui-react';

class ReviewForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            description: "",
            rating: 1
        }
    }

    handleSubmit() {
        const user_netid = this.props.user_netid
        const photo_netid = this.props.photo_netid
        const photo_description = this.props.description
        const photo_review = this.props.review
        console.log(photo_netid)
        console.log(user_netid)
        const review = { user_netid, photo_netid, photo_description, photo_review };
        fetch('/api/add_review', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(review)
        });
    }

    render() {
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
                    <Button onClick={this.handleSubmit.bind(this)}
                        onClick={ async () => {
                            const user_netid = this.props.user_netid
                            const photo_netid = this.props.photo_netid
                            const photo_description = this.props.description
                            const photo_review = this.props.review
                            console.log(photo_netid)
                            console.log(user_netid)
                            const review = { user_netid, photo_netid, photo_description, photo_review };
                            const response = await fetch('/api/add_review', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                }, 
                                body: JSON.stringify(review)
                            });
                        
                        }}
                    >
                        submit
                    </Button>
                </Form.Field>
            </Form>

        )
    }

}

export default ReviewForm

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
