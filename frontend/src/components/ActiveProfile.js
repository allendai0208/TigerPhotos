import React from 'react'

class ActiveProfile extends React.Component{

    render() {
        return (
            <div>
                <p>I am being shown</p>
                <p>{this.props.photographer.last_name}</p>
            </div>
        )
    }
}

export default ActiveProfile