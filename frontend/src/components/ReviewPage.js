// This component is not used
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import {Rating} from 'semantic-ui-react'

// This component renders cards that contain the reviews for the selected photographer 


export const ReviewPage = ({ reviews }) => {
    const show = reviews.length 
    if(show === 0) {
        return(
            <div style={{marginTop: 25}}>
                <Typography style={{fontSize: 20, color:'gray'}}> No Reviews Yet</Typography>
            </div>
        )
    }
    else {
        return(
            <div> 
                <Typography variant="h5" gutterBottom style={{paddingTop: 10}}>
                    Reviews
                </Typography>
                {reviews.map(review => {
                    return (
                        <Card variant="outlined" style={{width: "75%", marginBottom: 10}}>
                            <CardContent className="wrappedText">
                                <Typography  color="secondary">{review.user_netid}</Typography>
                                <Rating icon="star" defaultRating={review.rating} maxRating={5} disabled />
                                <Typography style={{whiteSpace: 'pre-line'}}>{review.review}</Typography>
                                <Typography style={{textAlign: 'right'}} color="secondary">{review.date}</Typography>
                            </CardContent>
                        </Card>
                    );
                })}    
            </div>
        )
    }
};