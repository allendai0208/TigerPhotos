import React from "react"
import keith from './pictures/keithPicture.JPG'
import alicia from './pictures/aliciaPicture.jpg'
import aaron from './pictures/aaronPicture.jpg'
import allen from './pictures/allenPicture.jpg'
import mwad from './pictures/mwadPicture.jpg'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import logo from "./pictures/tigerLogo.png"

class AboutUs extends React.Component {

    render() {   
        return (
            <div>
                <br/>
                <p className = "aboutHeader">About TigerPhotos</p>
                <p className = 'aboutParagraph'> 
                    TigerPhotos is a centralized location to hire student photographers, videographers, and video editors for student jobs around campus.
                </p>
                <p className = 'aboutParagraph'>
                    TigerPhotos was originally built by a group of students as their final project for COS 333: Advanced Programming Techniques taught by Robert Dondero in Spring 2020.
                </p>

                <p className = 'aboutHeader'>Original Team</p>
                <div  className = "aboutGrid">
                    <Container fluid>
                        <Row>
                            <Col>
                                <img className = "aboutImage" src = {keith}></img>
                                <p className = "aboutName">Keith Register</p>
                                <p className = "aboutJob">Front end</p>
                                <p className = "aboutParagraph">Hi! I'm from New Jersey and I like to play soccer, basketball, and volleyball in my free time. I am also better than Aaron at Smash Bros.</p>
                            </Col>
                            <Col>
                                <img className = "aboutImage" src = {aaron}></img>
                                <p className = "aboutName">Aaron Nguyen</p>
                                <p className = "aboutJob">Back end</p>
                                <p className = "aboutParagraph">Hey! I'm from Sacramento, CA. I like to go to the gym and play video games such as League of Legends and Super Smash Bros in my free time.</p>
                            </Col>
                            <Col>
                                <img className = "aboutImage" src = {allen}></img>
                                <p className = "aboutName">Allen Dai</p>
                                <p className = "aboutJob">Supreme Leader</p>
                                <p className = "aboutParagraph">I am from Chicago, and I spend my free time bossing my subordinates around.</p>
                            </Col>
                            <Col>
                                <img className = "aboutImage" src = {alicia}></img>
                                <p className = "aboutName">Alicia Liu</p>
                                <p className = "aboutJob">Front end</p>
                                <p className = "aboutParagraph">I'm from Seattle, Washington and I like to hang out with Allen in my free time.</p>
                            </Col>
                            <Col>
                                <img className = "aboutImage" src = {mwad}></img>
                                <p className = "aboutName">Mwad Saleh</p>
                                <p className = "aboutJob">Back end</p>
                                <p className = "aboutParagraph">I am from Libya and I used to play soccer in my free time before my knee blew out.</p>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <img className = "tigerLogo" src = {logo}></img>
            </div>
        )
    }
}
export default AboutUs