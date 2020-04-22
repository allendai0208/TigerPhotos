import React from 'react'
import Container from '@material-ui/core/Container'

class DefaultActiveProfile extends React.Component{

    render() {
        return (
            <div>
                <Container maxWidth="sm">
                    <p className = "defaultActiveProfile_text">Click on a profile on the left to see more!</p>
                </Container>
            </div>
        )
    }
}

export default DefaultActiveProfile