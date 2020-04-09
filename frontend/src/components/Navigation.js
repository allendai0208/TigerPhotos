import React from "react"
import {NavLink} from "react-router-dom"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { requirePropFactory } from "@material-ui/core"


class Navigation extends React.Component {
    render() {
        return (
            <Navbar bg="light">
                <Navbar.Brand href="/">
                <img
                    alt=""
                    src={require("./pictures/logo1.png")}
                    width="130"
                    height="130"
                    className="d-inline-block align-top"
                />{' '}
                </Navbar.Brand>
                <Nav>
                    <Nav.Link href="/create">Create Profile</Nav.Link>
                    <Nav.Link href="/browse">Browse Photographers</Nav.Link>
                </Nav>
          </Navbar>

        )
    }
}

export default Navigation