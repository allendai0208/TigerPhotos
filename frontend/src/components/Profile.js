import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

// MUI studd
import Button from '@material-ui/core/Button'


class Profile extends React.Component {
    state = {
        profile: null 
    }
    componentDidMount() {
        const first_name = this.props.match.params.first_name
        console.log(first_name)
        fetch(`/api/browse/photographers?first_name=${encodeURIComponent(first_name)}`,{
            method: "GET"
        })
        .then(response => response.json().then(data => {console.log("hi")})
        )


    }
    render() {
        console.log(this.state.profile)
        return (
            <div>
                <p>hi</p>
                {this.state.profile}
            </div>
        )
    }
}

export default Profile