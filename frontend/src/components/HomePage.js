//Home page that contains three buttons that link to browse, create profile, and about us page (yet to complete)

import React from "react"
import './HomePage.css'
import { StylesProvider } from "@material-ui/core"
import Button from '@material-ui/core/Button'
import logo from "./TigerLogo.jpg"

class HomePage extends React.Component {

    routeChange=(page)=> {
        window.location.href=page
    } 

    render() {
        return (
            <div className = "bigContainer">
                <h1 className = 'titleHeader'>Welcome to TigerPhotos!</h1>
                <div className="buttons">
                    <Button variant = "contained" onClick={() => this.routeChange("browse")}>Browse Photographers</Button>
                    <Button variant = "contained" onClick={() => this.routeChange("create")}>Create Your Profile</Button>
                    <Button variant = "contained" onClick={() => this.routeChange("create")}>About Us</Button>
                </div>
                <img src = {logo}></img>
            </div>
        )
    }
}

export default HomePage