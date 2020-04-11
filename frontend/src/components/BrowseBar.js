import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import { sizing } from '@material-ui/system';
import Typography from '@material-ui/core/Typography';

export const BrowseBar = ({ photographers }) => {
    return(
        <div>
            <Typography variant="h5" gutterBottom>
                Photographers
            </Typography>
            <List height="100%" width={300}> 
                {photographers.map(photographer => {
                    return (
                        <ListItem divider alignItems="flex-start" button >
                        <ListItemAvatar>
                        <Avatar alt="Profile Picture" src={require("./pictures/Allen2.JPG")} />
                        </ListItemAvatar>
                        <ListItemText primary={photographer.first_name + " " + photographer.last_name} secondary={photographer.description} />
                    </ListItem> 
                    );
                })}
            </List>
        </div>
    );
};