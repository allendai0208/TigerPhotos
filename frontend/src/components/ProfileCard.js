// This component renders the card for a photographer, information about the photographer is passed in as props from BrowsePage
import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

// MUI stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const styles = {
    card: {
        display: 'flex',
        height: "150px",
        borderRadius:"0%",
        width: "100%",
        justifyContent: 'center',
    },
    image: {
        marginTop: "15px",
        marginLeft: "10px",
        marginRight: "10px",
        height: '75%',
        width: "190px",
        borderRadius:"50%",
    },
    content: {
        width: "100%",
        textAlign:'left',
        marginTop: "15px",
        margin: 10,
    }
}


class ProfileCard extends React.Component {

    render() {
        const {classes, photographer : {first_name, last_name, profile_pic}} = this.props
        return (
            <div className="card column">
                <ButtonBase onClick = {() => this.props.handler(this.props.photographer, true)}>
                <Card className={classes.card} variant="outlined">
                <CardMedia image={profile_pic} title = "Profile image" className={classes.image} />
                        <CardContent className={classes.content}>
                            <Typography variant="h5" style = {{color:"orange"}}>
                                {first_name+" "+last_name}
                            </Typography>
                            <Typography variant="body1">
                                {this.props.photographer.email}
                            </Typography>
                        </CardContent>
                    </Card>  
                </ButtonBase>
            </div>
            
        )
    }
}

export default withStyles(styles)(ProfileCard);
 