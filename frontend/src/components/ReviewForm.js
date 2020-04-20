// Not used currently
import React, {useState} from 'react';
import { Form, Input, Rating, Button } from 'semantic-ui-react';

export const ReviewForm = ({onNewReview}) => {
    const[netid, setNetid] = useState('');
    const[photographer_netid, setPhotographer] = useState('');
    const[description, setDescription] = useState('');
    const[rating, setRating] = useState(1);

    return (
        <Form>
            <Form.Field>
                <Input 
                    placeholder="netid" 
                    value={netid} 
                    onChange={e => setNetid(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <Input 
                    placeholder="photographer netid" 
                    value={photographer_netid} 
                    onChange={e => setPhotographer(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <Input 
                    placeholder="description" 
                    value={description} 
                    onChange={e => setDescription(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <Rating 
                    icon="star"
                    rating={rating}
                    maxRating={5}
                    onRate={(_, data) => {
                        setRating(data.rating);
                    }}
                />
            </Form.Field>
            <Form.Field>
                <Button 
                    onClick={ async () => {
                        const review = { netid, photographer_netid, description, rating };
                        const response = await fetch('/api/add_review', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            }, 
                            body: JSON.stringify(review)
                        });
                    
                        if (response.ok) {
                            console.log('response worked');
                            onNewReview(review);
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
    };
