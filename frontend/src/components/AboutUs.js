import React from "react"
import Grid from '@material-ui/core/Grid'
import keith from './pictures/keithPicture.JPG'
import alicia from './pictures/aliciaPicture.jpg'
import aaron from './pictures/aaronPicture.jpg'
import allen from './pictures/allenPicture.jpg'
import mwad from './pictures/mwadPicture.jpeg'

class AboutUs extends React.Component {

    render() {   
        return (
            <div>
                <h1 className = "aboutHeader">About Tiger Photos</h1>
                <p className = 'aboutParagraph'> 
                    Tiger Photos is a centralized location to hire student photogrpahers, videographers, and video editors for student jobs around campus.
                </p>
                <p className = 'aboutParagraph'>
                    Tiger Photos was originally built by a group of students as their final project for COS 333: Advanced Programming Techniques taught by Robert Dondero in Spring 2020.
                </p>

                <h1 className = 'aboutHeader'>Original Team</h1>
                <div className = 'aboutGridContainer'>
                    <Grid className = 'aboutGrid' container spacing={3}>
                        <Grid item xs>
                            <img src = {keith} className = "aboutImage"></img>
                        </Grid>
                        <Grid item sm>
                            <img src = {alicia} className = "aboutImage"></img>
                        </Grid>
                        <Grid item md>
                            <img src = {aaron} className = "aboutImage"></img>
                        </Grid>
                        <Grid item lg>
                            <img src = {allen} className = "aboutImage"></img>
                        </Grid>
                        <Grid item xl>
                            <img src = {mwad} className = "aboutImage"></img>
                        </Grid>
                    
                    </Grid>
                </div>
            </div>




        )
    }
}
export default AboutUs