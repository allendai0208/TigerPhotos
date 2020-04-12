import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import {Link} from 'react-router-dom'
import ActiveProfile from './ActiveProfile.js'

// MUI stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const styles = {
    card: {
        display: 'flex',
    },
    image: {
        minWidth: 200,
        minHeight: 150,
        objectFit: 'cover'
    },
}


class Profiles extends React.Component {

    render() {
        const {classes, photographer : {first_name, last_name, description}} = this.props
        return (
            <div>
                <Card className={classes.card} variant="outlined">
                    <ButtonBase className = "cardButton" onClick = {() => this.props.handler(this.props.photographer)}>
                        <CardMedia image={require("./pictures/Allen2.JPG")} title = "Profile image" className={classes.image} />
                        <CardContent class={classes.content}>
                            <Typography variant="h5" >
                                {first_name+" "+last_name}
                            </Typography>
                            <Typography variant="body1">
                                {description}
                            </Typography>
                        </CardContent>
                    </ButtonBase>
                </Card>  
            </div>
            
        )
    }
}

export default withStyles(styles)(Profiles);