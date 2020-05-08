// This component renders the information pertaining to the most recently clicked ProfileCard.
import React from 'react'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import ReviewForm from './ReviewForm'
import {ReviewPage} from './ReviewPage'
import StarIcon from '@material-ui/icons/Star'
import Tooltip from '@material-ui/core/Tooltip'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer'
import CreateIcon from '@material-ui/icons/Create'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'
import CollectionsIcon from '@material-ui/icons/Collections'
import MailIcon from '@material-ui/icons/Mail'
import {EmailModal} from './EmailModal'
import ImageGallery from "./ImageGallery"; 

class ActiveProfile extends React.Component{
    constructor(props) {
        super(props)

        // if 0 displays about, if 1 displays reviews, if 2 displays write review, if 3 displays contact
        this.state = {
            page_id:3,
            current_review: "" ,
            current_rating: 0,
            loaded: false,
            button_1: 'secondary', 
            button_2: 'secondary', 
            button_3: 'secondary', 
            button_4: 'primary', 
            selectedPhotographer: this.props.selectedPhotographer,
            UploadEmailShow: false,
            photos: [],
            photos_loaded: false,
            switched: false
        }
        this.handleClick = this.handleClick.bind(this)
        this.handler = this.handler.bind(this)
        this.handler2 = this.handler2.bind(this)
        this.setReview = this.setReview.bind(this)
    }

    componentDidMount() {
        this.galleryPhotos()
    }

    handleClose(){
        this.setState({UploadEmailShow: false});
    }  
  
    handleShow() {

        this.setState({UploadEmailShow: true});
    }

     static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.selectedPhotographer !== prevState.selectedPhotographer ) {
            console.log("changed")
            console.log(nextProps.selectedPhotographer)
            console.log(prevState.selectedPhotographer)
            return {selectedPhotographer: nextProps.selectedPhotographer, 
                page_id: 3, 
                loaded: false, 
                current_review: "", 
                current_rating: 0,
                button_1: 'secondary',
                button_2: 'secondary',
                button_3: 'secondary',
                button_4: 'primary',
                photos_loaded: false,
                photos: [],
                switched: true
            };
        }
    }

    componentDidUpdate() {
        if(this.state.switched) {
            this.galleryPhotos()
        }
    }

    handleClick(i) {
        this.setState({
            page_id: i
        })
        if(i === 0) {
            this.setState({button_1: 'primary', button_2: 'secondary', button_3: 'secondary', button_4: 'secondary'})
        }
        else if(i === 1) {
            this.setState({button_1: 'secondary', button_2: 'primary', button_3: 'secondary', button_4: 'secondary'})
        }
        else if(i === 2) {
            this.setState({button_1: 'secondary', button_2: 'secondary', button_3: 'primary', button_4: 'secondary'})
        }
        else {
            this.setState({button_1: 'secondary', button_2: 'secondary', button_3: 'secondary', button_4: 'primary'})
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

    addImageProcess(urlImage){
        return new Promise((resolve, reject) => {
            let img = new Image()
            img.src = urlImage
            img.onload = () => resolve({src: urlImage, width:img.width, height:img.height})
            img.onerror = reject
        })
    }

    async galleryPhotos() {
        let self = this
        if(this.props.selectedPhotographer.urls && !this.state.photos_loaded) {
            console.log(this.props.selectedPhotographer.urls)
            const promises = this.props.selectedPhotographer.urls.map(async function(urlImage) {
                const response = await self.addImageProcess(urlImage)
                return response
            })
            const photos = await Promise.all(promises)
            this.setState({photos:photos, photos_loaded: true, switched: false})
        }
    }

    render() {
        let page = null
        if (this.state.page_id === 0) {
            page = (
                <div className="activeProfileBody">
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
                    <Button startIcon={<MailIcon/>} color='primary' onClick={this.handleShow.bind(this)} >Contact</Button>
                    <EmailModal phEmail = {this.props.selectedPhotographer.email} name = {this.props.selectedPhotographer.first_name} show = {this.state.UploadEmailShow} onHide = {this.handleClose.bind(this)}/>
                </div>
            )
        }
        else if (this.state.page_id === 1) {
            page = (
                <div className="activeProfileBody">
                    <ReviewPage reviews={this.props.selectedPhotographer.reviews} />
                    <br/>
                </div>
            )
        }
        else if (this.state.page_id === 2) {
            let old_review = this.props.selectedPhotographer.reviews.filter(d => d.user_netid === this.props.user_netid)[0]
            if(old_review !== undefined && this.state.loaded === false) {
                page = (
                    <div className="activeProfileBody">
                    <ReviewForm 
                        photographer_netid={this.props.selectedPhotographer.photographer_netid} 
                        user_netid={this.props.user_netid} 
                        current_review={old_review["review"]}
                        current_rating={old_review["rating"]}
                        handler1={this.handler}
                        handler2={this.handler2}
                        oldReview={true}/>
                        <br />
                    </div>
                )
                this.setState({
                    loaded: true,
                    
                })
            }
            else {
                page = (
                    <div className="activeProfileBody">
                        <ReviewForm 
                            photographer_netid={this.props.selectedPhotographer.photographer_netid} 
                            user_netid={this.props.user_netid} 
                            current_review={this.state.current_review} 
                            current_rating={this.state.current_rating}
                            handler1={this.handler}
                            handler2={this.handler2}
                            oldReview={this.state.loaded}/>
                            <br/>
                    </div>
                ) 
            }
        }
        else if (this.state.page_id === 3){
            console.log(this.state.photos.length)
            let length = this.state.photos.length
            if (length !== 0 ) {
                page = <ImageGallery photos={this.state.photos} />
            }
            else {
                page=
                <div style={{marginTop: 25, marginLeft: 10}}>
                    <Typography style={{fontSize: 20, color:'gray'}}> No Gallery Available</Typography>
                    <br/>
                </div>  
            }
        }

        let border = ''
        let website = ''
        if (this.props.selectedPhotographer.website_url) {
            border = " | "
            website = "My Website"
        }
        return (
            <div>
                <div className="browse_header">
                    <Typography variant="h3" className="selectedName" fontWeight="fontWeightMedium">
                        {this.props.selectedPhotographer.first_name} {this.props.selectedPhotographer.last_name}
                    </Typography>
                    <Typography variant="h6" className="ratingAndUrl">
                    {this.props.selectedPhotographer.average_rating !== -1 ? <span>{this.props.selectedPhotographer.average_rating.toFixed(2)}</span> : "N/A"} 
                    <Tooltip title="Average Rating"><StarIcon className="starIcon2"/></Tooltip>
                    {border}
                    <a target='_blank' rel="noopener noreferrer" href={this.props.selectedPhotographer.website_url}>{website}</a>
                    </Typography>
                    <Button startIcon={<CollectionsIcon />} disableRipple className='removeOutline' color={this.state.button_4} onClick={() => this.handleClick(3)}>Gallery</Button>
                    <Button startIcon={<AssignmentIndIcon/>} disableRipple className='removeOutline' color={this.state.button_1} onClick={() => this.handleClick(0)}>About</Button>
                    <Button startIcon={<QuestionAnswerIcon/>} disableRipple className='removeOutline' color={this.state.button_2} onClick={() => this.handleClick(1)}>Reviews</Button>
                    <Button startIcon={<CreateIcon/>} disableRipple className='removeOutline' color={this.state.button_3} onClick={() => this.handleClick(2)}>Leave a Review</Button>
                    <Divider/>
                </div>
                {page}
            </div>
        )
    }
}

export default ActiveProfile