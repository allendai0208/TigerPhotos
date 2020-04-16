//Home page that contains three buttons that link to browse, create profile, and about us page (yet to complete)

import React from "react"
import Button from '@material-ui/core/Button'
import logo from "./pictures/tigerLogo.png"
import ArtLogo from './pictures/art.png'
import IdeaLogo from './pictures/idea.png'
import MonitorLogo from './pictures/monitor.png'
import Grid from '@material-ui/core/Grid'

class HomePage extends React.Component {

    routeChange=(page)=> {
        window.location.href=page
    } 

    render() {
        return (
            <div className="homepage"> 
                <div className="heading">
                    <p className="welcome">Welcome to </p>
                    <p className="tigerphotos">TigerPhotos</p>
                </div>
                <div>
                    <Grid container spacing={10} justify="center" spacing={1}>
                        <Grid item xs={12} sm = {3}>
                            <div className="test">
                                <img className="test2" src={ArtLogo} alt="Avatar"></img>
                                <Button color="secondary" size="large" variant="outlined" disableElevation onClick={() => this.routeChange("/create")}>Create Your Profile</Button>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm = {3}>
                            <div className="test">
                                <img className="test3" src={MonitorLogo} alt="Avatar"></img>
                                <Button color="secondary" size="large" variant="outlined" disableElevation onClick={() => this.routeChange("/browse")}>Browse Photographers</Button>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm = {3}>
                            <div className="test">
                                <img className="test2" src={IdeaLogo} alt="Avatar"></img>
                                <Button color="secondary" size="large" variant="outlined" disableElevation onClick={() => this.routeChange("/about")}>About Us</Button>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </div>
        )
    }
}

export default HomePage
