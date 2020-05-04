import React from "react"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

class Navigation extends React.Component {
    constructor() {
        super();
        this.state = {
          width: window.innerWidth,
        };
    }

    componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    };

    render() {
        const { width } = this.state;
        const isMobile = width <= 500;
        if (!isMobile) {
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
                        <Nav.Link href="/create">My Profile</Nav.Link>
                        <Nav.Link href="/browse">Browse</Nav.Link>
                        <Nav.Link href="/feed">Feed</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                        <Nav.Link href="/logout">Logout</Nav.Link>
                    </Nav>
              </Navbar>
    
            )
        }
        
        // render the navigation bar as a dropdown if the page gets really small
        else {
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
                    <NavDropdown title="Navigate" className="ml-auto">
                        <NavDropdown.Item href="/create">My Profile</NavDropdown.Item>
                        <NavDropdown.Item href="/browse">Browse</NavDropdown.Item>
                        <NavDropdown.Item href="/feed">Feed</NavDropdown.Item>
                        <NavDropdown.Item href="/about">About</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                    </NavDropdown>
                </Navbar>
            )
        }
    }
}

export default Navigation