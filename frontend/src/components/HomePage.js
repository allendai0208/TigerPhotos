//Home page that contains three buttons that link to browse, create profile, and about us page (yet to complete)

import React from "react"
import { StylesProvider } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import logo from "./TigerLogo.jpg"
import Allen from "./Allen2.JPG"
import ArtLogo from './art.png'
import IdeaLogo from './idea.png'
import MonitorLogo from './monitor.png'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'
import Paper from '@material-ui/core/Paper'


class HomePage extends React.Component {

    routeChange=(page)=> {
        window.location.href=page
    } 

    render() {
        return (
            <div classname="homepage"> 
                <div className="heading">
                    <p className="welcome">Welcome to </p>
                    <p className="tigerphotos">TigerPhotos</p>
                </div>
                <div>
                    <Grid container spacing={10} justify="center" spacing={1}>
                        <Grid item xs={3}>
                            <div className="test">
                                <img className="test2" src={ArtLogo} alt="Avatar"></img>
                                <Button color="primary" variant = "outlined" size="large" onClick={() => this.routeChange("/create")}>Create Your Profile</Button>
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                            <div className="test">
                                <img className="test3" src={MonitorLogo} alt="Avatar"></img>
                                <Button color="primary" variant = "outlined" size="large" onClick={() => this.routeChange("/browse")}>Browse Photographers</Button>
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                            <div className="test">
                                <img className="test2" src={IdeaLogo} alt="Avatar"></img>
                                <Button color="primary" variant = "outlined" size="large" onClick={() => this.routeChange("/create")}>About Us</Button>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}

export default HomePage


/* <h1 className = 'titleHeader'><span style = {{borderStyle:"solid"}}>Welcome to TigerPhotos!</span></h1> */

/*                 <div className="buttons">
                    <Button variant = "contained" onClick={() => this.routeChange("/browse")}>Browse Photographers</Button>
                    <Button variant = "contained" onClick={() => this.routeChange("/create")}>Create Your Profile</Button>
                    <Button variant = "contained" onClick={() => this.routeChange("/create")}>About Us</Button>
                </div>  
                <img src = {logo}></img><img src = {logo}></img> */
