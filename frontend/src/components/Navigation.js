import React from "react"
import {NavLink} from "react-router-dom"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { requirePropFactory } from "@material-ui/core"


class Navigation extends React.Component {
    render() {
        return (
            <Navbar bg="light" className="navbar">
                <Navbar.Brand href="/">
                <img
                    alt=""
                    src={require("./pictures/logo_orange_crop.png")}
                    width="130"
                    height="40"
                    className="d-inline-block align-top"
                />{' '}
                </Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Link href="/create">Create Profile</Nav.Link>
                    <Nav.Link href="/browse">Browse Photographers</Nav.Link>
                    <Nav.Link href="/about">About Us</Nav.Link>
                    <Nav.Link href="/logout">Logout</Nav.Link>
                </Nav>
          </Navbar>

        )
    }
}

export default Navigation