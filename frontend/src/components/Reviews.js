// Not being used currently
import React from 'react';
import { List, Rating, Header } from 'semantic-ui-react';

export const Reviews = ({ reviews }) => {
    return(
        <List>
            {reviews.map(review => {
                return (
                      <List.Item key={review.netid}>
                            <Header>reviewer: {review.netid}</Header>
                            <Header>photographer: {review.photographer_netid}</Header>
                            {review.description}
                            <Rating rating={review.rating} maxRating={5} disabled />
                      </List.Item>  
                );
            })}
        </List>
    );
};