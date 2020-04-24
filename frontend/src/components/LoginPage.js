import React from 'react';
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import logo from "./pictures/tigerLogo.png"

class LoginPage extends React.Component {

    // Changes the window to the CAS login page 
    login = () => {
        fetch('/api/login')     
        .then(function(response) {
            return response.json();
        })
        .then(function(result) {
            // This function redirects to an external url while preserving browser history
            window.location.assign(result.loginUrl)
        })
        .catch(function(error) {
            console.log('Request failed', error)
        })
    }

    // Contains css styling for the login page and a login button 
    render() {
        return (
            <div>
                <Container maxWidth="sm" className="login_box">
                    <img className = "tigerLogo2" src = {logo} alt = ""></img>
                    <p className = "login_text">Welcome to TigerPhotos!</p>
                    <Button color="primary" size="large" variant="outlined" className="login_button" onClick={() => this.login()}>Login</Button>
                </Container>
            </div>
        )
    }
}
 
export default LoginPage