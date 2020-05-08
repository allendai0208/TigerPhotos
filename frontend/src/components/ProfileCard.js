// This component renders the card for a photographer, information about the photographer is passed in as props from BrowsePage
import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

// MUI stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera'; 
import VideocamIcon from '@material-ui/icons/Videocam'; 
import PhotoFilterIcon from '@material-ui/icons/PhotoFilter';
import StarIcon from '@material-ui/icons/Star';
import Tooltip from '@material-ui/core/Tooltip'

const styles = {
    card: {
        display: 'flex',
        height: "150px",
        borderRadius:"0%",
        width: '375px'
    },
    image: {
        marginTop: "15px",
        marginLeft: "10px",
        marginRight: "10px",
        height: '75%',
        width: "172px",
        borderRadius:"50%",
    },
    content: {
        width: "100%",
        padding: 7,
        "&:last-child": {
        paddingBottom: 7
        }
    },
    right: {
        textAlign: 'right',
    },
    left: {
        textAlign: 'left'
    }
}

class ProfileCard extends React.Component {

    render() {
        const {classes, photographer : {first_name, last_name, profile_pic}} = this.props
        return (
            <div className="cardColumn">
                <ButtonBase className='removeOutline' onClick = {() => this.props.handler(this.props.photographer, true)}>
                <Card variant="outlined" className={classes.card} >
                    <CardMedia image={profile_pic} title = "Profile image" className={classes.image} />
                    <CardContent className={classes.content}>
                        <Typography variant="body1" m={1} className={classes.right} >
                            {console.log(this.props.photographer.average_rating)}
                            {this.props.photographer.average_rating !== -1 ? <span>{this.props.photographer.average_rating.toFixed(2)}</span> : "N/A"}
                            <Tooltip title="Average Rating"><StarIcon className="starIcon"/></Tooltip>
                        </Typography>
                        <Typography variant="h5" className={classes.left} style = {{color:"orange"}}>
                            {first_name+" "+last_name}
                        </Typography>
                        <Typography variant="body1" className={classes.left}>
                            {this.props.photographer.email}
                            <br/>
                            {this.props.photographer.photography_exp ? <span><Tooltip title="Photography"><PhotoCameraIcon className="browseIcon"/></Tooltip></span> : null}
                            {this.props.photographer.videography_exp ? <span><Tooltip title="Videography"><VideocamIcon className="browseIcon" /></Tooltip></span> : null}
                            {this.props.photographer.editing_exp ? <span><Tooltip title="Editing"><PhotoFilterIcon className="browseIcon" /></Tooltip></span> : null}
                        </Typography>
                    </CardContent>
                </Card>  
                </ButtonBase>
            </div>            
        )
    }
}

export default withStyles(styles)(ProfileCard);