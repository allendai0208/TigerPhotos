import React from 'react'
import Typography from '@material-ui/core/Typography'
import ActiveGallery from './ActiveGallery'

class ActiveProfile extends React.Component{

    render() {
        return (
            <div>
                <Typography variant="h2">
                    {this.props.selectedPhotographer.first_name} {this.props.selectedPhotographer.last_name}
                </Typography>
                <br/>
                <Typography variant="h5"> 
                    {this.props.selectedPhotographer.email}
                </Typography>
                <br/>
                <Typography variant="h5"> 
                    {this.props.selectedPhotographer.description}
                </Typography>  
                
            </div>
        )
    }
}

export default ActiveProfile