// This component renders the information pertaining to the most recently clicked ProfileCard.
import React from 'react'
import Typography from '@material-ui/core/Typography'
import ActiveGallery from './ActiveGallery'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import ReviewForm from './ReviewForm'
import {ReviewPage} from './ReviewPage'
import StarIcon from '@material-ui/icons/Star'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'

class ActiveProfile extends React.Component{

    constructor(props) {
        super(props)

        // if 0 displays about, if 1 displays reviews, if 2 displays write review, if 3 displays contact
        this.state = {
            page_id:0,
            current_review: "" ,
            current_rating: 0,
            loaded: false,
            switched: false,
            button_1: 'primary', 
            button_2: 'secondary', 
            button_3: 'secondary', 
            button_4: 'secondary', 
            selectedPhotographer: this.props.selectedPhotographer
        }
        this.handleClick = this.handleClick.bind(this)
        this.handler = this.handler.bind(this)
        this.handler2 = this.handler2.bind(this)
        this.setReview = this.setReview.bind(this)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.selectedPhotographer !== prevState.selectedPhotographer ) {
            console.log("changed")
            console.log(nextProps.selectedPhotographer)
            console.log(prevState.selectedPhotographer)
            return {selectedPhotographer: nextProps.selectedPhotographer, 
                    page_id: 0, 
                    loaded: false, 
                    current_review: "", 
                    current_rating: 0,
                    button_1: 'primary',
                    button_2: 'secondary',
                    button_3: 'secondary'
                };
        }
    }

    //componentWillReceiveProps(newProps) {
    //    const oldProps = this.props
    //    if(oldProps.selectedPhotographer !== newProps.selectedPhotographer) {
    //        console.log("here")
    //        console.log(this.state.current_review)
    //        this.setState({page_id:0, loaded: false, current_review:"", current_rating: 0})
    //    }
    //}

    // sets page_id to corresponding number when button is clicked
    handleClick(i) {
        this.setState({
            page_id: i,
            switched: false
        })
        if(i === 0) {
            this.setState({button_1: 'primary', button_2: 'secondary', button_3: 'secondary', button_4: 'secondary'})
        }
        else if(i === 1) {
            this.setState({button_1: 'secondary', button_2: 'primary', button_3: 'secondary', button_4: 'secondary'})
        }
        else {
            this.setState({button_1: 'secondary', button_2: 'secondary', button_3: 'primary', button_4: 'secondary'})
        }
    }

    // used so review is saved when user navigates using buttons
    handler(arg1) {
        this.setState({
          current_review:arg1
        })
    }

    // used so rating is saved when user navigates using buttons
    handler2(arg1) {
        this.setState({
          current_rating: arg1
        })
    }

    // if netid has a review for selected photographer, preloads it into the state to pass to ReviewForm
    setReview = (old_review) => {
        this.setState({
            current_review: old_review["review"],
            current_rating: old_review["rating"],
            loaded: true
        })   
    }

    render() {
        let page = null
        if (this.state.page_id === 0) {
            page = (
                <div>
                    <Typography variant="h5" className="browse_description">
                        Website:
                    </Typography>
                    <a target='_blank' href={this.props.selectedPhotographer.website_url}>website</a>
                    <br />
                    <Typography variant="h5" className="browse_description">
                        Description:
                    </Typography >
                    <Typography style={{whiteSpace: 'pre-line'}} >
                        {this.props.selectedPhotographer.description}
                    </Typography>
                    <br/>
                    <Typography variant="h5" className="browse_description">
                        Equipment:
                    </Typography>
                    <Typography style={{whiteSpace: 'pre-line'}}>
                        {this.props.selectedPhotographer.equipment}
                    </Typography>
                    <br/>
                    <Typography variant="h5" className="browse_description">
                        Gallery:
                    </Typography>
                    <ActiveGallery urls = {this.props.selectedPhotographer.urls}/>
                </div>
            )
            
        }
        else if (this.state.page_id === 1) {
            page = (
                <ReviewPage reviews={this.props.selectedPhotographer.reviews} />
            )
            
        }
        else if (this.state.page_id === 2) {
            let old_review = this.props.selectedPhotographer.reviews.filter(d => d.user_netid === this.props.user_netid)[0]
            if(old_review !== undefined && this.state.loaded === false) {
                page = (
                    <ReviewForm 
                        photographer_netid={this.props.selectedPhotographer.photographer_netid} 
                        user_netid={this.props.user_netid} 
                        current_review={old_review["review"]}
                        current_rating={old_review["rating"]}
                        handler1={this.handler}
                        handler2={this.handler2}
                        oldReview={true}/>
                )
                this.setState({
                    loaded: true,
                    
                })
            }
            else {
                page = (
                    <ReviewForm 
                        photographer_netid={this.props.selectedPhotographer.photographer_netid} 
                        user_netid={this.props.user_netid} 
                        current_review={this.state.current_review} 
                        current_rating={this.state.current_rating}
                        handler1={this.handler}
                        handler2={this.handler2}
                        oldReview={this.state.loaded}/>
                )
                
            }
        }
        // renders the heading and about information when first loaded 
        return (
            <div>
                <div className="browse_header">
                    <Typography variant="h3" className="selectedName" fontWeight="fontWeightMedium">
                        {this.props.selectedPhotographer.first_name} {this.props.selectedPhotographer.last_name}
                    </Typography>
                    <Button startIcon={<AssignmentIndIcon/>} disableRipple className='removeOutline' color={this.state.button_1} onClick={() => this.handleClick(0)}>About</Button>
                    <Button startIcon={<QuestionAnswerIcon/>} disableRipple className='removeOutline' color={this.state.button_2} onClick={() => this.handleClick(1)}>Reviews</Button>
                    <Button startIcon={<StarIcon/>} disableRipple className='removeOutline' color={this.state.button_3} onClick={() => this.handleClick(2)}>Leave a Review</Button>
                    <Divider/>
                </div>
                {page}
            </div>
        )
    }
}

export default ActiveProfile

//<FbImageLibrary images={this.props.selectedPhotographer.urls}/>
//import FbImageLibrary from 'react-fb-image-grid'

//<ActiveGallery urls = {this.props.selectedPhotographer.urls}/>

/*             if (old_review !== undefined && this.state.loaded === false) {
                console.log(old_review["review"])
                console.log(old_review["rating"])
                this.setReview(old_review)
            }
            page = (
                <ReviewForm 
                    photographer_netid={this.props.selectedPhotographer.photographer_netid} 
                    user_netid={this.props.user_netid} 
                    current_review={this.state.current_review} 
                    current_rating={this.state.current_rating}
                    handler1={this.handler}
                    handler2={this.handler2}/>
            ) */ 

/*                 <Typography variant="h5"> 
                    {this.props.selectedPhotographer.email}
                </Typography>
                <br/>
                <Typography variant="h5"> 
                    {this.props.selectedPhotographer.description}
                </Typography>
                <br />  
                <ActiveGallery urls = {this.props.selectedPhotographer.urls}/> */ 