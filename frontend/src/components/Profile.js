import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

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
            headers: {
                "content_type":"application/json"
            },
            body:JSON.stringify({first_name : name})
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
                <p>hi</p>
            </div>
        )
    }
}

export default Profile