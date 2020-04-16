import React from 'react'

class LogoutPage extends React.Component {

    componentDidMount = () => {
        fetch('/api/logout')
        .then(response => response.json())
        .then(function(result) {
            console.log(result.logoutUrl)
            window.location.assign(result.logoutUrl)
        })
        .catch(e => console.log(e))  
    }

    render() {
        return(null);
    }
}
 
export default LogoutPage

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