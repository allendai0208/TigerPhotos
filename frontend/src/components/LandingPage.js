import React from 'react';
import Button from '@material-ui/core/Button'
import { Redirect } from 'react-router';

class LandingPage extends React.Component {
    state = {
        toHome:false
    }

    fetchNetid = () => {
        let self = this;
        fetch('/api/authenticate')
        .then(function(response) {
            return response.json(); 
        })
        .then(function(result) {        // If the netid is not null, then redirect to homepage
            console.log(result.netid)
            if (result.netid !== null) {
                self.setState(
                    {'toHome':true}
                )
            }
            else {
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
        })
        .catch(function(error) {
            console.log(error)
        })
    }

    render() {
        if (this.state.toHome) {
            return (<Redirect to='/' />)
        }
        return (
            
            <Button color="primary" size="large" onClick={() => this.fetchNetid()}>Login</Button>
        )
    }
}
 
export default LandingPage

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