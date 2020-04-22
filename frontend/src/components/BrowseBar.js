// This component is not used
import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import {Rating} from 'semantic-ui-react'

// This component renders cards that contain the reviews for the selected photographer 

export const BrowseBar = ({ reviews }) => {
    return(
        <div> 
            <Typography variant="h5" gutterBottom style={{paddingTop: 10, textAlign: 'center'}}>
                Reviews
            </Typography>
                
                {reviews.map(review => {
                    return (
                        <Card variant="outlined" style={{marginLeft: 50, marginRight: 50, marginBottom: 10}}>
                            <CardContent>
                                <Typography  color="secondary">{review.user_netid}</Typography>
                                <Rating icon="star" defaultRating={review.rating} maxRating={5} disabled />
                                <Typography variant="h5" >{review.review}</Typography>
                                {console.log(review.date)}
                                <Typography style={{textAlign: 'right'}} color="secondary">{review.date}</Typography>
                            </CardContent>
                        </Card>
                    );
                })}
                
            
        </div>
    );
};