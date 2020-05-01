// This component is the only component that renders the about us page.
// It is resizable through the react bootstrap grid, and contains hardcoded pictures of us in the pictures folder
import React from "react"
import keith from './pictures/keithPicture.JPG'
import alicia from './pictures/aliciaPicture.jpg'
import aaron from './pictures/aaronPicture.jpg'
import allen from './pictures/allenPicture2.jpg'
import mwad from './pictures/mwadPicture.jpg'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import logo from "./pictures/tigerLogo.png"
import {FeedbackModal} from './FeedbackModal'
import MailIcon from '@material-ui/icons/Mail'
import Button from '@material-ui/core/Button'


class AboutUs extends React.Component {

   constructor(props) {
       super(props)

       this.state = {
       UploadEmailShow: false
       }

       
   }

    handleClose(){
        this.setState({UploadEmailShow: false});
    }  

    handleShow() {
        this.setState({UploadEmailShow: true});
    }

    render() {   
        return (
            <div>
                <br/>
                <p className = "aboutHeader">About TigerPhotos</p>
                <p className = 'aboutParagraph'> 
                    Test TigerPhotos is a centralized location to hire student photographers, videographers, and video editors for student jobs around campus.
                </p>
                <p className = 'aboutParagraph'>
                    TigerPhotos was originally built by a group of students as their final project for COS 333: Advanced Programming Techniques taught by Robert Dondero in Spring 2020.
                </p>
                <p className= 'aboutParagraph'><Button startIcon={<MailIcon/>} color='primary' onClick={this.handleShow.bind(this)} >Contact Us</Button>
                </p>
                <p className = 'aboutHeader'>Original Team</p>
                <div  className = "aboutGrid">
                    <Container fluid>
                        <Row>
                            <Col>
                                <img className = "aboutImage" src = {keith} alt = ""></img>
                                <p className = "aboutName">Keith Register</p>
                                <p className = "aboutJob">Front end</p>
                                <p className = "aboutParagraph">Hi! I'm from New Jersey and I like to play soccer, basketball, and volleyball in my free time. I am also better than Aaron at Smash Bros.</p>
                            </Col>
                            <Col>
                                <img className = "aboutImage" src = {aaron} alt = ""></img>
                                <p className = "aboutName">Aaron Nguyen</p>
                                <p className = "aboutJob">Back end</p>
                                <p className = "aboutParagraph">Hey! I'm from Sacramento, CA. I like to go to the gym and play video games such as League of Legends and Super Smash Bros in my free time.</p>
                            </Col>
                            <Col>
                                <img className = "aboutImage" src = {allen} alt = ""></img>
                                <p className = "aboutName">Allen Dai</p>
                                <p className = "aboutJob">Back end</p>
                                <p className = "aboutParagraph">Hey there! A little bit about me, I like to cook, watch random Youtube videos, and play games in my free time.</p>
                            </Col>
                            <Col>
                                <img className = "aboutImage" src = {alicia} alt = ""></img>
                                <p className = "aboutName">Alicia Liu</p>
                                <p className = "aboutJob">Front end</p>
                                <p className = "aboutParagraph">I'm from Seattle, Washington and I like to hang out with Allen in my free time.</p>
                            </Col>
                            <Col>
                                <img className = "aboutImage" src = {mwad} alt = ""></img>
                                <p className = "aboutName">Mwad Saleh</p>
                                <p className = "aboutJob">Back end</p>
                                <p className = "aboutParagraph">I am from Libya and I used to play soccer in my free time before my knee blew out.</p>
                            </Col>
                        </Row>
                    </Container>
                    
                    <FeedbackModal  show = {this.state.UploadEmailShow} onHide = {this.handleClose.bind(this)}/>

                    
                </div>
                <img className = "tigerLogo" src = {logo} alt = ""></img>
                <br/>
            </div>
            
        )
    }
}
export default AboutUs