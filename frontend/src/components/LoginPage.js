import React from 'react';
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import logo from "./pictures/tigerLogo.png"

class LoginPage extends React.Component {

    login = () => {
        fetch('/api/login')      // else, do CASAuthentication and return to the homepage
        .then(function(response) {
            return response.json();
        })
        .then(function(result) {
            window.location.assign(result.loginUrl)
        })
        .catch(function(error) {
            console.log('Request failed', error)
        })
    }

    render() {
        return (
            <div>
                <Container maxWidth="sm" className="login_box">
                    <img className = "tigerLogo2" src = {logo}></img>
                    <p className = "login_text">Welcome to TigerPhotos!</p>
                    <Button color="primary" size="large" variant="outlined" className="login_button" onClick={() => this.login()}>Login</Button>
                </Container>
            </div>
        )
    }
}
 
export default LoginPage

/*                 <div className="heading">
                    <p className="welcome">Welcome to </p>
                    <p className="tigerphotos">TigerPhotos</p>
                </div>
                <Button color="primary" size="large" onClick={() => this.login()}>Login</Button> */ 

/* 
    fetchNetid = () => {
        fetch('/api/authenticate')
        .then(response => response.json())
        .then(result => this.setState(
            {netid:result.netid}
        ))
        .catch(e => console.log(e))
    
        if (this.state.netid === null) {
            fetch('/api/login')
            .then(response => response.json())
            .then(result => this.setState(
                {redirect_url:result.loginUrl,
                 is_external:true}
            ))
            .catch(e => console.log(e))
        }

        console.log(this.state.netid)
        console.log(this.state.is_external)
        console.log(this.state.redirect_url)

        if (this.state.netid !== null) {
            return <Redirect to='/'/>
        }
        else {
            window.location.assign(this.state.redirect_url)
        }
    }
*/