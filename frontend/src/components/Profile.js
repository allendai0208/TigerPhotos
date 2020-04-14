import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import Profiles from './ProfileCard'

// MUI studd
import Button from '@material-ui/core/Button'


class Profile extends React.Component {
    state = {
        profile: []
    }

    componentDidMount() {
        const name = this.props.match.params.first_name
        fetch("/api/getPhotographer", {
            method: "POST",
            cache: "no-cache",
            headers: {
                "content_type" : "application/json"
            },
            body:JSON.stringify({first_name: name})
        }).then(response => response.json())
        .then(result => this.setState({
          profile: result.photographer
        }))
        .catch(e => console.log(e))  
    }

    render() {
        console.log(this.state.profile)
        return (
            <div>
                <p>name: {this.state.profile.last_name}</p>
            </div>
        )
    }
}

export default Profile

/* this.state.profile.map((photographer) => < Profiles photographer={photographer} />) */ 
 