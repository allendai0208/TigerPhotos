// This component renders the information pertaining to the most recently clicked ProfileCard.
import React from 'react'
import Typography from '@material-ui/core/Typography'
import ActiveGallery from './ActiveGallery'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import ReviewForm from './ReviewForm'

class ActiveProfile extends React.Component{

    constructor(props) {
        super(props)

        // if 0 displays about, if 1 displays reviews, if 2 displays write review, if 3 displays contact
        this.state = {
            page_id:0
        }
        this.handleClick = this.handleClick.bind(this)

    }

    handleClick(i) {
        this.setState({
            page_id: i
        })
        console.log("this is the state" + this.state.page_id)
        console.log(i)
    }

    render() {
        let page = null
        if (this.state.page_id === 0) {
            page = (
                <div>
                    <Typography variant="h5" className="browse_description">
                        {this.props.selectedPhotographer.description}
                    </Typography>
                    <ActiveGallery urls = {this.props.selectedPhotographer.urls}/>
                </div>
            )
        }
        else if (this.state.page_id === 1) {
            this.props.selectedPhotographer.reviews.map() =>
            page = (
                <div>hi</div>
            )
        }
        else if (this.state.page_id === 2) {
            console.log("user netid is " + this.props.user_netid)
            page = (
                <ReviewForm photographer_netid={this.props.selectedPhotographer.photographer_netid} user_netid = {this.props.user_netid}/>
            )
        }

        return (
            <div>
                <div className="browse_header">
                    <Typography variant="h3" className="selectedName" fontWeight="fontWeightMedium">
                        {this.props.selectedPhotographer.first_name} {this.props.selectedPhotographer.last_name}
                    </Typography>
                    <Button color="secondary" onClick={() => this.handleClick(0)}>About</Button>
                    <Button color="secondary" onClick={() => this.handleClick(1)}>Reviews</Button>
                    <Button color="secondary" onClick={() => this.handleClick(2)}>Leave a Review</Button>
                    <Button color="secondary" onClick={() => this.handleClick(3)}>Contact</Button>
                    <Divider/>
                </div>
            {page}

            </div>
        )
    }
}

export default ActiveProfile

/*                 <Typography variant="h5"> 
                    {this.props.selectedPhotographer.email}
                </Typography>
                <br/>
                <Typography variant="h5"> 
                    {this.props.selectedPhotographer.description}
                </Typography>
                <br />  
                <ActiveGallery urls = {this.props.selectedPhotographer.urls}/> */ 