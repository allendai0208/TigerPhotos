import React from 'react'

class LogoutPage extends React.Component {

    // Upon clicking logout, the user is redirected to the CAS logout page and is removed from the current session.
    componentDidMount = () => {
        fetch('/api/logout')
        .then(response => response.json())
        .then(function(result) {
            console.log(result.logoutUrl)
            window.location.assign(result.logoutUrl)
        })
        .catch(e => console.log(e))  
    }

    // Wait for componentDidMount to finish
    render() {
        return(null);
    }
}
 
export default LogoutPage