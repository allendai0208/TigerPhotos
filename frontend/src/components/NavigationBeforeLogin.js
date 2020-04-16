import React from "react"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'


class NavigationBeforeLogin extends React.Component {
    render() {
        return (
            <Navbar bg="light">
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
                    <Nav.Link href="/about">About Us</Nav.Link>
                    <Nav.Link href="/">Home</Nav.Link>
                </Nav>
          </Navbar>

        )
    }
}

export default NavigationBeforeLogin