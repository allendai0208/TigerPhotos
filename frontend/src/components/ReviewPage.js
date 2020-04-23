// This component is not used
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import {Rating} from 'semantic-ui-react'

// This component renders cards that contain the reviews for the selected photographer 

export const ReviewPage = ({ reviews }) => {
    return(
        <div> 
            <Typography variant="h5" gutterBottom style={{paddingTop: 10}}>
                Reviews
            </Typography>
                
                {reviews.map(review => {
                    return (
                        <Card variant="outlined" style={{width: "75%", marginBottom: 10}}>
                            <CardContent>
                                <Typography  color="secondary">{review.user_netid}</Typography>
                                <Rating icon="star" defaultRating={review.rating} maxRating={5} disabled />
                                <Typography >{review.review}</Typography>
                                {console.log(review)}
                                <Typography style={{textAlign: 'right'}} color="secondary">{review.date}</Typography>
                            </CardContent>
                        </Card>
                    );
                })}
                
            
        </div>
    );
};