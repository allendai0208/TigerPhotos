import React from 'react'
import Typography from '@material-ui/core/Typography'
import ActiveGallery from './ActiveGallery'
import Divider from '@material-ui/core/Divider'

class ActiveProfile extends React.Component{

    render() {
        return (
            <div>
                <Typography variant="h2" className="selectedName">
                    {this.props.selectedPhotographer.first_name} {this.props.selectedPhotographer.last_name}
                </Typography>
                <Divider />
                <Typography variant="h5"> 
                    {this.props.selectedPhotographer.email}
                </Typography>
                <br/>
                <Typography variant="h5"> 
                    {this.props.selectedPhotographer.description}
                </Typography>
                <br />  
                <ActiveGallery />
            </div>
        )
    }
}

export default ActiveProfile