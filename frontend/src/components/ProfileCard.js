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
        maxHeight: 150,
        borderRadius:"0%",
        width: "inherit",
        alignItems: 'stretch'
    },
    image: {
        minWidth: 200,
        minHeight: 150,
        objectFit: 'cover'
    },
    content: {
        width: "100%",
        textAlign:'left',
        margin: 10,
    }
}


class ProfileCard extends React.Component {

    render() {
        const {classes, photographer : {first_name, last_name, description, profile_pic}} = this.props
        console.log(this.props.photographer)
        console.log(this.props.photographer.profile_pic)
        return (
            <div>
                <ButtonBase onClick = {() => this.props.handler(this.props.photographer, true)}>
                <Card className={classes.card} variant="outlined">
                <CardMedia image={profile_pic} title = "Profile image" className={classes.image} />
                        <CardContent class={classes.content}>
                            <Typography variant="h5" style = {{color:"orange"}}>
                                {first_name+" "+last_name}
                            </Typography>
                            <Typography variant="body1">
                                {description}
                            </Typography>
                        </CardContent>
                    </Card>  
                </ButtonBase>
            </div>
            
        )
    }
}

export default withStyles(styles)(ProfileCard);

// 