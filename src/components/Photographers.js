import React from 'react';
import { List, Header } from 'semantic-ui-react';

export const Photographers = ({ photographers }) => {
    return(
        <List>
            {photographers.map(photographer => {
                return (
                      <List.Item key={photographer.photographer_netid}>
                            <Header>netid: {photographer.photographer_netid}</Header>
                            <Header>first_name: {photographer.first_name}</Header>
                            <Header>last_name: {photographer.last_name}</Header>
                            <Header>email: {photographer.email}</Header>
                            <Header>description: {photographer.description}</Header>
                      </List.Item>  
                );
            })}
        </List>
    );
};